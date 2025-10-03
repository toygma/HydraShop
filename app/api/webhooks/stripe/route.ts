"use server";

import { writeClient } from "@/sanity/lib/client";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-09-30.clover",
});

interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId?: string;
}

interface SanityProduct {
  _key: string;
  product: {
    _type: "reference";
    _ref: string;
  };
  quantity: number;
}

interface SanityOrder {
  _type: "order";
  orderNumber: string;
  stripeCheckOutSessionId: string;
  stripePaymentIntentId: string | null;
  customerName: string;
  stripeCustomerId: string;
  email: string;
  clerkUserId?: string;
  currency: string;
  amountDiscount: number;
  products: SanityProduct[];
  totalPrice: number;
  status: "paid";
  orderDate: string;
  invoice?: {
    id: string;
    number: string | null;
    hosted_invoice_url: string | null;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const headerList = await headers();
    const sig = headerList.get("stripe-signature");

    if (!sig) {
      console.error("Missing Stripe signature in webhook request");
      return NextResponse.json(
        { error: "Missing Stripe signature" },
        { status: 400 }
      );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("Stripe webhook secret is not configured");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (error: any) {
      console.error("Webhook signature verification failed:", error.message);
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${error.message}` },
        { status: 400 }
      );
    }

    console.log(`Processing webhook event: ${event.type}`);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Validate session data
      if (!session.id || !session.metadata) {
        console.error("Invalid session data: missing id or metadata");
        return NextResponse.json(
          { error: "Invalid session data" },
          { status: 400 }
        );
      }

      const invoice = session.invoice
        ? await stripe.invoices.retrieve(session.invoice as string)
        : null;

      try {
        const order = await createOrderInSanity(session, invoice);
        console.log(`Order created successfully: ${order._id}`);
        return NextResponse.json({ 
          received: true, 
          orderId: order._id 
        });
      } catch (error: any) {
        console.error("Failed to create order in Sanity:", error.message);
        return NextResponse.json(
          { error: `Failed to create order: ${error.message}` },
          { status: 500 }
        );
      }
    }

    console.log(`Unhandled event type: ${event.type}`);
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Unexpected error in webhook handler:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function createOrderInSanity(
  session: Stripe.Checkout.Session,
  invoice: Stripe.Invoice | null
): Promise<SanityOrder> {
  const { id, currency, metadata, payment_intent, total_details, amount_total } = session;
  
  // Validate required metadata
  if (!metadata?.orderNumber || !metadata?.customerName || !metadata?.customerEmail) {
    throw new Error("Missing required metadata: orderNumber, customerName, or customerEmail");
  }

  const { orderNumber, customerName, customerEmail, clerkUserId } = metadata as Metadata;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(customerEmail)) {
    throw new Error("Invalid email format in metadata");
  }

  console.log(`Creating order for customer: ${customerName} (${customerEmail})`);

  // Fetch line items with proper error handling
  let lineItems;
  try {
    lineItems = await stripe.checkout.sessions.listLineItems(id, {
      expand: ["data.price.product"],
    });
  } catch (error: any) {
    console.error("Failed to fetch line items:", error.message);
    throw new Error(`Failed to fetch line items: ${error.message}`);
  }

  if (!lineItems.data || lineItems.data.length === 0) {
    throw new Error("No line items found in the session");
  }

  // Process products with better validation - filter out tax, shipping, and other non-product items
  const sanityProducts: SanityProduct[] = lineItems.data
    .map((item) => {
      if (!item.price?.product || typeof item.price.product !== 'object') {
        console.warn(`Skipping item with invalid product data: ${item.id}`);
        return null;
      }

      const product = item.price.product as Stripe.Product;
      const sanityId = product.metadata?.id;

      // Skip items that are not actual products (tax, shipping, discounts, etc.)
      if (!sanityId) {
        const itemType = product.name?.toLowerCase() || 'unknown';
        if (itemType.includes('tax') || itemType.includes('shipping') || itemType.includes('discount') || itemType.includes('fee')) {
          console.log(`Skipping non-product item: ${product.name} (${product.id})`);
        } else {
          console.warn(`Product ${product.id} (${product.name}) missing Sanity ID in metadata`);
        }
        return null;
      }

      // Additional check: ensure it's not a service type item (tax, shipping, etc.)
      if (product.type === 'service' && (product.name?.toLowerCase().includes('tax') || product.name?.toLowerCase().includes('shipping'))) {
        console.log(`Skipping service item: ${product.name} (${product.id})`);
        return null;
      }

      console.log(`Processing product: ${product.name} (Sanity ID: ${sanityId})`);
      return {
        _key: crypto.randomUUID(),
        product: {
          _type: "reference" as const,
          _ref: sanityId,
        },
        quantity: item.quantity || 1,
      };
    })
    .filter((item): item is SanityProduct => item !== null);

  if (sanityProducts.length === 0) {
    // Check if there were any line items at all
    const totalLineItems = lineItems.data.length;
    const nonProductItems = lineItems.data.filter(item => {
      const product = item.price?.product as Stripe.Product;
      return !product?.metadata?.id || 
             product.type === 'service' || 
             product.name?.toLowerCase().includes('tax') ||
             product.name?.toLowerCase().includes('shipping');
    }).length;
    
    console.warn(`Order processing: ${totalLineItems} total items, ${nonProductItems} non-product items, ${sanityProducts.length} valid products`);
    
    if (totalLineItems === 0) {
      throw new Error("No line items found in the order");
    } else if (nonProductItems === totalLineItems) {
      throw new Error("Order contains only tax, shipping, or other non-product items - no actual products to process");
    } else {
      throw new Error("No valid products with Sanity ID found in the order");
    }
  }

  console.log(`Processing ${sanityProducts.length} products for order ${orderNumber}`);

  // Calculate totals with proper null checks
  const totalPrice = amount_total ? amount_total / 100 : 0;
  const amountDiscount = total_details?.amount_discount 
    ? total_details.amount_discount / 100 
    : 0;

  // Create order object with proper typing
  const orderData: SanityOrder = {
    _type: "order",
    orderNumber,
    stripeCheckOutSessionId: id,
    stripePaymentIntentId: payment_intent as string | null,
    customerName,
    stripeCustomerId: customerEmail, // Using email as customer ID
    email: customerEmail,
    clerkUserId,
    currency: currency || "usd",
    amountDiscount,
    products: sanityProducts,
    totalPrice,
    status: "paid",
    orderDate: new Date().toISOString(),
    invoice: invoice
      ? {
          id: invoice.id,
          number: invoice.number,
          hosted_invoice_url: invoice.hosted_invoice_url,
        }
      : undefined,
  };

  try {
    const order = await writeClient.create(orderData);
    return order as SanityOrder;
  } catch (error: any) {
    console.error("Sanity write operation failed:", error.message);
    throw new Error(`Failed to create order in Sanity: ${error.message}`);
  }
}

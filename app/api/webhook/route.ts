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

export async function POST(req: NextRequest) {
  const body = await req.text();

  const headerList = await headers();

  const sig = headerList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      {
        error: "no signature",
      },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.log("Stripe webhook secret is not set");
    return NextResponse.json(
      {
        error: "Stripe webhook secret is not set",
      },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      error: `Webhook Error: ${error}`,
    });
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const invoice = session.invoice
      ? await stripe.invoices.retrieve(session.invoice as string)
      : null;

    try {
      await createOrderInsanity(session, invoice);
    } catch (error: any) {
      console.log("error creating order in sanity", error.message);
      return NextResponse.json({
        error: `Error Creating order: ${error}`,
      });
    }
  }
  return NextResponse.json({ received: true });
}

async function createOrderInsanity(
  session: Stripe.Checkout.Session,
  invoice: Stripe.Invoice | null
) {
  const { id, currency, metadata, payment_intent, total_details } = session;
  const { orderNumber, customerName, customerEmail, clerkUserId } =
    metadata as unknown as Metadata;

  const lineItems = await stripe.checkout.sessions.listLineItems(id, {
    expand: ["data.price.product"],
  });

  const sanityProducts = lineItems.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: "object",
      _ref: (item.price?.product as Stripe.Product)?.metadata.id,
    },
    quantity: item.quantity,
  }));

  const order = await writeClient.create({
    _type: "order",
    orderNumber,
    stripeCheckOutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customerEmail,
    email: customerEmail,
    clerkUserId,
    currency,
    amountDiscount: total_details?.amount_discount
      ? total_details.amount_discount / 100
      : 0,
    products: sanityProducts,
    totalPrice: session.amount_total ? session.amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
    invoice: invoice
      ? {
          id: invoice.id,
          number: invoice.number,
          hosted_invoice_url: invoice.hosted_invoice_url,
        }
      : undefined,
  });
  return order;
}

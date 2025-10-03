"use server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-09-30.clover",
});

export async function POST(req: NextRequest) {
  const { items, metadata, totalPrice, taxPrice, shippingPrice, overallTotal } =
    await req.json();

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "No items in cart" }, { status: 400 });
  }

  try {
    // Ürün line items
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : undefined,
          metadata: { productId: item._id },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Kargo ücreti ekleme (sadece 0'dan büyükse)
    if (shippingPrice > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Shipping Fee",
            description: "Standard shipping (5-7 business days)",
          },
          unit_amount: Math.round(shippingPrice * 100),
        },
        quantity: 1,
      });
    }

    // Vergi ücreti ekleme
    if (taxPrice > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Tax",
            description: "Sales tax (20%)",
          },
          unit_amount: Math.round(taxPrice * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        clerkUserId: metadata.clerkUserId,
        totalPrice: totalPrice.toString(),
        taxPrice: taxPrice.toString(),
        shippingPrice: shippingPrice.toString(),
        overallTotal: overallTotal.toString(),
      },
      customer_email: metadata.customerEmail,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

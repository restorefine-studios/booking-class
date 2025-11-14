import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { classId, price, user, title, date, startTime, endTime, location, thumbnailUrl, description } = await request.json();

    // Call your backend API to create a Stripe checkout session
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/stripe/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ classId, price, user, title, date, startTime, endTime, location, thumbnailUrl, description }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Strapi error:", data);
      return NextResponse.json({ error: data.error?.message || "Failed to create checkout session" }, { status: response.status });
    }

    if (!data.url) {
      console.error("Missing URL in response:", data);
      return NextResponse.json({ error: "Invalid checkout session response" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

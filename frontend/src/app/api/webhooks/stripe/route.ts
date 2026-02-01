import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendBookingConfirmationEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const bookingId = paymentIntent.metadata.bookingId;

      if (bookingId) {
        // Update booking status in Strapi
        try {
          const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
          const strapiToken = process.env.STRAPI_API_TOKEN;

          // First, get the booking details
          const bookingResponse = await fetch(`${strapiUrl}/api/bookings/${bookingId}?populate=classOccurrence,user`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${strapiToken}`,
            },
          });

          const bookingData = await bookingResponse.json();
          const booking = bookingData.data;

          // Update booking status
          await fetch(`${strapiUrl}/api/bookings/${bookingId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${strapiToken}`,
            },
            body: JSON.stringify({
              data: {
                status: "confirmed",
                stripePaymentIntentId: paymentIntent.id,
              },
            }),
          });

          console.log("✅ Booking confirmed via webhook:", bookingId);

          // Send confirmation email
          try {
            const userEmail = booking.user?.email || paymentIntent.receipt_email;
            const userName = booking.user ? `${booking.user.firstName} ${booking.user.lastName}` : paymentIntent.metadata.customerName || "Customer";
            const className = booking.classOccurrence?.title || "Dance Class";
            const classDate = booking.classOccurrence?.date
              ? new Date(booking.classOccurrence.date).toLocaleDateString("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "TBD";
            const classTime = booking.classOccurrence?.startTime && booking.classOccurrence?.endTime ? `${booking.classOccurrence.startTime} - ${booking.classOccurrence.endTime}` : "TBD";

            if (userEmail) {
              await sendBookingConfirmationEmail({
                to: userEmail,
                customerName: userName,
                className: className,
                classDate: classDate,
                classTime: classTime,
                amount: paymentIntent.amount,
                bookingId: bookingId,
                currency: paymentIntent.currency.toUpperCase(),
              });

              console.log("✅ Confirmation email sent to:", userEmail);
            } else {
              console.warn("⚠️ No email address found for booking:", bookingId);
            }
          } catch (emailError) {
            console.error("❌ Error sending confirmation email:", emailError);
            // Don't fail the webhook if email fails
          }
        } catch (error) {
          console.error("Error updating booking via webhook:", error);
        }
      }
      break;

    case "payment_intent.payment_failed":
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      const failedBookingId = failedPayment.metadata.bookingId;

      if (failedBookingId) {
        // Update booking status to canceled
        try {
          const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
          const strapiToken = process.env.STRAPI_API_TOKEN;

          await fetch(`${strapiUrl}/api/bookings/${failedBookingId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${strapiToken}`,
            },
            body: JSON.stringify({
              data: {
                status: "canceled",
              },
            }),
          });

          console.log("Booking canceled due to payment failure:", failedBookingId);
        } catch (error) {
          console.error("Error updating failed booking via webhook:", error);
        }
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

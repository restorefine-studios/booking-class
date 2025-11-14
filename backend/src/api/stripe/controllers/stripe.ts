import Stripe from "stripe";

export default {
  async createCheckoutSession(ctx) {
    try {
      const { classId, price, user, title, date, startTime, endTime, location, thumbnailUrl, description } = ctx.request.body;

      if (!classId || !price) {
        return ctx.badRequest("Class ID and price are required");
      }

      if (!user) {
        console.error("❌ User is not authenticated. Cannot create booking.");
        return ctx.unauthorized("You must be logged in to book a class");
      }

      const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

      // Format date and time for display
      const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      };

      const formatTime = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0);
        return date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      };

      // Build a professional, well-formatted description
      const descriptionParts = [];

      if (description) {
        descriptionParts.push(description);
      }

      // Add spacing and details section
      if ((date && startTime && endTime) || location) {
        if (description) {
          descriptionParts.push(""); // Empty line for spacing
          descriptionParts.push(""); // Double spacing
        }

        descriptionParts.push(""); // Empty line before header
        descriptionParts.push("CLASS DETAILS");
        descriptionParts.push("────────────────");
        descriptionParts.push(""); // Empty line after header

        if (date && startTime && endTime) {
          descriptionParts.push(`Date: ${formatDate(date)}`);
          descriptionParts.push(`Time: ${formatTime(startTime)} - ${formatTime(endTime)}`);
        }

        if (location) {
          descriptionParts.push(`Location: ${location}`);
        }
      }

      const productDescription = descriptionParts.length > 0 ? descriptionParts.join("\n") : "Dance class booking";

      const productData: any = {
        name: title || `Dance Class Booking`,
        description: productDescription,
      };

      // Add image URL (should already be absolute from frontend)
      if (thumbnailUrl) {
        productData.images = [thumbnailUrl];
        console.log("Setting Stripe product image:", thumbnailUrl);
      } else {
        console.log("No thumbnail URL provided for Stripe checkout");
      }

      console.log("🔧 About to create Stripe session with:", {
        classId: String(classId),
        userId: user ? String(user) : null,
        price,
        title,
        thumbnailUrl: thumbnailUrl ? "YES" : "NO",
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "gbp",
              product_data: productData,
              unit_amount: price * 100, // Convert to smallest currency unit
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}&payment=success`,
        cancel_url: `${process.env.FRONTEND_URL}/classes`,
        metadata: {
          classId: String(classId),
          userId: String(user),
        },
      });

      console.log("✅ Stripe session created successfully!");
      console.log("📋 Session ID:", session.id);
      console.log("🔗 Checkout URL:", session.url);
      console.log("📦 Metadata saved:", session.metadata);
      console.log("⚡ Webhook will receive this data when payment completes");
      return { url: session.url };
    } catch (error) {
      console.error("Stripe session creation error:", error);
      return ctx.internalServerError("Could not create checkout session");
    }
  },

  async webhook(ctx) {
    const rawBody = ctx.request.body[Symbol.for("unparsedBody")];

    console.log("🔍 Raw body (unparsed):", rawBody);

    const signature = ctx.request.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    try {
      event = Stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);

      ctx.request.event = event;
      console.log("Webhook signature verified successfully");
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      ctx.status = 400;
      ctx.body = { error: `Webhook Error: ${err.message}` };
      return;
    }

    console.log("\n" + "=".repeat(80));
    console.log("🔥 WEBHOOK ENDPOINT HIT! 🔥");
    console.log("=".repeat(80));
    console.log("📅 Time:", new Date().toISOString());
    console.log("🔧 Method:", ctx.request.method);
    console.log("=".repeat(80) + "\n");

    try {
      console.log("📨 Received event type:", event.type);
      console.log("🆔 Event ID:", event.id);

      // Handle different event types
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object;
          console.log("\n" + "=".repeat(80));
          console.log("🎉 PAYMENT COMPLETED SUCCESSFULLY!");
          console.log("=".repeat(80));
          console.log("✅ Session ID:", session.id);
          console.log("💰 Amount Paid:", session.amount_total / 100, session.currency.toUpperCase());
          console.log("💳 Payment Intent:", session.payment_intent);
          console.log("📧 Customer Email:", session.customer_email || session.customer_details?.email);
          console.log("\n📦 Metadata received:");
          console.log("   - classId:", session.metadata?.classId || "MISSING");
          console.log("   - userId:", session.metadata?.userId || "MISSING");
          console.log("   - Full metadata object:", JSON.stringify(session.metadata));
          console.log("=".repeat(80) + "\n");

          try {
            // Validation
            if (!session.metadata?.classId) {
              console.error("❌ VALIDATION FAILED: Missing classId in metadata");
              console.error("   Full metadata:", JSON.stringify(session.metadata, null, 2));
              break;
            }

            if (!session.metadata?.userId || session.metadata.userId === "null" || session.metadata.userId === "undefined") {
              console.error("❌ VALIDATION FAILED: Missing or invalid userId in metadata");
              console.error("   Received userId:", session.metadata.userId);
              console.error("   Full metadata:", JSON.stringify(session.metadata, null, 2));
              break;
            }

            console.log("✅ Validation passed! Proceeding to create booking...");

            // Check if booking already exists for this session
            console.log("🔍 Checking for duplicate bookings...");
            const existingBooking = await strapi.entityService.findMany("api::booking.booking", {
              filters: {
                stripeSessionId: session.id,
              },
            });

            if (existingBooking && existingBooking.length > 0) {
              console.log("⚠️ DUPLICATE DETECTED: Booking already exists for session:", session.id);
              console.log("   Existing booking ID:", existingBooking[0].id);
              break;
            }
            console.log("✅ No duplicates found. Safe to create booking.");

            // Create booking record
            const bookingData = {
              publishedAt: new Date(),
              classOccurrence: parseInt(session.metadata.classId),
              user: parseInt(session.metadata.userId),
              stripePaymentId: session.payment_intent as string,
              stripeSessionId: session.id,
              status: "confirmed" as const,
              bookingDate: new Date(),
            };

            console.log("\n📝 CREATING BOOKING IN DATABASE");
            console.log("   Data to save:");
            console.log("   - Class ID:", bookingData.classOccurrence);
            console.log("   - User ID:", bookingData.user);
            console.log("   - Payment ID:", bookingData.stripePaymentId);
            console.log("   - Session ID:", bookingData.stripeSessionId);
            console.log("   - Status:", bookingData.status);

            const booking = await strapi.entityService.create("api::booking.booking", {
              data: bookingData,
            });

            console.log("\n" + "=".repeat(80));
            console.log("🎊 SUCCESS! BOOKING CREATED!");
            console.log("=".repeat(80));
            console.log("✅ Booking ID:", booking.id);
            console.log("✅ Class ID:", bookingData.classOccurrence);
            console.log("✅ User ID:", bookingData.user);
            console.log("✅ Payment ID:", bookingData.stripePaymentId);
            console.log("✅ Session ID:", bookingData.stripeSessionId);
            console.log("✅ Status:", bookingData.status);
            console.log("\n✅ User can now see this booking in their dashboard");
            console.log("=".repeat(80) + "\n");
          } catch (error) {
            console.error("\n" + "=".repeat(80));
            console.error("❌ BOOKING CREATION FAILED!");
            console.error("=".repeat(80));
            console.error("❌ Error type:", error.constructor.name);
            console.error("❌ Error message:", error.message);
            console.error("❌ Full error:", error);
            console.error("❌ Error stack:", error.stack);
            console.error("=".repeat(80) + "\n");
            // Don't throw here - we want to acknowledge the webhook even if booking creation fails
            // Stripe will retry if we return an error
          }
          break;
        }

        case "payment_intent.succeeded": {
          const paymentIntent = event.data.object;
          console.log("Payment succeeded:", paymentIntent.id);
          // Handle payment success if needed
          break;
        }

        case "charge.succeeded": {
          const charge = event.data.object;
          console.log("Charge succeeded:", charge.id);
          // Handle charge success if needed
          break;
        }

        case "payment_intent.created": {
          console.log("Payment intent created:", event.data.object.id);
          // Usually no action needed for this event
          break;
        }

        case "charge.updated": {
          console.log("Charge updated:", event.data.object.id);
          // Handle charge updates if needed
          break;
        }

        case "payment_intent.payment_failed": {
          const failedPayment = event.data.object;
          console.log("Payment failed:", failedPayment.id);
          // Handle failed payment if needed
          break;
        }

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      // Always respond with success
      ctx.status = 200;
      ctx.body = { received: true };
    } catch (error) {
      console.error("Webhook processing error:", error);

      // Return appropriate error status
      ctx.status = 500;
      ctx.body = { error: "Internal server error" };
    }
  },
};

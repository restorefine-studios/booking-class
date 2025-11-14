# 🔥 CRITICAL: Stripe Webhook Setup Required!

## ⚠️ Problem

Your payment succeeded in Stripe, but the booking wasn't created because **Stripe can't reach your local backend** to send the webhook.

## ✅ Solution: Use Stripe CLI to Forward Webhooks Locally

### Step 1: Install Stripe CLI

```bash
# On macOS (using Homebrew)
brew install stripe/stripe-cli/stripe

# Or download from: https://stripe.com/docs/stripe-cli
```

### Step 2: Login to Stripe

```bash
stripe login
```

This will open your browser to authenticate.

### Step 3: Forward Webhooks to Your Local Backend

```bash
# Make sure your backend is running on port 1337 first!
# Then run this in a NEW terminal:
stripe listen --forward-to localhost:1337/api/stripe/webhook
```

You'll see output like:

```
> Ready! Your webhook signing secret is whsec_xxxxx (^C to quit)
```

### Step 4: Copy the Webhook Secret

Copy the `whsec_xxxxx` value from the output above.

### Step 5: Update Your .env File

Add this to your backend `.env` file:

```bash
STRIPE_WEBHOOK_SECRET=whsec_xxxxx  # Replace with your actual secret
```

### Step 6: Restart Your Backend

```bash
# Stop the backend (Ctrl+C)
# Then start it again
npm run develop
```

### Step 7: Test a New Booking

1. Make a new booking
2. Complete payment on Stripe checkout
3. Watch the terminal with `stripe listen` - you should see:
   ```
   2025-11-14 18:10:09  --> checkout.session.completed [evt_xxxxx]
   2025-11-14 18:10:09  <-- [200] POST http://localhost:1337/api/stripe/webhook
   ```
4. Check your backend logs for the detailed logging we added
5. Check your dashboard - booking should appear!

## 🔍 Verify Webhook is Working

After setting up, you should see in your backend terminal:

```
================================================================================
🔥 WEBHOOK ENDPOINT HIT! 🔥
================================================================================
📅 Time: 2025-11-14T18:10:09...
🎉 PAYMENT COMPLETED SUCCESSFULLY!
✅ Session ID: cs_test_xxxxx
💰 Amount Paid: 45.00 GBP
📦 Metadata received:
   - classId: 123
   - userId: 456
================================================================================
🎊 SUCCESS! BOOKING CREATED!
✅ Booking ID: 789
================================================================================
```

## 🚀 Alternative: Deploy Backend to Production

If you want webhooks to work without Stripe CLI, you need to:

1. Deploy your backend to a public URL (e.g., Heroku, Fly.io, Railway)
2. Add the webhook endpoint in Stripe Dashboard:
   - Go to: https://dashboard.stripe.com/test/webhooks
   - Click "Add endpoint"
   - URL: `https://your-backend-url.com/api/stripe/webhook`
   - Events: Select `checkout.session.completed`
   - Copy the webhook signing secret to your `.env`

## 📝 Quick Fix for Existing Payment

Since your payment already succeeded but booking wasn't created, you can:

### Option 1: Create Booking Manually in Strapi Admin

1. Go to http://localhost:1337/admin
2. Content Manager → Bookings → Create new entry
3. Fill in:
   - User: Select your user
   - Class Occurrence: Select the class
   - Stripe Payment ID: `pi_3STRRk1LhxUqfh1K0SoW68XM`
   - Stripe Session ID: `cs_3STRRk1LhxUqfh1K0...` (from Stripe dashboard)
   - Status: confirmed
   - Booking Date: Today
4. Save & Publish

### Option 2: Replay the Webhook Event (after CLI setup)

```bash
# After setting up Stripe CLI
stripe events resend evt_xxxxx  # Replace with your event ID from Stripe
```

## ⚡ TL;DR - Run These Commands NOW:

```bash
# Terminal 1: Backend
cd backend
npm run develop

# Terminal 2: Stripe CLI (NEW TERMINAL)
brew install stripe/stripe-cli/stripe  # If not installed
stripe login
stripe listen --forward-to localhost:1337/api/stripe/webhook

# Copy the whsec_xxxxx secret and add to backend/.env:
# STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Restart backend (Terminal 1)
# Try a new booking!
```

---

**The booking system WILL WORK once the webhook is properly connected!** 🎉

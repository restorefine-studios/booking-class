# Forgot Password Testing Guide

## 📧 Email Configuration

### Sender Email

**All password reset emails are sent from:** `prabishdangi2002@gmail.com`

### Resend Free Tier Limitation

⚠️ **Important:** With Resend's free tier, emails can **only** be sent to verified emails associated with your account.

**For testing, use:** `prabishdangi2002@gmail.com`

## 🔧 Configuration Summary

### Backend (Strapi)

- **Email Provider:** Resend
- **Configuration File:** `backend/config/plugins.js`
- **Email Provider Implementation:** `backend/config/email-provider.js`
- **Custom Controller:** `backend/src/extensions/users-permissions/strapi-server.js`
- **Sender:** Masala Moves <prabishdangi2002@gmail.com>
- **Environment Variables:**
  - `RESEND_API_KEY`: Your Resend API key
  - `FRONTEND_URL`: Frontend URL for reset links
  - `CONTACT_EMAIL`: prabishdangi2002@gmail.com

### Frontend

- **Forgot Password Page:** `frontend/src/app/forgot-password/page.tsx`
- **Reset Password Page:** `frontend/src/app/reset-password/page.tsx`

## 🧪 How to Test

### Step 1: Ensure Backend is Running

```bash
cd backend
npm run develop
```

The backend should be running on `http://localhost:1337`

### Step 2: Ensure Frontend is Running

```bash
cd frontend
npm run dev
```

The frontend should be running on `http://localhost:3000`

### Step 3: Test Forgot Password Flow

1. **Open the forgot password page:**
   - Go to: http://localhost:3000/forgot-password
   - Or click "Forgot Password?" link on the login page

2. **Enter your test email:**
   - Email: `prabishdangi2002@gmail.com`
   - Click "Send Reset Link"

3. **Check the backend terminal:**
   - You should see detailed logs like:

   ```
   ========================================
   🔐 FORGOT PASSWORD REQUEST
   ========================================
   📧 Email requested: prabishdangi2002@gmail.com
   ⏰ Time: 2026-01-31T...
   ✅ User found:
      - ID: ...
      - Email: prabishdangi2002@gmail.com
      - Username: ...
   🔑 Reset token generated
   💾 Token saved to database
   🔗 Reset URL generated: http://localhost:3000/reset-password?code=...

   📧 SENDING EMAIL:
      - Provider: Resend
      - From: Masala Moves <prabishdangi2002@gmail.com>
      - To: prabishdangi2002@gmail.com
      - Subject: Reset Your Password - Masala Moves
   ✅ Email sent successfully via Resend!
   ========================================
   ```

4. **Check your email inbox:**
   - Check: `prabishdangi2002@gmail.com`
   - Subject: "Reset Your Password - Masala Moves"
   - From: "Masala Moves <prabishdangi2002@gmail.com>"
   - **Important:** Also check your spam/junk folder

5. **Click the reset link in the email:**
   - The link should look like: `http://localhost:3000/reset-password?code=XXXXX`
   - This will open the reset password page

6. **Enter your new password:**
   - Password: (minimum 6 characters)
   - Confirm Password: (must match)
   - Click "Reset Password"

7. **Login with new password:**
   - Go to: http://localhost:3000/login
   - Email: `prabishdangi2002@gmail.com`
   - Password: (your new password)
   - Click "Sign In"

## 🐛 Troubleshooting

### Email Not Received?

1. **Check spam folder** - Sometimes reset emails go to spam
2. **Check backend logs** - Look for any error messages
3. **Verify Resend API key** - Check that `RESEND_API_KEY` is set correctly in `backend/.env`
4. **Check Resend dashboard** - Log in to https://resend.com and check the "Logs" section
5. **Verify email matches** - Make sure you're using `prabishdangi2002@gmail.com` (the verified email)

### Reset Link Not Working?

1. **Check the URL** - Make sure it has a `?code=` parameter
2. **Token might be expired** - Request a new reset link
3. **Check backend logs** - Look for token generation/validation errors

### Backend Errors?

Check the terminal where `npm run develop` is running for detailed error logs.

### Frontend Errors?

1. Open browser console (F12)
2. Look for any error messages
3. Check the Network tab for API call responses

## 📝 Test Checklist

- [ ] Backend is running on port 1337
- [ ] Frontend is running on port 3000
- [ ] User with email `prabishdangi2002@gmail.com` exists in database
- [ ] RESEND_API_KEY is set in backend/.env
- [ ] FRONTEND_URL is set correctly in backend/.env
- [ ] Forgot password form submits successfully
- [ ] Backend logs show email being sent
- [ ] Email arrives in inbox (check spam too)
- [ ] Reset link opens correctly
- [ ] New password can be set
- [ ] Login works with new password

## 🔑 Key Points to Remember

1. **Sender Email:** All emails come from `prabishdangi2002@gmail.com`
2. **Test Email:** Use `prabishdangi2002@gmail.com` for testing (Resend free tier limitation)
3. **Token Expiry:** Reset tokens expire after some time (check Strapi settings)
4. **Security:** For security, the API always returns success even if user doesn't exist
5. **Logging:** Detailed logs are available in the backend terminal for debugging

## 🚀 Production Setup

When moving to production with a custom domain:

1. **Verify your domain in Resend:**
   - Add DNS records to verify your domain
   - Once verified, you can send emails to any address

2. **Update sender email:**
   - Change from `prabishdangi2002@gmail.com` to your domain email
   - Example: `no-reply@masalamoves.co.uk`

3. **Update environment variables:**
   - Set production FRONTEND_URL
   - Ensure RESEND_API_KEY is set

4. **Test thoroughly** with different email providers (Gmail, Outlook, etc.)

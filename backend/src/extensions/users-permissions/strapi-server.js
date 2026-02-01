// const nodemailer = require("nodemailer");

module.exports = (plugin) => {
  console.log("🔧 Loading users-permissions extension...");

  // Override the forgot password controller to use Strapi's email plugin
  plugin.controllers.auth.forgotPassword = async (ctx) => {
    const { email } = ctx.request.body;

    console.log("\n========================================");
    console.log("🔐 FORGOT PASSWORD REQUEST");
    console.log("========================================");
    console.log("📧 Email requested:", email);
    console.log("⏰ Time:", new Date().toISOString());

    if (!email) {
      console.log("❌ No email provided");
      return ctx.badRequest("email.provide");
    }

    // Find user
    const user = await strapi.query("plugin::users-permissions.user").findOne({
      where: { email: email.toLowerCase() },
    });

    if (!user || user.blocked) {
      console.log("⚠️ User not found or blocked for email:", email);
      // Don't reveal if user exists for security reasons
      return ctx.send({ ok: true });
    }

    console.log("✅ User found:");
    console.log("   - ID:", user.id);
    console.log("   - Email:", user.email);
    console.log("   - Username:", user.username);
    console.log("   - Name:", user.firstName || "N/A");

    try {
      // Generate reset password token
      const resetPasswordToken = strapi.plugins["users-permissions"].services.user.createToken();

      console.log("🔑 Reset token generated");

      // Save the token to database
      await strapi.query("plugin::users-permissions.user").update({
        where: { id: user.id },
        data: { resetPasswordToken },
      });

      console.log("💾 Token saved to database");

      // Build reset URL
      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
      const resetUrl = `${frontendUrl}/reset-password?code=${resetPasswordToken}`;

      console.log("🔗 Reset URL generated:", resetUrl);

      // Email HTML template
      const emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Your Password</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #eb1c23 0%, #7b1c11 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Password Reset Request</h1>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
              <p style="font-size: 16px; margin-bottom: 20px;">Hello ${user.firstName || user.username},</p>
              
              <p style="font-size: 16px; margin-bottom: 25px;">
                We received a request to reset your password for your Masala Moves account. Click the button below to choose a new password:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #eb1c23 0%, #7b1c11 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Reset Password</a>
              </div>
              
              <p style="font-size: 14px; margin-bottom: 20px; color: #666;">
                Or copy and paste this link into your browser:<br>
                <a href="${resetUrl}" style="color: #eb1c23; word-break: break-all;">${resetUrl}</a>
              </p>
              
              <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 8px; margin-top: 25px;">
                <p style="margin: 0; font-size: 14px; color: #856404;">
                  <strong>⚠️ Important:</strong> This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.
                </p>
              </div>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
              <p style="margin: 5px 0;">
                This is an automated email. Please do not reply to this email.
              </p>
              <p style="margin: 5px 0;">
                © ${new Date().getFullYear()} Masala Moves. All rights reserved.
              </p>
            </div>
          </body>
        </html>
      `;

      /* ============================================================
         COMMENTED OUT: Direct nodemailer/Gmail SMTP implementation
         ============================================================
      
      // Configure nodemailer with Gmail SMTP
      console.log("\n📧 CONFIGURING GMAIL SMTP:");
      console.log("   - Host:", process.env.SMTP_HOST || "smtp.gmail.com");
      console.log("   - Port:", process.env.SMTP_PORT || 587);
      console.log("   - Username:", process.env.SMTP_USERNAME);

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: parseInt(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
        family: 4,
        tls: {
          rejectUnauthorized: true,
        },
      });

      console.log("\n📧 SENDING EMAIL:");
      console.log("   - Provider: Gmail SMTP (nodemailer)");
      console.log("   - From:", process.env.SMTP_USERNAME);
      console.log("   - To:", user.email);
      console.log("   - Subject: Reset Your Password - Masala Moves");

      // Send email
      const info = await transporter.sendMail({
        from: `"Masala Moves" <${process.env.SMTP_USERNAME}>`,
        to: user.email,
        subject: "Reset Your Password - Masala Moves",
        html: emailHtml,
      });

      console.log("✅ Email sent successfully via Gmail SMTP!");
      console.log("   - Message ID:", info.messageId);
      console.log("   - Response:", info.response);
      
      ============================================================ */

      // Use Strapi's email plugin (configured in config/plugins.js with Resend provider)
      console.log("\n📧 SENDING EMAIL via Resend (Strapi Email Plugin):");

      await strapi.plugin("email").service("email").send({
        to: user.email,
        from: "Masala Moves <no-reply@masalamoves.co.uk>",
        subject: "Reset Your Password - Masala Moves",
        html: emailHtml,
      });

      console.log("✅ Email sent successfully via Strapi email plugin!");
      console.log("========================================\n");

      return ctx.send({ ok: true });
    } catch (error) {
      console.error("\n❌ ERROR IN FORGOT PASSWORD:");
      console.error("   - Message:", error.message);
      console.error("   - Stack:", error.stack);
      console.error("========================================\n");

      // Don't reveal errors to user for security
      return ctx.send({ ok: true });
    }
  };

  console.log("✅ Users-permissions extension loaded with Strapi email plugin");

  return plugin;
};

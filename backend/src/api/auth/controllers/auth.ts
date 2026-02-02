import crypto from "crypto";

export default {
  async forgotPassword(ctx) {
    const { email } = ctx.request.body;

    console.log("\n========================================");
    console.log("🔐 FORGOT PASSWORD REQUEST (Custom API)");
    console.log("========================================");
    console.log("📧 Email requested:", email);
    console.log("⏰ Time:", new Date().toISOString());

    if (!email) {
      console.log("❌ No email provided");
      return ctx.badRequest("Please provide an email address");
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
      const resetPasswordToken = crypto.randomBytes(64).toString("hex");

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

      // Email HTML template with enhanced design
      const emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Your Password - Masala Moves</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #fef5f5 0%, #fff5f0 100%);">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(235, 28, 35, 0.15);">
                <div style="background: linear-gradient(135deg, #eb1c23 0%, #7b1c11 100%); padding: 40px 30px; text-align: center; position: relative;">
                  <div style="position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%; filter: blur(40px);"></div>
                  <div style="position: absolute; bottom: -30px; left: -30px; width: 150px; height: 150px; background: rgba(0,0,0,0.1); border-radius: 50%; filter: blur(50px);"></div>
                  <div style="position: relative;">
                    <h1 style="color: white; margin: 0 0 10px 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">🔐 Password Reset</h1>
                    <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 16px;">Masala Moves Dance Academy</p>
                  </div>
                </div>
                <div style="padding: 40px 30px;">
                  <div style="text-align: center; margin-bottom: 30px;">
                    <div style="display: inline-block; background: linear-gradient(135deg, #fff5f0 0%, #fef5f5 100%); padding: 20px; border-radius: 50%; margin-bottom: 20px;">
                      <span style="font-size: 48px;">💃</span>
                    </div>
                    <p style="font-size: 18px; color: #333; margin: 0 0 10px 0; font-weight: 600;">Hello ${user.firstName || user.username}!</p>
                    <p style="font-size: 15px; color: #666; margin: 0; line-height: 1.6;">We received a request to reset your password.<br/>No worries, we've got you covered!</p>
                  </div>
                  <div style="background: linear-gradient(135deg, #fef5f5 0%, #fff5f0 100%); padding: 25px; border-radius: 15px; margin: 30px 0; border-left: 4px solid #eb1c23;">
                    <p style="margin: 0 0 20px 0; font-size: 15px; color: #555; line-height: 1.6;">Click the button below to create a new password for your account:</p>
                    <div style="text-align: center; margin: 25px 0;">
                      <a href="${resetUrl}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #eb1c23 0%, #7b1c11 100%); color: white; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 15px rgba(235, 28, 35, 0.3);">Reset My Password</a>
                    </div>
                    <p style="margin: 20px 0 0 0; font-size: 13px; color: #888; text-align: center;">Button not working? Copy and paste this link:</p>
                    <p style="margin: 10px 0 0 0; font-size: 12px; word-break: break-all; text-align: center;">
                      <a href="${resetUrl}" style="color: #eb1c23; text-decoration: none;">${resetUrl}</a>
                    </p>
                  </div>
                  <div style="background: #fff3cd; border: 2px solid #ffc107; border-radius: 12px; padding: 20px; margin: 25px 0;">
                    <p style="margin: 0; font-size: 14px; color: #856404; line-height: 1.6;">
                      <strong>⚠️ Security Notice:</strong><br/>
                      • This link expires in <strong>1 hour</strong><br/>
                      • If you didn't request this, please ignore this email<br/>
                      • Never share this link with anyone
                    </p>
                  </div>
                  <div style="text-align: center; padding: 20px 0; border-top: 1px solid #f0f0f0; margin-top: 30px;">
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">Need help? Contact us at</p>
                    <p style="margin: 0;">
                      <a href="mailto:nepallunashree@gmail.com" style="color: #eb1c23; text-decoration: none; font-weight: 600;">nepallunashree@gmail.com</a>
                    </p>
                  </div>
                </div>
                <div style="background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%); padding: 30px; text-align: center;">
                  <p style="color: rgba(255,255,255,0.7); margin: 0 0 10px 0; font-size: 13px;">Keep dancing, keep moving! 💫</p>
                  <p style="color: rgba(255,255,255,0.5); margin: 0; font-size: 12px;">© ${new Date().getFullYear()} Masala Moves. All rights reserved.</p>
                  <p style="color: rgba(255,255,255,0.4); margin: 10px 0 0 0; font-size: 11px;">This is an automated email. Please do not reply.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;

      // Use Strapi's email plugin (configured with Resend provider)
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
  },
};

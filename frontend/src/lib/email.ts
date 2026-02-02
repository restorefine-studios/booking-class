import { Resend } from "resend";

// Initialize Resend only when needed, with proper error handling
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }
  return new Resend(apiKey);
}

interface BookingConfirmationEmailData {
  to: string;
  customerName: string;
  className: string;
  classDate: string;
  classTime: string;
  amount: number;
  bookingId: string;
  currency?: string;
}

export async function sendBookingConfirmationEmail(data: BookingConfirmationEmailData) {
  const { to, customerName, className, classDate, classTime, amount, bookingId, currency = "GBP" } = data;

  // Initialize Resend client when the function is called
  const resend = getResendClient();

  const formattedAmount = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency,
  }).format(amount / 100); // Convert pence to pounds

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Booking Confirmed! 🎉</h1>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
          <p style="font-size: 16px; margin-bottom: 20px;">Dear ${customerName},</p>
          
          <p style="font-size: 16px; margin-bottom: 25px;">
            Thank you for booking with Masala Moves! Your payment has been successfully processed and your class booking is confirmed.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #667eea;">
            <h2 style="color: #667eea; margin-top: 0; font-size: 20px;">Booking Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Class:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">${className}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Date:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">${classDate}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Time:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">${classTime}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Amount Paid:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; text-align: right; color: #10b981; font-weight: bold;">${formattedAmount}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0;"><strong>Booking Reference:</strong></td>
                <td style="padding: 10px 0; text-align: right; font-family: monospace; color: #667eea;">#${bookingId}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 8px; margin-bottom: 25px;">
            <p style="margin: 0; font-size: 14px; color: #856404;">
              <strong>📌 Important:</strong> Please arrive 10 minutes before the class starts. Bring comfortable clothing and water.
            </p>
          </div>
          
          <p style="font-size: 16px; margin-bottom: 20px;">
            If you have any questions or need to make changes to your booking, please don't hesitate to contact us.
          </p>
          
          <p style="font-size: 16px; margin-bottom: 5px;">See you on the dance floor! 💃</p>
          <p style="font-size: 16px; margin-top: 5px;">
            <strong>The Masala Moves Team</strong>
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
          <p style="margin: 5px 0;">
            This is an automated confirmation email. Please do not reply to this email.
          </p>
          <p style="margin: 5px 0;">
            © ${new Date().getFullYear()} Masala Moves. All rights reserved.
          </p>
        </div>
      </body>
    </html>
  `;

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: process.env.CONTACT_EMAIL || "no-reply@masalamoves.co.uk",
      to: [to],
      subject: `Booking Confirmed - ${className} on ${classDate}`,
      html: emailHtml,
    });

    if (error) {
      console.error("❌ Error sending email:", error);
      throw error;
    }

    console.log("✅ Confirmation email sent successfully:", emailData);
    return { success: true, data: emailData };
  } catch (error) {
    console.error("❌ Failed to send confirmation email:", error);
    throw error;
  }
}

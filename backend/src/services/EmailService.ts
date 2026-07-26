import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export class EmailService {
  /**
   * Sends a welcome email to a new user.
   */
  static async sendWelcomeEmail(to: string, name: string) {
    const mailOptions = {
      from: `"SocialAI" <${process.env.SMTP_FROM}>`,
      to,
      subject: 'Welcome to SocialAI!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #8b5cf6;">Welcome to SocialAI, ${name}!</h2>
          <p>We're excited to have you on board. Start scaling your social media presence today with our AI-powered tools.</p>
          <a href="${process.env.FRONTEND_URL}/dashboard" style="display: inline-block; padding: 10px 20px; background-color: #8b5cf6; color: white; text-decoration: none; border-radius: 5px;">Go to Dashboard</a>
        </div>
      `,
    };

    return transporter.sendMail(mailOptions);
  }

  /**
   * Notifies a user about a failed scheduled post.
   */
  static async sendPostFailureNotification(to: string, postTitle: string, error: string) {
    const mailOptions = {
      from: `"SocialAI" <${process.env.SMTP_FROM}>`,
      to,
      subject: 'Action Required: Post Failed to Publish',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #ef4444;">Post Failed</h2>
          <p>Your post <strong>"${postTitle}"</strong> could not be published to your account.</p>
          <p><strong>Error:</strong> ${error}</p>
          <a href="${process.env.FRONTEND_URL}/dashboard/scheduler" style="display: inline-block; padding: 10px 20px; background-color: #8b5cf6; color: white; text-decoration: none; border-radius: 5px;">Fix Now</a>
        </div>
      `,
    };

    return transporter.sendMail(mailOptions);
  }
}

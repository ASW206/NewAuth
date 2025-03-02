import nodemailer from "nodemailer";

export async function sendVerificationEmail(email: string, token: string) {
  console.log("📨 Sending email to:", email);
  console.log("🔗 Verification link:", `http://localhost:3000/api/verify?token=${token}`);

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "jessepinkman0307@gmail.com",
      pass: "ilom vvra htdu pdca",
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"Your App Name" <jessepinkman0307@gmail.com>',
      to: email,
      subject: "Verify Your Email",
      html: `
        <h2>Verify Your Email</h2>
        <p>Click the link below to verify your email. This link will expire in 1 hour.</p>
        <a href="http://localhost:3000/api/verify?token=${token}&email=${email}" style="display:inline-block;padding:10px 20px;background:#007bff;color:#fff;text-decoration:none;border-radius:5px;">
          Verify Email
        </a>
        <p>If you did not request this, please ignore this email.</p>
      `,
    });

    console.log("✅ Email sent! Message ID:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

import nodemailer from "nodemailer";

async function sendEmail(to, resetToken) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Reset Your Password",
    html: `
    <h2>Password Reset Request</h2>

  <p>You requested to reset your password.</p>

  <p>Click the button below to reset your password:</p>

  <a href="${process.env.CLIENT_URL}/reset-password/${resetToken}">
      Reset Password
    </a>

  <p>This link will expire in 15 minutes.</p>
    `,
  });
}

export default sendEmail;

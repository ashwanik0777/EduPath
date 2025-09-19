import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendReminderEmail(to: string, subject: string, text: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  }
  return transporter.sendMail(mailOptions)
}

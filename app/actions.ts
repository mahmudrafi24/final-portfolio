"use server"

import nodemailer from "nodemailer"

type ContactFormData = {
  name: string
  email: string
  message: string
}

export async function sendContactEmail(data: ContactFormData) {
  // Create a test SMTP transporter
  // In production, you would use your actual email credentials
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER || "smtp.gmail.com",
    port: Number.parseInt(process.env.EMAIL_PORT || "465"),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER || "modacher.mahmud.rafi@gmail.com",
      pass: process.env.EMAIL_PASSWORD || "xunj znie swwt gebh",
    },
  })

  // Validate the form data
  if (!data.name || !data.email || !data.message) {
    throw new Error("Missing required fields")
  }

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_FROM || "portfolio@example.com",
    to: process.env.EMAIL_TO || "modacher.mahmud.rafi@gmail.com", // Your email where you want to receive messages
    subject: `Portfolio Contact: ${data.name}`,
    text: `
      Name: ${data.name}
      Email: ${data.email}
      
      Message:
      ${data.message}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <h3>Message:</h3>
      <p>${data.message.replace(/\n/g, "<br>")}</p>
    `,
  }

  try {
    // Send the email
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    throw new Error("Failed to send email")
  }
}

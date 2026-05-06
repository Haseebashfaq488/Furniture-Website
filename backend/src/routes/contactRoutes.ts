import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  try {
    // Create a Nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use 'gmail' or configure your custom SMTP host/port here
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 1. Send the "Thank you" auto-reply to the user
    const mailToUser = {
      from: `"Cozy Corner Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Re: ${subject || 'Thank you for your request'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #1fa055;">Thank you for reaching out, ${name}!</h2>
          <p>We have received your message and our team will get back to you as soon as possible.</p>
          <p><strong>Your message summary:</strong></p>
          <blockquote style="border-left: 4px solid #1fa055; padding-left: 10px; color: #555;">
            ${message}
          </blockquote>
          <p>Best regards,<br/>The Cozy Corner Team</p>
        </div>
      `,
    };

    // 2. Send the notification email to the store owner
    const mailToOwner = {
      from: `"Cozy Corner Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to the store owner's own email
      subject: `New Contact Request: ${subject || 'No Subject'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || 'None'}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${message}</p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailToUser);
    await transporter.sendMail(mailToOwner);

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email. Please ensure SMTP credentials are correct.' });
  }
});

export default router;

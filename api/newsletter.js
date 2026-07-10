const nodemailer = require('nodemailer');

const RECIPIENT = 'shamsconmac@gmail.com';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const body = req.body || {};
  const email = (body.email || '').toString().trim();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!emailValid) {
    res.status(400).send('Please enter a valid email address.');
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website Newsletter" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: RECIPIENT,
      subject: 'New Newsletter Subscriber',
      text: `New newsletter subscription:\n\nEmail: ${email}`,
    });

    res.status(200).send('Thank you for subscribing!');
  } catch (err) {
    console.error('newsletter send failed:', err);
    res.status(500).send('Oops! Something went wrong and we could not process your subscription.');
  }
};

const nodemailer = require('nodemailer');

const RECIPIENT = 'shamsconmac@gmail.com';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const body = req.body || {};
  const name = (body.name || '').toString().trim();
  const email = (body.email || '').toString().trim();
  const subject = (body.subject || '').toString().trim();
  const message = (body.message || '').toString().trim();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !subject || !message || !emailValid) {
    res.status(400).send('Please complete the form and try again.');
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
      from: `"${name} (via website)" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: RECIPIENT,
      subject: `New contact form message: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nSubject: ${subject}\n\nMessage:\n${message}`,
    });

    res.status(200).send('Thank You! Your message has been sent.');
  } catch (err) {
    console.error('contact form send failed:', err);
    res.status(500).send('Oops! Something went wrong and your message could not be sent.');
  }
};

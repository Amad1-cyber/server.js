
// server.js - HYMN Registration Server

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mail transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'relectance@gmail.com',
    pass: 'relectance100' // Use a Gmail App Password, not your actual password
  }
});

// POST /register route
app.post('/register', (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  // Admin notification
  const mailToAdmin = {
    from: 'relectance@gmail.com',
    to: 'relectance@gmail.com',
    subject: `New HYMN Account Registered: ${username}`,
    text: `A new user has registered:

Email: ${email}
Username: ${username}
Password: ${password}`
  };

  // User confirmation
  const mailToUser = {
    from: 'relectance@gmail.com',
    to: email,
    subject: 'HYMN Registration Confirmation',
    text: `Hello ${username},

Thank you for registering for HYMN.
Your credentials have been received.
You will be granted access as the platform grows.

Blessings,
HYMN Team`
  };

  transporter.sendMail(mailToAdmin, (errAdmin, infoAdmin) => {
    if (errAdmin) {
      console.error('Admin Email Error:', errAdmin);
      return res.status(500).json({ message: 'Registration failed: Admin mail failed.' });
    }

    transporter.sendMail(mailToUser, (errUser, infoUser) => {
      if (errUser) {
        console.error('User Email Error:', errUser);
        return res.status(500).json({ message: 'Registration failed: User mail failed.' });
      }

      return res.status(200).json({ message: 'Registration successful.' });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ HYMN Registration Server running at http://localhost:${PORT}`);
});

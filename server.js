const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `HYMN Registration: ${username}`,
      text: `Email: ${email}\nUsername: ${username}\nPassword (Hashed): ${hashedPassword}`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
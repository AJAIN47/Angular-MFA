const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const User = require('./models/User');
const { sendOtpEmail } = require('./utils/sendOtp');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config();
const app = express();
JWT_SECRET = 'mock_jwt_secret_key_1234567890'; // Replace with your actual secret key
app.use(cors());
app.use(express.json());
// Middleware
// app.use(cors());
// app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log('Mongo connected'));

// Registration API
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        email,
        password: hashedPassword,
        name: email.split('@')[0] 
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    // Generate OTP
    user.otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await user.save();

    // Send OTP via email
    await sendOtpEmail(email, user.otp);  // dynamically sent to user

    res.json({ requireOtp: true, userId: user._id.toString() });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Verify OTP
app.post('/api/verify-otp', async (req, res) => {
    const { userId, otp } = req.body;
  
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ error: 'Invalid user' });
    console.log(user.otp, otp);
    if (user.otp !== otp) return res.status(401).json({ error: 'Invalid OTP' });
  
    if (user.otpExpires < new Date())
      return res.status(401).json({ error: 'OTP expired' });
  
    // OTP is valid, clear otp fields
    user.otp = null;
    user.otpExpires = null;
    await user.save();
   
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
    // res.json({ success: true, message: 'Logged in successfully' });
  });
  
  app.get('/api/dashboard', authenticateToken, (req, res) => {
    res.json({ message: `Welcome, user ${req.user.id}` });
  });

  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
  
    if (!token) return res.status(401).json({ error: 'No token provided' });
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: 'Invalid token' });
      req.user = user;
      next();
    });
  }
  app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
  });
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const router = express.Router();
// const User = require('../models/User');

// function generateOtp() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// router.post('/login', async (req, res) => {
//   console.log('Login request received:', req.body);
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user && bcrypt.compareSync(password, user.password)) {
//     user.otp = Math.floor(100000 + Math.random() * 900000).toString();
// user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
// await user.save();

// await sendOtpEmail(user.email, user.otp); // <- dynamically send to user
    
//     user.otp = otp;
//     user.otpExpires = Date.now() + 300000;
//     await user.save();
//     res.json({ requireOtp: true, userId: user._id });
//   } else {
//     res.status(401).send('Invalid credentials');
//   }
// });

// router.post('/verify-otp', async (req, res) => {
//   const { userId, otp } = req.body;
//   const user = await User.findById(userId);
//   if (user && user.otp === otp && Date.now() < user.otpExpires) {
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//     res.json({ success: true, token });
//   } else {
//     res.status(401).json({ success: false, message: 'Invalid or expired OTP' });
//   }
// });

// module.exports = router;

const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App password, not your Gmail password
  },
});

/**
 * Sends OTP to the provided email
 * @param {string} toEmail - recipient's email
 * @param {string} otp - generated OTP
 */
const sendOtpEmail = async (toEmail, otp) => {
  const mailOptions = {
    from: `"Your App Name" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to ${toEmail}`);
  } catch (error) {
    console.error('❌ Failed to send OTP:', error);
    throw error;
  }
};

module.exports = { sendOtpEmail };
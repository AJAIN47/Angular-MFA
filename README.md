# 🔐 Angular + Node.js OTP Authentication System

This is a simple email-based OTP authentication system built using:
- Angular (frontend)
- Node.js with Express (backend)
- MongoDB (for user and OTP storage)
- Nodemailer (to send OTP emails via Gmail)

---

## 📦 Features

- Login using email
- OTP verification flow
- JWT token-based session
- Secure OTP sending via Gmail
- Protected routes (dashboard)

---

## 🚀 Getting Started

### 1. Clone the repo

[git clone https://github.com/yourusername/angular-mfa-demo.git](https://github.com/AJAIN47/Angular-MFA.git)
cd Angular-MFA

### 2. Setup Backend

cd backend
npm install

🔐 Configure environment variables
Create a .env file in the backend/ directory:

env

PORT=5000
MONGO_URI=your_mongodb_connection_string

# Use a dedicated Gmail account for OTP sending
EMAIL_USER=yourappemail@gmail.com
EMAIL_PASS=your_gmail_app_password
JWT_SECRET=your_secure_jwt_secret
✅ You must enable 2-Step Verification on your Gmail account and generate an App Password for Nodemailer:
https://support.google.com/mail/answer/185833

### 3. Start Backend Server
npm run dev

### 4. Setup Frontend
cd ../frontend
npm install
Update your backend API base URL if needed in your Angular environment files:

// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000'
};

### 5. Run Frontend App
npm start

## 🛠 Configuration Notes
OTP screen is part of the Login component (no separate route)
On successful OTP verification, token is stored in localStorage
AuthGuard protects /dashboard
Logout clears localStorage
Prevents browser "back" navigation to protected routes after logout
Uses window.location.href = '/login' for hard redirect

## 🧪 Testing
Enter your email and click "Login"
Check your inbox for the OTP (sent via Gmail)
Enter OTP and click "Verify"
You will be redirected to the dashboard

## 📌 TODO (optional improvements)
Switch to SendGrid or Mailgun for email
Add resend OTP functionality
Add timer on OTP screen
Add rate limiting on OTP requests

## 🧯 Troubleshooting
Error: Invalid login: 534-5.7.9
You didn't use an App Password with Gmail
Follow this guide - https://support.google.com/mail/answer/185833 - to enable 2FA and generate an app password

👨‍💻 Author
Built by Alish Jain
https://www.linkedin.com/in/alishjain0102/

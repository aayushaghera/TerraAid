// razorpay.js
const Razorpay = require('razorpay');

// Create Razorpay instance
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

module.exports = { instance };

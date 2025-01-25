require("dotenv").config();
const mongoose = require('mongoose');

const connectDB = async () => {

        await mongoose.connect(process.env.CONNECTION_LINK)
};

// Connect to MongoDB
connectDB();

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});


const paymentSchema = new mongoose.Schema({
    razorpay_order_id: {
      type: String,
      
    },
    razorpay_payment_id: {
      type: String,
      
    },
    razorpay_signature: {
      type: String,
      
    },
  });

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Payment = mongoose.model("Payment", paymentSchema);

module.exports = {
    Admin,
    User,
    Payment,
    connectDB,
    
};




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
    pannumber : String
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

const PostSchema = new mongoose.Schema({
    Name: String,
    location: String,
    Goal: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
});  

const ContactDetailsSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: Number,
  type: String,
  reference_id: String,
  notes: {
    position: String,
    comments: String,
  },
});

const NGOSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  referenceId: String,
  legalBusinessName: String,
  businessType: String,
  contactName: String,
  address: {
    street1: String,
    street2: String,
    city: String,
    state: String,
    postal_code: String,
    country: String,
  },
  pan: String,
  gst: String,
  bankDetails: {
    accountNumber: String,
    ifsc: String,
  },
  razorpayAccountId: String,
  fundAccountId: String,
  contactId: String,
  contactDetails: ContactDetailsSchema,
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Payment = mongoose.model("Payment", paymentSchema);
const create_post = mongoose.model("post",PostSchema);
const NGO = mongoose.model("NGO", NGOSchema);

module.exports = {
    Admin,
    User,
    Payment,
    create_post,
    NGO,
    connectDB,
    
};




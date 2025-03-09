require("dotenv").config();
const mongoose = require('mongoose');

const connectDB = async () => {

        await mongoose.connect(process.env.CONNECTION_LINK)
};

// Connect to MongoDB
connectDB();

// Organization Schema
const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const DonorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pan: { type: String, required: true }
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

    amount:{
      type: Number, 
    }
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
  ngoId: { type: mongoose.Schema.Types.ObjectId, ref: "create_post", required: true }, // 🔹 Reference to NGO
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

const Organization = mongoose.model("Organization", OrganizationSchema);
const Donor = mongoose.model("Donor", DonorSchema);
const Payment = mongoose.model("Payment", paymentSchema);
const create_post = mongoose.model("post",PostSchema);
const NGO = mongoose.model("NGO", NGOSchema);

module.exports = {
    Organization,
    Donor,
    Payment,
    create_post,
    NGO,
    connectDB,
};


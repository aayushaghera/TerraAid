require("dotenv").config();
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { z } = require("zod");
const { create_post } = require('../db'); // Import User model from db/index.js
const router = Router();
const axios = require("axios");
const cors = require('cors');
router.use(cors());
const {NGO} = require('../db');

//Create NGO (POST Route)
router.post("/CreatePost", async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Log request data
      const { Name, location, Goal, description } = req.body;
  
      // Directly create and save the NGO in MongoDB
      const newNGO = await create_post.create({ Name, location, Goal, description });
  
      res.status(201).json({ message: "NGO Created", ngo: newNGO });
    } catch (err) {
      res.status(500).json({ message: "Error creating NGO", error: err.message });
    }
  });



 

  // Get All NGOs (GET Route)
  router.get("/GetPost", async (req, res) => {
    try {
      const ngos = await create_post.find();
      res.json(ngos);
    } catch (err) {
      res.status(500).json({ message: "Error fetching NGOs", error: err.message });
    }
  });
  

//Create Razorpay Account
const createRazorpayAccount = async (ngoData) => {
  try {
    const response = await axios.post(
      "https://api.razorpay.com/v2/accounts",
      {
        email: ngoData.email,
        phone: ngoData.phone,
        type: "route",
        reference_id: ngoData.referenceId,
        legal_business_name: ngoData.legalBusinessName,
        business_type: ngoData.businessType,
        contact_name: ngoData.contactName,
        profile: {
          category: "healthcare",
          subcategory: "clinic",
          addresses: {
            registered: ngoData.address,
          },
        },
        legal_info: {
          gst: ngoData.gst,
        },
      },
      {
        auth: {
          username: process.env.RAZORPAY_API_KEY,
          password: process.env.RAZORPAY_API_SECRET,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error?.description || "Razorpay account creation failed!");
  }
};

// Create Razorpay Contact
const createRazorpayContact = async (contactDetails) => {
  try {
    const response = await axios.post(
      "https://api.razorpay.com/v1/contacts",
      contactDetails,
      {
        auth: {
            username: process.env.RAZORPAY_API_KEY,
          password: process.env.RAZORPAY_API_SECRET
        },
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data.id;
  } catch (error) {
    throw new Error(error.response?.data?.error?.description || "Contact creation failed!");
  }
};
// Create Fund Account
const createFundAccount = async (contactId, bankDetails, contactName) => {
  try {
    console.log(`Creating Fund Account for Contact ID: ${contactId}`);
    const response = await axios.post(
      "https://api.razorpay.com/v1/fund_accounts",
      {
        contact_id: contactId,
        account_type: "bank_account",
        bank_account: {
          name: contactName,
          ifsc: bankDetails.ifsc,
          account_number: bankDetails.accountNumber,
        },
      },
      {
        auth: {
            username: process.env.RAZORPAY_API_KEY,
          password: process.env.RAZORPAY_API_SECRET
        },
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Fund Account Response:", response.data);
    return response.data.id;
  } catch (error) {
    throw new Error(error.response?.data?.error?.description || "Fund Account creation failed!");
  }
};

router.post("/register-ngo", async (req, res) => {
    console.log("Request Body:", req.body);

    const latestNGO = await create_post.findOne().sort({ _id: -1 });

  let { name, email, phone, referenceId, legalBusinessName, businessType, contactName, address, pan, gst, bankDetails, contactDetails } = req.body;

  if (!contactDetails || !contactDetails.name || !contactDetails.email || !contactDetails.contact || !contactDetails.type || !contactDetails.reference_id) {
    return res.status(400).json({ error: "All contact details are required!" });
  }

  try {
    const contactId = await createRazorpayContact(contactDetails);
    const fundAccountId = await createFundAccount(contactId, bankDetails, contactName);
    
    // Create Razorpay Account for NGO
    const razorpayAccount = await createRazorpayAccount({
      email,
      phone,
      referenceId,
      legalBusinessName,
      businessType,
      contactName,
      address,
      gst,
    });

    const newNGO = new NGO({
      name, email, phone, referenceId, legalBusinessName, businessType, contactName, address, pan, gst,
      bankDetails, contactId, fundAccountId, contactDetails, razorpayAccountId: razorpayAccount.id,ngoId: latestNGO._id,
    });
    
    
    await newNGO.save();
    res.status(201).json({ message: "NGO registered successfully!", ngo: newNGO });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/ngos", async (req, res) => {
  const ngos = await NGO.find();
  res.json(ngos);
});


router.get("/getNGOByPostId/:id", async (req, res) => {
  try {
    const ngo = await NGO.findOne({ ngoId: req.params.id }); // ✅ Query NGO schema
    if (!ngo) {
      return res.status(404).json({ message: "NGO not found for this Post" });
    }
    res.json(ngo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching NGO", error: error.message });
  }
});


router.get("/getPOSTByPostId/:id", async (req, res) => {
  try {
    const post = await create_post.findOne({ _id: req.params.id }); // ✅ Use `_id`
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error: error.message });
  }
});


module.exports = router;



require("dotenv").config();
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { z } = require("zod");
const { Fundraiser } = require('../db'); // Import User model from db/index.js
const { DonationRecord } = require('../db');
const {NGO} = require('../db');
const { create_post } = require('../db');
const {Receipt} = require('../db');
const {Admin} = require('../db');
const router = Router();
const axios = require("axios");
const cors = require('cors');
router.use(cors());

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
  }

  const admin = await Admin.findOne({
      email: email,
      password: password
  });

  if (admin) {
      const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({
          token: token,
          name: admin.name,  // ✅ Include donor's name
          email: admin.email
      });
  } else {
      res.status(401).json({
          message: "Incorrect email or password. Please sign up and then log in."
      });
  }
});

router.post("/save-donation", async (req, res) => {
    try {
      const { ngoId, ngoName, amount } = req.body;
  
      // Find Fundraiser by ngoId
      let fundraiser = await Fundraiser.findOne({ ngoId });
  
      // If Fundraiser doesn't exist, create a new one
      if (!fundraiser) {
        fundraiser = new Fundraiser({
          ngoId,
          name: ngoName,
          raisedAmount: amount, // Initialize with the first donation
        });
      } else {
        // Update raised amount
        fundraiser.raisedAmount += Number(amount);
      }
  
      await fundraiser.save();
  
      res.status(201).json({ success: true, message: "Donation recorded successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error processing donation." });
    }
  });

router.post("/save-donation-record", async (req, res) => {
    try {
      const { ngoId, ngoName, donorName, donorEmail, amount } = req.body;
  
      let existingRecord = await DonationRecord.findOne({ ngoId });
  
      if (existingRecord) {
        // ✅ Add a new donor entry instead of overwriting
        existingRecord.donors.push({ donorName, donorEmail, amount, date: new Date() });
        await existingRecord.save();
        res.json({ success: true, message: "Donation record updated successfully!" });
      } else {
        // ✅ Create a new record for this NGO
        const newDonationRecord = new DonationRecord({
          ngoId,
          ngoName,
          donors: [{ donorName, donorEmail, amount, date: new Date() }]
        });
  
        await newDonationRecord.save();
        res.json({ success: true, message: "New donation record saved successfully!" });
      }
    } catch (error) {
      console.error("Error saving/updating donation record:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });


    router.get("/GetDonationRecord", async (req, res) => {
      try {
        const ngos = await DonationRecord.find();
        res.json(ngos);
      } catch (err) {
        res.status(500).json({ message: "Error fetching NGOs", error: err.message });
      }
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

    router.get("/getDonationHistory/:id", async (req, res) => {
      try {
        const History = await DonationRecord.findOne({ ngoId: req.params.id }); // ✅ Use `_id`
        if (!History) {
          return res.status(404).json({ message: "Post not found" });
        }
        res.json(History);
      } catch (error) {
        res.status(500).json({ message: "Error fetching post", error: error.message });
      }
    });

    router.get("/getFundRaiser/:id", async (req, res) => {
      try {
        const Fund = await Fundraiser.findOne({ ngoId: req.params.id }); // ✅ Use `_id`
        if (!Fund) {
          return res.status(404).json({ message: "Post not found" });
        }
        res.json(Fund);
      } catch (error) {
        res.status(500).json({ message: "Error fetching post", error: error.message });
      }
    });

    router.post("/save-Recipt", async (req, res) => {
      try {
        const {
          ngoId,
          ngoName,
          ngoEmail,
          ngoAcc,
          ngoISFC,
          ngoGST,
          street1,
          street2,
          city,
          state,
          postal_code,
          donorEmail,
          donorName,
          amount,
        } = req.body;
    
        const newReceipt = new Receipt({
          ngoId,
          ngoName,
          ngoEmail,
          ngoAcc,
          ngoISFC,
          ngoGST,
          address: { street1, street2, city, state, postal_code },
          donorEmail,
          donorName,
          amount,
        });
    
        await newReceipt.save();
        res.status(201).json({ message: "Receipt saved successfully!" });
      } catch (error) {
        console.error("Error saving receipt:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });


    
  

module.exports = router;

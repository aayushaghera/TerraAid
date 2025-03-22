require("dotenv").config();
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { z } = require("zod");
const { Fundraiser } = require('../db'); // Import User model from db/index.js
const { DonationRecord } = require('../db');
const router = Router();
const axios = require("axios");
const cors = require('cors');
router.use(cors());


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
  
  

module.exports = router;

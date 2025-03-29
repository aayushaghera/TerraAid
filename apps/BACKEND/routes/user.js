require("dotenv").config();
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { Donor } = require("../db"); // Assuming Donor model exists
const {ContactMessage} = require("../db");
const router = Router();
const { z } = require("zod");


// Donor signup route
router.post("/donor-signup", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const pan = req.body.pan;

    if (!name || !email || !password || !confirmPassword || !pan) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    

    const panSchema = z.object({
        pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, { message: "Invalid PAN format" }),
    });
    
    const validationResult = panSchema.safeParse({ pan });

    console.log(validationResult);
    
    if (!validationResult.success) {
        return res.status(400).json({ message: validationResult.error.errors[0].message });
    }
    

    const existingDonor = await Donor.findOne({ email });
    if (existingDonor) {
        return res.status(409).json({ message: "Email is already registered" });
    }

    await Donor.create({
        name: name,
        email: email,
        password: password,
        pan: pan
    });

    res.json({
        message: "Donor created successfully"
    });
});

// Donor login route
router.post("/donor-login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const donor = await Donor.findOne({
        email: email,
        password: password
    });

    if (donor) {
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({
            token: token,
            name: donor.name,  // ✅ Include donor's name
            email: donor.email  // ✅ Include donor's email
        });
    } else {
        res.status(401).json({
            message: "Incorrect email or password. Please sign up and then log in."
        });
    }
});

router.post("/contact", async (req, res) => {
    try {
      const { firstName, lastName, email, subject, message } = req.body;
  
      // Validate input fields
      if (!firstName || !lastName || !email || !subject || !message) {
        return res.status(400).json({ error: "All fields are required." });
      }
  
      // Save message to MongoDB
      const newMessage = new ContactMessage({ firstName, lastName, email, subject, message });
      await newMessage.save();
  
      res.status(200).json({ message: "Your message has been sent successfully!" });
    } catch (error) {
      console.error("Error saving message:", error);
      res.status(500).json({ error: "Internal Server Error. Please try again." });
    }
  });

module.exports = router;

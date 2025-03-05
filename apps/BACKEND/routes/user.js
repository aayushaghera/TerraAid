require("dotenv").config();
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { Donor } = require("../db"); // Assuming Donor model exists
const router = Router();

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
            token: token
        });
    } else {
        res.status(401).json({
            message: "Incorrect email or password. Please sign up and then log in."
        });
    }
});

module.exports = router;

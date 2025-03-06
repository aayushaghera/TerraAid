require("dotenv").config();
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { Organization } = require("../db"); // Assuming Organization model exists
const router = Router();

// Organization signup route
router.post("/organization-signup", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

        const response = await fetch(process.env.NGO_API);
    const data = await response.json();

    if (data.extract_data) {
        const organization = data.extract_data.find(org => org['Email id'] === email);

    if (!organization) {
        return res.status(403).json({ message: "Email not found in the authorized organizations list" });
    }
    }

    const existingOrganization = await Organization.findOne({ email });
    if (existingOrganization) {
        return res.status(409).json({ message: "Email is already registered" });
    }

    await Organization.create({
        name: name,
        email: email,
        password: password
    });

    res.json({
        message: "Organization created successfully"
    });
});

// Organization login route
router.post("/organization-login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const organization = await Organization.findOne({
        email: email,
        password: password
    });

    if (organization) {
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

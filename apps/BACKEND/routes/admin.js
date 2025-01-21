require("dotenv").config();
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { Admin } = require('../db'); // Now we import Admin from db/index.js
const router = Router();


// Admin signup route
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;


    if (!email || !username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const response = await fetch(process.env.NGO_API);
    const data = await response.json();

    if (data.extract_data) {
        const organization = data.extract_data.find(org => org['Email id'] === email);

    if (!organization) {
        return res.status(403).json({ message: "Email not found in the authorized organizations list" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        return res.status(409).json({ message: "Email is already registered" });
    }

    
        await Admin.create({
            username : username,
            password : password,
            email : email
    })
       
    res.json({
        message : 'admin created successfully'
    })
}
    
});

// Admin signin route
router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    if (!email || !username || !password) {
        return res.status(400).json({ message: "Email, username, and password are required" });
    }

    
        const admin = await Admin.findOne({
            username: username,
            password: password,
            email: email
        });

        if (admin) {
            const token = jwt.sign({
                username
            }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({
                token
            });
        } else {
            res.status(401).json({
                message: "Incorrect email, username, or password. Please sign up and then log in."
            });
        }
    
});

module.exports = router;



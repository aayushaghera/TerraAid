require("dotenv").config();
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { Admin } = require('../db'); // Now we import Admin from db/index.js
const router = Router();

// Admin signup route
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    
        await Admin.create({
            username : username,
            password : password
    })
       
    res.json({
        message : 'admin created successfully'
    })
    
});

// Admin signin route
router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    
        const admin = await Admin.findOne({
            username : username,
            password : password
        })
        if (admin) {
            const token = jwt.sign({
                 username }, process.env.JWT_SECRET, { expiresIn: '1h' });
               
            res.json({
            token
            })
        } else {
            res.status(411).json({
                message: "Incorrect email and pass please signup and then login"
            })
        }
     
});

module.exports = router;

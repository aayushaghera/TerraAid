require("dotenv").config();
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../db'); // Import User model from db/index.js
const router = Router();

// User signup route
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

  
    await User.create({
        username : username,
        password : password
})

    res.json({
    message : 'user created successfully'
    })

});

// User signin route
router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    
        const user = await User.findOne({
            username : username,
            password : password
        })
        if (user) {
            const token = jwt.sign({ 
                username }, process.env.JWT_SECRET, { expiresIn: '1h' });

                res.json({
                    token
                })
                
        } else {
            res.status(411).json({
                message: "Incorrect email and pass"
            })
        }
});

module.exports = router;

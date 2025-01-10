const { Router } = require("express");
const jwt = require("jsonwebtoken");
const router = Router();

// Admin Routes
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

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    console.log(JWT_SECRET);

    const admin = await Admin.findOne({
        username : username,
        password : password
    })
    if (admin) {
        const token = jwt.sign({
            username
        }, JWT_SECRET);

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
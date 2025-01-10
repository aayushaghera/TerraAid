const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");


// User Routes
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

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(JWT_SECRET);

    const user = await User.findOne({
        username : username,
        password : password
    })
    if (user) {
        const token = jwt.sign({
            username
        }, JWT_SECRET);

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
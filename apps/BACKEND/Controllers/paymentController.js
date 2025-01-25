const { instance } = require('../../../razorpay.js');
const { Router } = require('express');
const { Payment } = require('../db/index.js');
const router = Router();


router.post('/checkout', async (req, res) => {
    const { amount } = req.body;

    if (!amount) {
        return res.status(400).json({
            success: false,
            message: "Amount is required",
        });
    }

    const options = {
        amount: Number(amount) * 100, 
        currency: "INR",
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
        success: true,
        order: order,
    });
});


router.post('/paymentVerification', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    
    await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
    });

    console.log(req.body);

    res.status(200).json({
        message: "Payment verified and details saved successfully",
    });
});

module.exports = { router };

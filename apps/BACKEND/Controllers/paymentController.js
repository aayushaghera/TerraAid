const { instance } = require('../../../razorpay.js');  
const { Router } = require('express');
const router = Router();


router.post('/checkout', async (req, res) => {


    const options = {
        amount: 50000,
        currency: "INR",
    };

        // Create an order using Razorpay's API
        const order = await instance.orders.create(options);
        console.log(order);

        res.status(200).json({
            success: true,
        });
});

module.exports = { router };


































// const { instance } = require('../../../razorpay.js');  // Adjust the path as needed
// const { Router } = require('express');
// const router = Router();

// router.post('/checkout', async (req, res) => {
//         console.log('Razorpay instance:', instance);

//         const options = {
//             amount: 50000,  
//             currency: "INR",
        
//         };

//         // Create an order using Razorpay's API
//         const order = await instance.orders.create(options);
//         console.log(order);
//         res.status(200).json({
//             success: true,
//             order: order
//         });
    
// });

// // Export only the router
// module.exports = { router };


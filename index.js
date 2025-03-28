
const cors = require('cors'); // Import cors
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config(); 

const { connectDB } = require('./apps/BACKEND/db');


const adminRouter = require('./apps/BACKEND/routes/admin');
const userRouter = require('./apps/BACKEND/routes/user');
const paymentRouter = require('./apps/BACKEND/routes/paymentRoutes');

const PostRouter = require('./apps/BACKEND/routes/Post');

const AdministratorRouter = require('./apps/BACKEND/routes/Administrator.js');

const { router: checkoutRouter } = require('./apps/BACKEND/Controllers/paymentController');
const { router : paymentverifyRouter} = require('./apps/BACKEND/Controllers/paymentController');


const { instance } = require('./razorpay.js'); // Now importing from razorpay.js

const { connect } = require('mongoose');

const app = express();
const PORT = 1200;

connectDB();

app.use(cors());


// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));



app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/payment', paymentRouter);
app.use("/api", checkoutRouter);
app.use("/api",paymentverifyRouter);
app.use("/Post",PostRouter);
app.use("/Administrator",AdministratorRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = { instance }; // The Razorpay instance is now exported from razorpay.js































// const express = require('express');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// dotenv.config(); 
// const Razorpay = require('razorpay');

// const { connectDB } = require('./apps/BACKEND/db'); 



// const { apps } = require("./razorpay.js");

// const adminRouter = require('./apps/BACKEND/routes/admin'); // Admin routes
// const userRouter = require('./apps/BACKEND/routes/user');   // User routes
// const paymentRouter = require('./apps/BACKEND/routes/paymentRoutes');
// const checkout = require('./apps/BACKEND/Controllers/paymentController');

// const { connect } = require('mongoose');

// const app = express();
// const PORT = 1200;

// // Connect to MongoDB
// connectDB()

// apps()


// // Middleware
// app.use(bodyParser.json());

// // Routes
// app.use('/admin', adminRouter);
// app.use('/user', userRouter);
// app.use('/payment',paymentRouter);
// app.use("/checkout" ,checkout)





// const instance = new Razorpay({
//   key_id: process.env.RAZORPAY_API_KEY,
//   key_secret: process.env.RAZORPAY_API_SECRET,
// });

// module.exports = { instance };


// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

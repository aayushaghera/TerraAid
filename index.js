const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config(); 
const { connectDB } = require('./apps/BACKEND/db'); 

const adminRouter = require('./apps/BACKEND/routes/admin'); // Admin routes
const userRouter = require('./apps/BACKEND/routes/user');   // User routes
const { connect } = require('mongoose');

const app = express();
const PORT = 1200;

// Connect to MongoDB
connectDB()


// Middleware
app.use(bodyParser.json());

// Routes
app.use('/admin', adminRouter);
app.use('/user', userRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

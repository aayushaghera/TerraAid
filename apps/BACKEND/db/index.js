const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Db_Ngo:aayush123@cluster0.zpd4r.mongodb.net/login_cred');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
module.exports = {
    Admin,
    User
}

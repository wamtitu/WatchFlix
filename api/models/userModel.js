const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: Number,
        required: true
    },
    profile: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
},{timestamp: true});

module.exports = mongoose.model('User', userSchema);
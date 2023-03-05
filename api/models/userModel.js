const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
        required: true,
        selected: false
    },
    profile: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
},{timestamp: true});

userSchema.pre('save', async function(next){

    //runs if password is modified
    if(!this.isModified('password')) return next();

    //encrypt the password with a cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    next();
})

module.exports = mongoose.model('User', userSchema);
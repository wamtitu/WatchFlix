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
},{timestamps: true});

//userSchema.pre('save', async function(next){
    //const hashSalt=12;

    //runs if password is modified
    //if(!this.isModified('password')) return next();

    //encrypt the password with a cost of 12
   // this.password = await bcrypt.hash(this.password, hashSalt, (err)=>{
     //   console.log(err);
   // });

   // next();
//})

module.exports = mongoose.model('User', userSchema);
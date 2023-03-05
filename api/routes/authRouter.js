const express = require('express');
const User = require('./../models/userModel');
const router = express.Router();
const bcrypt = require('bcryptjs');
//const CryptoJS = require("crypto-js");

router.post('/signup', async(req, res)=>{
   try{
    console.log(process.env.MY_SECRET);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    //console.log(req.body.password)
    const user = await newUser.save();

    res.status(201).json(user);
   }catch(err){
    res.status(500).json(err);
    console.log(err)
   }
});
module.exports= router;
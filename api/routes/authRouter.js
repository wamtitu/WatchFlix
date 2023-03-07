const express = require('express');
const User = require('./../models/userModel');
const router = express.Router();
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
const CryptoJS = require("crypto-js");

router.post('/signup', async(req, res)=>{
   try{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password//CryptoJS.AES.encrypt(req.body.password, process.env.MY_SECRET_KEY).toString()
    });
    //console.log(req.body.password)
    const user = await newUser.save();

    res.status(201).json(user);
   }catch(err){
    res.status(500).json(err);
    console.log(err)
   }
});
//loggging in users

router.post('/login', async (req, res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        //console.log(req.body.email)
    if(!user){res.status(404).json('incorrect email or password') };
    const originalPassword = user.password;
    //console.log(originalPassword)
    const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.MY_SECRET_KEY, {expiresIn: "90d"})
    if(originalPassword === req.body.password){
        res.status(200).json({message:'successfully logged in', token: accessToken,body: user})
    }
    }
    catch(err){res.status(401).json(err)}
})
module.exports= router;
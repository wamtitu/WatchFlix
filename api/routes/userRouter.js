const express = require('express');
const router = express.Router();
const verify = require('./../verify');
const User = require('./../models/userModel')

//updating user
router.put("/:id", verify, async (req, res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        //if it is password remember to encrpt
        console.log(req.user.id)
        console.log(req.params.id)
        
        try{
            const updateUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body,}, {new: true});
            res.status(200).json(updateUser);
        }catch(err){
            res.status(400).json(err)
        }

    }else{
        res.status(401).json('log in with correct credentials to cange account details')
    }
})
//deleting user
router.delete("/:id", verify, async (req, res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        
        try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json('user has been deleted');
        }catch(err){
            res.status(400).json(err)
        }

    }else{
        res.status(401).json('you are only allowed to delete your account');
    }
})
//get user
router.get("/find/:id", async (req, res)=>{
        
        try{
            const user = await User.findById(req.params.id);
            res.status(200).json(user);
        }catch(err){
            res.status(400).json(err)
        }
})
//get all users

router.get("/", verify, async (req, res)=>{
    const query = req.query.new;
    if(req.user.isAdmin){
        
        try{
            const users = query ? await User.find().limit(5) : await User.find();
            res.status(200).json(users);
        }catch(err){
            res.status(400).json(err)
        }

    }else{
        res.status(401).json('you are not authorised to access all users')
    }
})
//getting user stats

router.get('/stats', async(req, res)=>{
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    try{
        const stats = await User.aggregate([
            {
                $project: {
                    month: {$month: "createdAt"}
                }
            },
            {
                $groups: {
                    _id: $month,
                    total: {$sum: 1}
                }
            }
        ])
        res.status(200).json(data)

    }catch(err){
        res.status(400).json(err)
    }
})
module.exports = router;
const express = require('express');
const router = express.Router();
const List = require('./../models/listsModel');
const verify = require('./../verify');

//create list
router.post("/", verify, async (req, res)=>{
    if(req.user.isAdmin){
        const newList = new List(req.body)
        try{
            const createdList = await newList.save();
            res.status(200).json(createdList);
        }catch(err){
            res.status(400).json(err)
        }

    }else{
        res.status(401).json(err)
    }
});

//deleting list
router.delete("/:id", verify, async (req, res)=>{
    if(req.user.isAdmin){
        try{
            await List.findByIdAndDelete(req.params.id);
            res.status(200).json("list deleted");
        }catch(err){
            res.status(400).json(err)
        }

    }else{
        res.status(401).json(err)
    }
});

//getting a list
router.get('/', verify, async(req, res)=>{
    const typequery = req.query.type;
    const genrequery = req.query.type;
    let list = [];

    try{
        if(typequery){
            if(genrequery){
                const list = await List.aggregate([
                    {$sample: {size: 10}},
                    {$match: {type: typequery, genre: genrequery}}
                ])
            }else{
                const list = await List.aggregate([
                    {$sample: {size: 10}},
                    {$match: {type: typequery}}
                ])
            }
        }else{
            const list = await List.aggregate([
                {$sample: {size: 10}}
            ])
        }
        res.status(200).json(list)

    }catch(err){
        res.status(200).json(err)
    }
})

module.exports = router;
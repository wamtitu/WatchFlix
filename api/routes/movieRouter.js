const express = require('express');
const router = express.Router();
const Movie = require('./../models/movieModel');
const verify = require('./../verify');


//creating a movie
router.post("/addMovie", verify, async (req, res)=>{
    if(req.user.isAdmin){
        const newMovie = new Movie(req.body)
        try{
            const createdMovie = await newMovie.save();
            res.status(200).json(createdMovie);
        }catch(err){
            res.status(400).json(err)
        }

    }else{
        res.status(401).json(err)
    }
});

router.put("/:id", verify, async (req, res)=>{
    if(req.user.isAdmin){
        try{
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },{
                new: true
            });
            res.status(200).json(updatedMovie);
        }catch(err){
            res.status(400).json(err)
        }

    }else{
        res.status(401).json(err)
    }
});

//deleting movies
router.delete("/:id", verify, async (req, res)=>{
    if(req.user.isAdmin){
        try{
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("movie has been deleted");
        }catch(err){
            res.status(400).json(err)
        }

    }else{
        res.status(401).json(err)
    }
});

//get movie
router.get("/find/:id", verify, async (req, res)=>{
        try{
            const movie = await Movie.findById(req.params.id);
            res.status(200).json(movie);
        }catch(err){
            res.status(400).json(err)
        }

});


//get a random movie
router.get("/random", verify, async (req, res)=>{
    const type = req.query.type;
    let movie;
    try{
        if(type === 'series'){
            movie = await Movie.aggregate([
                {$match: {isSeries: true}},
                {$sample: {size: 1}}
            ]);
        }else{
            movie = await Movie.aggregate([
                {$match: {isSeries: false}},
                {$sample: {size: 1}}
            ]);
        }
        res.status(200).json(movie);
    }catch(err){
        res.status(400).json(err)
    }
});

//get all movies
router.get("/", verify, async (req, res)=>{
    if(req.user.isAdmin){
        try{
            const movies = await (await Movie.find()).reverse();
            res.status(200).json(movies);
        }catch(err){
            res.status(400).json(err)
        }

    }else{
        res.status(401).json(err)
    }
});

module.exports = router;
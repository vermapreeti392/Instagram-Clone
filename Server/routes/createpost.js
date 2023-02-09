const express = require('express');
const requirelogin = require('../middlewares/requirelogin');
const user = require('../models/userSchema');
const router = express.Router();
const mypost = require('../models/postSchema');
// const {userdata} = require('../middlewares/requirelogin')

// Route
router.get('/allposts', requirelogin, async(req,res)=>{
   try{
    const data = await mypost.find().populate("postedBy", "_id name Photo").populate("comments.postedBy", "_id name").sort("-createdAt")
    //console.log(data);
    //const allpost= data.populate("postedBy", "_id name")
    return res.status(200).json({
        status: "success",
        data
    })
   }
   catch(e){
    res.status(422).json({
        status: "failure",
        error: e.error,
    })
   }
    
})
router.post('/createpost', requirelogin ,async(req,res)=>{
    try{
        const {caption, pic} = req.body;
        if(!pic){
        return res.status(422).json({
            error: "please choose an image"
        })
    }
    req.user;
    
    const posts = await mypost.create({
        caption,
        photo:pic,
        postedBy: req.user
    })
    return res.status(200).json({
        status: "success",
        message: "photo uploaded successfully",
        posts
    })
    }
    catch(e){
         res.status(422).json({
            status: "failure",
            error: e.error,
        })
    }
})

module.exports = router
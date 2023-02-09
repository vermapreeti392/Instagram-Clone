const express = require('express');
const requirelogin = require('../middlewares/requirelogin');
const user = require('../models/userSchema');
const router = express.Router();
const mypost = require('../models/postSchema');

// to update the like field
router.put('/likes', requirelogin, async(req,res)=>{
    try{
        const likes = await mypost.findByIdAndUpdate(req.body.postId,{
            $push:{likes: req.user._id}
        }, {new: true}).populate('postedBy', "_id name Photo")
        //console.log(likes);
        
        
            return res.status(200).json({
                status: "success",
                likes
            })
        
    }
    catch(e){
        res.status(500).json({
            status:"failure",
            error: e.error
        })
    }
})

// unlike
router.put('/unlike', requirelogin, async(req,res)=>{
    try{
        const likes = await mypost.findByIdAndUpdate(req.body.postId,{
            $pull:{likes: req.user._id}
        }, {new: true}).populate('postedBy', "_id name Photo")
        
       
            return res.status(200).json({
                status: "success",
                likes
            })
        
    }
    catch(e){
        res.status(500).json({
            status:"failure",
            error: e.error
        })
    }
})
module.exports = router;
const express = require('express');
const requirelogin = require('../middlewares/requirelogin');
const user = require('../models/userSchema');
const router = express.Router();
const mypost = require('../models/postSchema');

router.get('/myprofile',requirelogin, async(req,res)=>{
    try{
        const data = await mypost.find({postedBy:req.user._id}).populate('postedBy', "_id name").populate('comments.postedBy', '_id name').sort("-createdAt")
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

// update profile pic

router.put('/updateProfilePic', requirelogin, (req,res)=>{
    user.findByIdAndUpdate(req.user._id,{
        $set : {Photo:req.body.pic}
    }, {new : true}).exec((err,result)=>{
        if(err){
            return res.status(422).json({error: err})
        }
        else{
            res.json(result)
        }
    })
})
module.exports = router
const express = require('express');
const requirelogin = require('../middlewares/requirelogin');
const router = express.Router();
const mypost = require('../models/postSchema');

// comment

router.put('/comment', requirelogin, async(req,res)=>{
    try{
        const comment = {
            comment: req.body.text,
            postedBy: req.user._id
        }
         const newComment = await mypost.findByIdAndUpdate(req.body.postId, {
            $push : {comments : comment}
         }, {new: true}).populate("comments.postedBy", "_id name" ).populate("postedBy" , "_id name")
        // console.log(newComment);
         return res.status(200).json({
            newComment
         }
            
         )
    }
    catch(e){
        res.status(422).json({
            status:'failure',
            error : e.error
        })
    }
})
module.exports = router
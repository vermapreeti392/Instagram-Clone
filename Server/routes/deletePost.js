const express = require('express');
const requirelogin = require('../middlewares/requirelogin');
const router = express.Router();
const mypost = require('../models/postSchema');

// delete comment

router.delete('/deletePost/:postId', requirelogin, async(req,res)=>{
   try{
    const data = await mypost.findOne({_id: req.params.postId}).populate("postedBy", "_id")
    if(!data){
        return res.json(422).json({
            status: "failure",
            error: "comment not available"
        })
    }
   // console.log(data.postedBy._id.toString(),req.user._id.toString());
    if(data.postedBy._id.toString()===req.user._id.toString()){
        data.remove()
        return res.status(200).json({
            message: "post deleted successfully"
        })
    }
    }
   catch(e){
    res.status(422).json({
        status: "failure",
        error: e.error
    })
   }
})

module.exports = router
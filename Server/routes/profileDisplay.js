const express = require('express');
const requirelogin = require('../middlewares/requirelogin');
const router = express.Router();
const user = require('../models/userSchema')
const mypost = require('../models/postSchema');


// profile display
router.get('/userProfile/:id', async(req,res)=>{
    try{
        const data = await user.findOne({_id: req.params.id}).select('-password')
        //console.log(data);
     if(data){
         const ProfileData = await mypost.find({postedBy: req.params.id}).populate("postedBy","_id")
         //console.log(ProfileData)
     
        if(!ProfileData){
            return res.status(422).json({
                status: "failure",
                error : "profile not available" 
            })

        }
        else{
            return res.status(200).json({
                status: 'success',
                 ProfileData,
                 data
            })
        
    
    }}
    
}

    catch(e){
        res.status(422).json({
            status : "failure",
            error: e.error
        })
    }
    
})

module.exports = router;
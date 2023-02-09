const express = require('express');
const user = require('../models/userSchema');
const bcrypt = require('bcrypt')
const router = express.Router();
const jwt = require('jsonwebtoken');
const {jwt_token} = require('../keys')
const requirelogin = require('../middlewares/requirelogin');
router.post("/signin",async (req,res)=>{
    try{
        const {email, password} = req.body;
        // console.log(req.body)
        if(!email || !password){
          return  res.status(422).json({
                error: "add all the fields"
            })
        }
        const userData = await user.findOne({email})
        if(!userData){
            return  res.status(404).json({
                  error: "user not found"
              })
          }
          bcrypt.compare(password, userData.password, function (err, result) {
            // result == true
            if (err) {
                return res.status(500).json({
                    error: err.message
                })
            }
            if (result) {
                // return res.status(200).json({
                //     message: "user logged in successully"
                // })
                 const token = jwt.sign({_id:userData.id},jwt_token)            
                 const {_id,name, email, username} = userData
                 //console.log({_id, name, email, username});
                return res.json({
                    token:token,
                    user: {_id, name, email, username},
                    message: "user logged in successully"})   
                
            }
            else {
                return res.status(500).json({
                    error: "password not matched"
                })
            }
        })
    }catch(e){
        return res.status(500).json({
            error:e.message
        })
    }
})

router.get('/createpost', requirelogin, (req,res)=>{
    console.log("hello auth");
    res.send("user authneticated");
})
module.exports = router;
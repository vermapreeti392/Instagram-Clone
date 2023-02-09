const express = require('express');
const user = require('../models/userSchema');
const bcrypt = require('bcrypt')
const router = express.Router();

// router.get('/',(req,res)=>{
//     res.send('hiii');
// })

// signup page

router.post('/signup', async(req,res)=>{
    //  console.log(req.body.name)

    try{
        const {name, username,email, password} =  req.body;

        if(!name || !username || !email || !password){
            return res.status(404).json({
                status: "failed",
                error: "enter all fields"
            })
        }
       const existemail = await user.findOne({email: email})
       const user_name = await user.findOne({username: username})
       if(existemail){
        return res.status(422).json({
            status: "signup failed",
            error: "email already exist"
        })
       }
       
       if(user_name){
        return res.status(422).json({
            status: "signup failed",
            error: "username already exist"
        })
       }
       else{
        bcrypt.hash(password, 10, async (err, hashedPass)=>{
            if (err) {
                return res.status(409).json({
                  status: "failed",
                  message: err.message
                })
              }
            const data = await user.create({
                name, 
                username,
                email,
                password : hashedPass
            })
            return res.status(200).json({
                status: "success",
                message: "signup successfully",
                data,
            })
        })
        
        
       }
        
  
    }
    catch(e){
        return res.status(400).json({
            status: "signup failed",
            message: e.message,
        })
    }
});

// router.get('/signup', async(req,res)=>{
//   try{  const data = await user.find();
//     res.json({
//         status: "success",
//         data,
//     })}
//     catch(e){
//         res.status(422).json({
//             status: "failed",
//             message:e.message, 
//         })
//     }
//  })


module.exports = router;
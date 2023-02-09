const jwt = require("jsonwebtoken")
const {jwt_token} = require("../keys")
const user = require('../models/userSchema');
module.exports = async (req, res,next)=>{
   //console.log("hello");
   const {authorization} = req.headers;
   // console.log(authorization);
   if(!authorization){
       return res.status(401).json({error:"you must have login"})
   }
   const token = authorization.replace("Bearer ", "");
   //console.log(token);
   await jwt.verify(token, jwt_token,  async (err,payload)=>{
       if(err){
           return res.status(401).json({error:"you must have login"})
       }
       const {_id}= payload;
       const userdata = await user.findById(_id);
       
       if(userdata){
            req.user = userdata
            
           //console.log(userdata);
       }
   })
    next()
}
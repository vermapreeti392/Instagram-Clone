const express = require('express');
const app = express();
const port = process.env.port || 5000;
const cors = require('cors');
const getConnection = require('./connection/conn');
const auth = require('./routes/auth')
const signin = require('./routes/signin');
const createpost = require('./routes/createpost')
const myprofile = require('./routes/profile')
const like_unlike = require('./routes/likes') 
const comment = require('./routes/comment')
const delete_Comment = require('./routes/deletePost')
const display_profile = require('./routes/profileDisplay')
const followe_unfollow = require('./routes/followSection')
getConnection ();

app.use(cors());
app.use(express.json());
app.use(auth);
app.use(signin);
app.use(createpost);
app.use(myprofile);
app.use(like_unlike);
app.use(comment);
app.use(delete_Comment);
app.use(display_profile);
app.use(followe_unfollow);
app.get("/", (req,res)=>{
    res.json("hello");
})

app.listen(port, ()=>{
    console.log(`server is running at ${port}`);
})

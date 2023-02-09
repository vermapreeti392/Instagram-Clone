const express = require('express');
const requirelogin = require('../middlewares/requirelogin');
const router = express.Router();
const user = require('../models/userSchema')
const mypost = require('../models/postSchema');

// follower and following user

router.put('/follow', requirelogin, async (req, res) => {
    user.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.user._id }
    }, { new: true }, (err, result) => {
        if (err) {
            return res.status(404).json({
                status: "failure",
                error: "user not found"
            })
        }
        user.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.followId }
        }, { new: true }).then(result =>
            //console.log(result),
            res.json(result)).catch(err => { return res.status(422).json({ error: err }) })
    })


})

// unfollow user

// router.put('/unfollow', requirelogin, async (req, res) => {
//     user.findByIdAndUpdate(req.body.followId, {
//         $pull: { followers: req.user._id }
//     }, { new: true }, (err, result) => {
//         if (err) {
//             return res.status(404).json({
//                 status: "failure",
//                 error: "user not found"
//             })
//         }
//         user.findByIdAndUpdate(req.user._id, {
//             $pull: { following: req.body.followId }
//         }, { new: true }).then(result =>
//             console.log(result),
//             res.json(result)).catch(err => { return res.status(422).json({ error: err }) })
//     })
// })

// to unfollow user
router.put("/unfollow", requirelogin, (req, res) => {
    user.findByIdAndUpdate(req.body.followId, {
        $pull: { followers: req.user._id }
    }, {
        new: true
    }, (err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        user.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.body.followId }
        }, {
            new: true
        }).then(result => res.json(result))
            .catch(err => { return res.status(422).json({ error: err }) })
    }
    )
})

// following posts

router.get('/myfollowingpost', requirelogin , async(req,res)=>{
    mypost.find({postedBy: {$in: req.user.following}}).populate('postedBy', '_id name')
    .populate('comments.postedBy', '_id name')
    .then(posts=>{
         res.json(
            posts
        )
    }).catch(e=>{
        console.log(e)
    })
})

module.exports = router
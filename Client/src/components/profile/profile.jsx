import React, { useEffect } from "react";
import { useState } from "react";
import PostDetail from "../PostDetail/PostDetail";
import './profile.css'
import ProfilePic from "./ProfilePic";
const Profile = ()=>{
    var ProfilePicLink = "https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
    const [pic, setPic] = useState([])
    //console.log(pic.length)
    const [showComment, setShowComment] = useState(false)
    const [commentPic, setCommentPic] = useState([]); 
    const [changePic, setChangePic] = useState(false);
    const [user, setUser] = useState("")
    const viewPostdetails = (post)=>{
        if(showComment){
            setShowComment(false)
        }
        else{
            setShowComment(true)
            setCommentPic(post)            
            //console.log(commentPic.comments);
        }
    }
    // change profilepic

    const changeProfilepic = ()=>{
        if(changePic){
            setChangePic(false);
        }
        else{
            setChangePic(true);
        }
    }
    useEffect(()=>{
        fetch(`https://insta-backend-bmup.onrender.com/userProfile/${JSON.parse(localStorage.getItem("user"))._id}`, {
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json()).then(result=>{
            //console.log(result)
            setPic(result.ProfileData)
            setUser(result.data)})           
            .catch(e=>console.log(e))
    }, [])
    return(
        <div className="profile" >
            {/* Profile frame */}
            <div className="profile-frame">
                
                {/* profilepic */}
                <div className="profile-pic">
                    <img onClick={()=>{changeProfilepic()}} 
                    src={(user.Photo ? user.Photo : ProfilePicLink )} alt="" />                   
                    
                </div>
                {/* profile-data */}
                <div className="profile-data">
                    <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
                    <div className="profile-info" style={{display:"flex"}}>
                        <p>{pic? pic.length: "0"}  posts</p>
                        <p>{user.followers? user.followers.length : "0"}  follower</p>
                        <p>{user.following? user.following.length : "0"}  folllowing</p>
                    </div>
                </div>
            </div>
            <hr style={{width: "94%", margin:"25px auto", opacity:"0.8"}}/>
            {/* gallery */}
            <div className="gallery">
               {pic.map((pics)=>{
                return(
                    <img key={pics._id} src={pics.photo} onClick={()=>{viewPostdetails(pics)}} alt=""/>
                )                
               })}
            </div>
            {showComment &&  <PostDetail commentPic= {commentPic} viewPostdetails= {viewPostdetails}/> }
            {changePic && 
            <ProfilePic changeProfilepic = {changeProfilepic}/>
            }
        </div>
    )
}
export default Profile;
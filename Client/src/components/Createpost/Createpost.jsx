import React, { useState, useEffect } from "react";
import {  toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"
import './Createpost.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const Createpost = () => {
    const navigate = useNavigate();
    const [caption, setCaption] = useState("")
    const [image, setImage] = useState("")

    
    // getting img from cloudinary
    const [imgurl, setImgurl] = useState("")
      //console.log(imgurl)
      
     // toast function
     const notifyError = (msg) => toast.error(msg);
     const notifyMsg = (msg)=>toast.success(msg)



useEffect(()=>{
    
    if(imgurl){
        
        // saving imageurl and caption in mongo
     fetch("https://insta-backend-bmup.onrender.com/createpost",{
        method:"post",
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer "+ localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            caption,
            pic: imgurl
        })
      }).then(res =>res.json()).then(data=>
       { if(data.error){
        // console.log(data.error)
        notifyError(data.error)
        }
        else{
          
            notifyMsg(data.message)
            navigate("/")
            
            
        }
    }).catch(e=>console.log(e))
    }
},[imgurl])

    // upload pic in cloudnary
    const shareImage = () => {
       // console.log(image, caption)
       
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "ishita-insta-clone");
        data.append("cloud_name", "vermapreeti");
        fetch("https://api.cloudinary.com/v1_1/vermapreeti/image/upload", {
            method:"post",
            body:data
        }).then(res=>res.json()).then(data=>
            {     
                setImgurl(data.url)
                
            })
        .catch(e=>console.log(e))
    // console.log(localStorage.getItem("jwt"))
    }
    
    // for review of image file
    const loadfile = (event) => {
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        // console.log(output.src);
        output.onload = function () {
            URL.revokeObjectURL(output.src) // free memory
        }
    }
    return(
        <div className="create-post">
            <div className="post-header">
                <h3 style={{margin:"15px auto"}}>Create New Post</h3>
                <button id="post-btn" onClick={shareImage}><ArrowForwardIcon/></button>
            </div>
            <div className="main">
                {/* <AddPhotoAlternateIcon id="img-icon"/> */}
                <center><img id="output" alt="" src={require('../../img/photo.png')}/></center>
                <input type="file" accept="image/*" onChange={(e)=>{loadfile(e); setImage(e.target.files[0])}} />
                
            </div>
            <div className="details">
                <div className="card-header">
                    <div className="card-pic" style={{display: "flex"}}>
                        <img src={require('../../img/girl.jpg')} alt="" />
                        <span>Ishita</span>
                    </div>
                    
                </div>
                <textarea value={caption} onChange={(e)=>{setCaption(e.target.value)}} type="text" placeholder="write a caption..."></textarea>
            </div>
        </div>
    )
}
export default Createpost;
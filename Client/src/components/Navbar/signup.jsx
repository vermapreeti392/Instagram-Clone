import React from "react";
import logo from '../../img/Instagram_logo.svg.png'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail]= useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(''); 
   // toast functions
    const notifyA = (msg)=>toast.error(msg);
    const notifyB = (msg)=>toast.success(msg);

    // regex validations
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    const postData = async()=>{
        // console.log({name, email, username, password});
        // checking validations
        if(email!==""){
            if(!emailRegex.test(email)){
                notifyA("Invalid Email");
                return
               }  
        } 

        if(password.length<7 && password.length>=14){
            
                notifyA("password must be between 7 to 14 characters/ numbers.")
                return
            
        }         
             
       await fetch("https://insta-backend-bmup.onrender.com/signup",{
            method:"post",
            headers:{
                "Content-Type":"Application/json"
            },
            body: JSON.stringify({
                email:email,
                name:name,
                username:username,
                password:password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                notifyA(data.error)
                
            }
            if(data.message){
                notifyB(data.message)
                navigate('/signin')
            }
            console.log(data)})
        .catch(e=>console.log(e))
        
    }
    return (
       
        <div className="signup">
            <div className="signup-container">
                <div className="signup-form-1">
                    <img src={logo} alt="" />
                    <p className="login-para">
                        SignUp to see more photos and videos <br /> from your friends
                    </p>
                    <div>
                        <input type="email" name="email" id="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} value={email} />
                    </div>
                    <div>
                        <input type="text" name="FullName" id="fname" placeholder="Full Name" onChange={(e)=>{setName(e.target.value)}} value={name}/>
                    </div>
                    <div>
                        <input type="text" name="username" id="username" placeholder="username" onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
                    </div>
                    <div>
                        <input type="password" name="password" id="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                    </div>
                    <p className="signUp-para">
                        By signing up, you agree to our terms, <br /> privacy policy & cookies policy.
                    </p>
                    <button className="btn-0" onClick={postData}>SignUp</button>
                </div>
                
                <div className="signup-form-2">
                    Already have an account ?
                    <Link to="/signIn">
                    <span style={{color : "blue", cursor : "pointer", fontSize: "16px"}}>   {" "} SignIn</span>
                    </Link>
                    
                </div>
                
            </div>
        </div>
    )
}
export default SignUp;
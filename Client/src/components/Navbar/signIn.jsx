import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "../../Context/LoginContext";
import logo from '../../img/Instagram_logo.svg.png'

const SignIn = () => {
    const {setUserLogin} = useContext(LoginContext)
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // toast functions
    const notifyA = (msg)=>toast.error(msg)
    const notifyB = (msg)=>toast.success(msg)

     // regex validations
     const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const fetchData = async()=>{
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
       await fetch('https://insta-backend-bmup.onrender.com/signin',{
            method:"post",
            headers: {
                "Content-Type":"Application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res=>{
           return res.json()
        }).then(data=>{
            if(data.error){
            notifyA(data.error)
            }
            else{

                notifyB("Login successfully")
                // saving token to local storage
                console.log(data.token);
                
                localStorage.setItem("jwt", data.token)
                
                //console.log(data.token);
                setUserLogin(true);
                localStorage.setItem("user", JSON.stringify(data.user))
                navigate("/")
                   
            }
            //console.log(data);

        }).catch(e=>{
            console.log(e);
        })
    }
    return (
        <div className="signin">
            <div className="signin-container">
                <div className="signin-form-1">
                    <img src={logo} alt="" />
                    <div>
                        <input type="email" name="email" id="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                    </div>
                    <div>
                        <input type="password" name="password" id="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                    </div>
                    <button className="btn-1" onClick={fetchData}>SignIn</button>
                </div>
                <div className="signin-form-2">
                    Don't have an account 
                    <span style={{color : "blue", cursor : "pointer", fontSize: "16px"}} onClick={()=>{navigate('/signUp')}}> {"  "}SignUp</span> 
                </div>
            </div>
        </div>
    )
}
export default SignIn;
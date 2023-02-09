import React, { useContext } from "react";
import './navbar.css'
import logo from '../../img/Instagram_logo.svg.png'
import { Link, useNavigate} from "react-router-dom";
import { LoginContext } from "../../Context/LoginContext";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ExploreIcon from '@mui/icons-material/Explore';
import LogoutIcon from '@mui/icons-material/Logout';
import AddBoxIcon from '@mui/icons-material/AddBox';

const Navbar = ({login})=>{
    const navigate = useNavigate()
    const {setModal} = useContext(LoginContext)
    const loginStatus = ()=>{
        const token = localStorage.getItem('jwt')
        //console.log(token);
        if(login || token){
            return [ 
                <>
                 <Link to="/profile" style={{ marginTop: "2px"}}>
                <li>Profile</li>
                </Link>
                <Link to="/createpost" style={{ marginTop: "2px"}}>
                    <li>Createpost</li>
                </Link>
                <Link to="/myfollowingpost" style={{marginLeft: "5px", marginTop: "2px", marginRight: "5px"}}>My Following Post</Link>
                <Link to="">
                    <button className="primaryBtn" onClick={()=>{setModal(true)}}>Logout</button>
                </Link>
                </>
            ]
        }
        else{
            return[
                <>
                <Link to="/signup">
                <li>SignUp</li>
                </Link>                
                <Link to="/signin">
                <li>SignIn</li>
                </Link>  
                </>
            ]
        }
    }
   // loginStatus();
    // mobile view
    const mobileLoginStatus = ()=>{
        
            const token = localStorage.getItem('jwt')
            //console.log(token);
            if(login || token){
                return [ 
                    <>
                    <Link to="/" style={{ marginTop: "2px"}}>
                    <li><HomeIcon style={{fontSize: "larger"}}/></li>
                    </Link>
                     <Link to="/profile" style={{ marginTop: "2px"}}>
                    <li><AccountCircleRoundedIcon style={{fontSize: "larger"}}/></li>
                    </Link>
                    <Link to="/createpost" style={{ marginTop: "2px"}}>
                        <li><AddBoxIcon style={{fontSize: "larger"}}/></li>
                    </Link>
                    <Link to="/myfollowingpost" style={{marginLeft: "5px", marginTop: "2px", marginRight: "5px"}}><li><ExploreIcon style={{fontSize: "larger"}}/></li></Link>
                    <Link to={""}>
                        <li className="primaryBtn" onClick={()=>{setModal(true)}} ><LogoutIcon style={{fontSize: "larger"}}/></li>
                    </Link>
                    </>
                ]
            }
            else{
                return[
                    <>
                    <Link to="/signup">
                    <li>SignUp</li>
                    </Link>                
                    <Link to="/signin">
                    <li>SignIn</li>
                    </Link>  
                    </>
                ]
            }
        
    }
    return(
        <div className="navbar">
            <img id= "insta-logo"
             src={logo} alt="logo" onClick={()=>{navigate('/')}} style= {{cursor: "pointer"}} />
            <ul className="nav-items">                             
               {loginStatus()}
            </ul>
            <ul className="nav-mobile">                             
               {mobileLoginStatus()}
            </ul>
        </div>
    )
}
export default Navbar;
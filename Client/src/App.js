import Navbar from "./components/Navbar/navbar";
import React, {createContext, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignUp from "./components/Navbar/signup";
import SignIn from "./components/Navbar/signIn";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./components/Home/Home";
import Profile from "./components/profile/profile";
import Createpost from "./components/Createpost/Createpost";
import { LoginContext } from "./Context/LoginContext";
import Modal from "./components/Modal/Modal"; 
import Display_Profile from "./components/Display_Profile/Display_Profile";
import MyFollowingPosts from "./components/following post/MyFollowingPosts";
function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modal, setModal] = useState(false)
  return (
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{setUserLogin, setModal}}>
          <Navbar login={userLogin}/>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/createpost" element={<Createpost />}></Route>
            <Route path="/userProfile/:id" element={<Display_Profile />}></Route>
            <Route path="/myfollowingpost" element={<MyFollowingPosts />}></Route>
          </Routes>
          <ToastContainer theme="dark" />
          {/* <Modal/> */}
          {modal && <Modal setModal={setModal}/>}
        </LoginContext.Provider>

      </div>
    </BrowserRouter>
    
  );
}

export default App;

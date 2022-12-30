import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./client/Singup/Signup";
import Signin from "./client/Signin/Signin";
import Sidebar from "./shared/Sidebar";
import NoPage from "./404";
import VideoCall from "./client/VideoCall";
import Chat from "./client/Conversation/Chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { checkLogin } from "stores/slices/userSlice";
import { useCookies } from 'react-cookie';

const WebRoutes = () => {
  const { user } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['User']);

  useEffect(() => {
    console.log(cookies);
    if (cookies.User) {
      dispatch(checkLogin(cookies.User));
    } else {
    }
  }, [])


  return (
    <BrowserRouter>
      <Routes>
        {user ?
          <><Route path="call" element={<VideoCall />} />
            <Route path="chat" element={<Chat />} />
            <Route path="/" element={<Sidebar />} />
          </>
          :
          <>
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
          </>
        }
      </Routes>
    </BrowserRouter>
  );
};
export default WebRoutes;

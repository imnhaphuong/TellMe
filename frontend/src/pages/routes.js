import { Route, Routes } from "react-router-dom";
import Signup from "./client/Singup/Signup";
import Signin from "./client/Signin/Signin";
import Sidebar from "./shared/Sidebar";
import NoPage from "./404";
import VideoCall from "./client/VideoCall";
import { RequireAuth, NotRequireAuth } from "./shared/VerifyAuth";
import { RequireStatus } from "./shared/VerifyCallStatus";
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
    } 
  }, [])


  return (
    <Routes>
      <Route path="/" element={<RequireAuth><Sidebar /></RequireAuth>} />
      <Route path="signin" element={<NotRequireAuth><Signin /></NotRequireAuth>} />
      <Route path="signup" element={<NotRequireAuth><Signup /></NotRequireAuth>} />
      <Route path="call/:status/:channel"
        element={
          <RequireAuth>
            <RequireStatus><VideoCall/></RequireStatus>
          </RequireAuth>
        }
      />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};
export default WebRoutes;

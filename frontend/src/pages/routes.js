import { Route, Routes } from "react-router-dom";
import Signup from "./client/Singup/Signup";
import Signin from "./client/Signin/Signin";
import Sidebar from "./shared/Sidebar";
import NoPage from "./404";
import VideoCall from "./client/VideoCall";
import {RequireAuth, NotRequireAuth} from "./shared/VerifyAuth";

const WebRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RequireAuth><Sidebar/></RequireAuth>} />
      <Route path="signin" element={<NotRequireAuth><Signin/></NotRequireAuth>} />
      <Route path="signup" element={<NotRequireAuth><Signup/></NotRequireAuth>} />
      <Route path="call" element={<RequireAuth><VideoCall/></RequireAuth>} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};
export default WebRoutes;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./client/Singup/Signup";
import Login from "./client/Login/Login";
import Sidebar from "./shared/Sidebar";
import NoPage from "./404";
import VideoCall from "./client/VideoCall/VideoCall";

const WebRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route path="login" element={<Signup />} />
        <Route path="signup" element={<Login />} />
        <Route path="call" element={<VideoCall />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default WebRoutes;

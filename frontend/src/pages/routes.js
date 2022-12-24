import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./client/Singup/Signup";
import Signin from "./client/Signin/Signin";
import Sidebar from "./shared/Sidebar";
import NoPage from "./404";
import VideoCall from "./client/VideoCall";
import { Provider } from "react-redux";
import { storeRoot } from "../stores/index";
import Chat from "./client/Conversation/Chat/Chat";
const WebRoutes = () => {
  return (
    <Provider store={storeRoot}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sidebar />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="call" element={<VideoCall />} />
          <Route path="chat" element={<Chat />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>



  );
};
export default WebRoutes;

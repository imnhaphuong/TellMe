import { BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./Singup/Signup";
import Login from './Login/Login'
import Sidebar from '../shared/Sidebar/sidebar'
import NoPage from "../shared/nopage"; 
import VideoCall from "containers/client/VideoCall/VideoCall";

const Client = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sidebar />}/>
          <Route path="login" element={<Signup />} />
          <Route path="signup" element={<Login />} />
          <Route path="call" element={<VideoCall />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Client;

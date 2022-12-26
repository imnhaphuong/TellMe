import { Route, Routes} from "react-router-dom";
import Signup from "./client/Singup/Signup";
import Signin from "./client/Signin/Signin";
import Sidebar from "./shared/Sidebar";
import NoPage from "./404";
import VideoCall from "./client/VideoCall";
import User from "utils/userContext";

const WebRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={localStorage.getItem("0_op") ? <NoPage /> : <Sidebar />}
      />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="call" element={<VideoCall />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};
export default WebRoutes;

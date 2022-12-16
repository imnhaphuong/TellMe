import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

const host = "http://localhost:4000";

function App() {
  const socketRef = null;

  useEffect(() => {
    socketRef = socketIOClient.connect(host)
  }, [])
  }
// import WebRoutes from "./pages/routes";
// function App() {
//   return <WebRoutes />;
// }
// export default App;
// import { Button } from "@material-ui/core";
// import { useState } from "react";
// import VideoCall from "./pages/client/VideoCall";
// function App() {
//   const [inCall, setInCall] = useState(false);
//   return (
//     <div className="App" style={{ height: "100px" }}>
//       {/* <Router> */}
//       {inCall ? (
//         <VideoCall setInCall={setInCall} />
//       ) : (
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => setInCall(true)}
//         >
//           Join Call
//         </Button>
//       )}
//       {/* </Router> */}
//     </div>
//   );
// }
export default App;

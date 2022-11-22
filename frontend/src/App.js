import { Button } from "@material-ui/core";
import { useState } from "react";
import VideoCall from "./videocall/VideoCall"
const App = () => {
  const [inCall, setInCall] = useState(false);

  // const client = useClient();
  // const { ready, tracks } = useMicrophoneAndCameraTracks();
  return (
    <div style={{height: "100vh"}}>
    <Button variant="contained" color="primary" onClick={()=>setInCall(true)} >Join</Button>
      
      {inCall ?<VideoCall setInCall={setInCall}/> : "Waiting" }
      </div>
    // ready && (
    //   <AgoraVideoPlayer
    //     videoTrack={tracks[1]}
    //     style={{ height: "100%", width: "100%" }}
    //   />
    // )
  );
};
export default App;

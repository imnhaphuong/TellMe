import { AgoraVideoPlayer } from "agora-rtc-react";
import { Grid } from "@material-ui/core";
import { useState, useEffect } from "react";

export default function Video(props) {
  const { users, tracks } = props;
  const [gridSpacing, setGridSpacing] = useState(4);

  useEffect(() => {
    setGridSpacing(Math.max(Math.floor(12 / (users.length)), 4));
  }, [users, tracks]);

  return (
    <div className="relative bg-dark">
      {/* show your video */}
      <div className="absolute top-5 right-5 z-10">
        <div className="absolute bottom-0 px-5 z-10 text-white font-medium" style={{ backgroundColor: "rgba(0,0,0,.5)" }}>
          Bạn</div>
        <AgoraVideoPlayer
          videoTrack={tracks[1]}
          style={{ height: "180px", width: "300px" }}
        />
      </div>
      {/* show others */}
      <Grid container className="relative h-screen w-screen">
        {/* show others */}
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <Grid item xs={gridSpacing} className="relative p-5">
                  <div className="absolute bottom-5 px-5 z-10 text-white font-medium" style={{ backgroundColor: "rgba(0,0,0,.5)" }}>
                    {user.uid}
                  </div>
                  <AgoraVideoPlayer
                    videoTrack={user.videoTrack}
                    key={user.uid}
                    style={{ height: "100%", width: "100%" }}
                  />
                </Grid>
              );
            } else return null;
          })}
      </Grid>
    </div>
  );
}
import { AgoraVideoPlayer } from "agora-rtc-react";
import { Grid } from "@material-ui/core";
import { useState, useEffect } from "react";

export default function Video(props) {
  const { users, tracks } = props;
  const [gridSpacing, setGridSpacing] = useState(12);

  useEffect(() => {
    setGridSpacing(Math.max(Math.floor(12 / users.length), 4));
  }, [users, tracks]);
  return (
    <div class="relative grid h-screen bg-orange ">
      {/* display current user */}
      <div class="absolute grid-rows-4 bg-danger top-5 right-5 z-10">
        <AgoraVideoPlayer
          videoTrack={tracks[1]}
          style={{ height: "200px", width: "300px" }}
        />
      </div>
      <Grid container>
        {/* display others */}
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <Grid item xs={gridSpacing}>
                  <AgoraVideoPlayer
                    videoTrack={user.videoTrack}
                    key={user.uid}
                    style={{ height: "100%", width: "100%" }}
                  />
                </Grid>
              );
            } else {
              return null;
            }
          })}
      </Grid>
    </div>
  );
}

import { useState, useEffect } from "react";
import {
  appId,
  token,
  useClient,
  useMicrophoneAndCameraTracks,
  channelName,
} from "../../../utils/agora";
import {Grid} from "@material-ui/core";
import Video from "./Video";
import Controls from "./Controls";

export default function VideoCall(props) {
  const setInCall = { props };
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    let init = async (name) => {
      //published
      client.on("user-published", async (user, mediaType) => {
        {
          await client.subcribe(user, mediaType);
          if (mediaType === "video") {
            setUsers = (prevUsers) => {
              return [...prevUsers, user];
            };
          }
          if (mediaType === "audio ") {
            user.audioTrack.play();
          }
        }
      });
      //unpublished
      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "video") {
          setUsers = (prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          };
        }
        if (mediaType === "audio ") {
          if (user.audioTrack) user.audioTrack.stop();
        }
      });
      //left
      client.on("user-left", (user) => {
        setUsers = (prevUsers) => {
                   return prevUsers.filter((User) => User.uid !== user.uid);
        };
      });

      try {
        await client.join(appId, name, token, null);
      } catch (error) {
        console.log('err ' + error);
      }
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if(ready && tracks) {
      try {
        init(channelName)
      } catch (error) {
        console.log('err ' + error);
      }
    }
  }, [channelName, client, ready, tracks]);

  return(
    <Grid container direction="column" style={{height: "100%"}} >
      <Grid item style={{ height: "5%"}}>
       {ready && tracks && (<Controls tracks={tracks} setStart={start} setInCall={setInCall} />)} 
        </Grid> 
      <Grid item style={{ height: "95%"}}>
        
       {ready && tracks && (<Video tracks={tracks} users={users}/>)} 
        
        </Grid> 
    </Grid>
  )
}

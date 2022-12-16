import React, { useState, useEffect } from "react";
import {
  appId,
  channelName,
  useClient,
  useMicrophoneAndCameraTracks,
} from "../../../utils/agora";
import Video from "./Video";
import Controls from "./Controls";

export default function VideoCall(props) {
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);

  //config client 
  const client = useClient()
  const channel = channelName
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    let init = async (channelName) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      try {
        await client.join(appId, sessionStorage.getItem('channel'), sessionStorage.getItem('token'), null);
      } catch (error) {
        console.log("error");
      }

      if (tracks){
        await client.publish([tracks[0], tracks[1]]);
        setStart(true);
      } 
    };

    if (ready && tracks) {
      try {
        init(channel);
      } catch (error) {
        console.log(error);
      }
    }
  }, [channel, client, ready, tracks]);

  return (
    <div className="relative h-screen w-screen">
      <div className="fixed bottom-5 right-5 z-10">
        <Controls tracks={tracks} setStart={setStart}/>
      </div>
      <div>
        {start && tracks && <Video tracks={tracks} users={users} />}
      </div>
    </div>
  );
}

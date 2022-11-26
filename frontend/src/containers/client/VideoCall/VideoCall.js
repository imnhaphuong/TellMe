import { useState, useEffect } from "react";
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
  channelName,
} from "../../../config/agora";
import Video from "./Video";
import Controls from "./Controls";

export default function VideoCall(props) {
  const { setInCall } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const channel = channelName;

  useEffect(() => {
    let init = async (name) => {
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
        await client.join(config.appId, name, config.token, null);
      } catch (error) {
        console.log("error");
      }

      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
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
    <div>
      <div style={{ height: "100vh", position: "relative" }}>
        <div class="fixed bottom-0 right-0 z-10">
          <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
        </div>
        {start && tracks && <Video tracks={tracks} users={users} />}
      </div>
    </div>
  );
}

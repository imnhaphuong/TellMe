import { useState } from "react";
import { useClient } from "../../../utils/agora";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import CallEndIcon from "@material-ui/icons/CallEnd";

export default function Controls(props) {
  const client = useClient()
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <button
        className="bg-white rounded-full md:w-12 md:h-12 w-10 h-10 drop-shadow-md hover:bg-dark-gray"
        onClick={() => mute("audio")}
      >
        {trackState.audio ? <MicIcon /> : <MicOffIcon />}
      </button>
      <button
        className="bg-white rounded-full md:w-12 md:h-12 w-10 h-10 drop-shadow-md hover:bg-dark-gray"
        onClick={() => mute("video")}
      >
        {trackState.video ? <VideocamIcon /> : <VideocamOffIcon />}
      </button>
      <button
        className="bg-danger rounded-full md:w-12 md:h-12 w-10 h-10 drop-shadow-md hover:bg-orange"
        onClick={() => leaveChannel()}
      >
        <CallEndIcon />
      </button>
    </div>
  );
}

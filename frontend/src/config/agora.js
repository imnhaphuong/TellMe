import {
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";

export const appId = "26631c618a2a4e1794aa355292ef1514";
export const token =
  "007eJxTYGhdFCnJP0t2ge8Bi/LFO5/cvfDAR9TcrfHacjnzUxrV0ZMVGIzMzIwNk80MLRKNEk1SDc0tTRITjU1NjSyNUtMMTQ1NKpc0JjcEMjJUGOxnZmSAQBCfhSE3MTOPgQEA9hIeCQ==";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";

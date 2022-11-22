import React from "react";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";

export const appId = "26631c618a2a4e1794aa355292ef1514";
export const token =
  "007eJxTYJBfXM35dIvcLEb/9y+LtHZdm82zYudBDf743ZoPow6sKZitwGBkZmZsmGxmaJFolGiSamhuaZKYaGxqamRplJpmaGpoojilOrkhkJHB8csPRkYGCATxWRhyEzPzGBgAM3QfKw==";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";

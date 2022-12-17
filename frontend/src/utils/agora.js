import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import getToken from "../apis/agoraTempToken";

export const appId = "26631c618a2a4e1794aa355292ef1514";
//get channel from params URL
const params = new URLSearchParams(window.location.search);
export const channelName = params.get("channel");
export const token = getToken(channelName);
// export const token = "00626631c618a2a4e1794aa355292ef1514IACpZePu2xTlqPoZWFiRDAyuD6sFPS4CkqcQIdDoP7AihWTNKL8AAAAAIgCVgKkxoxCOYwQAAQAzzYxjAgAzzYxjAwAzzYxjBAAzzYxj";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

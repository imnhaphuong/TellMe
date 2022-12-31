import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

export const appId = "26631c618a2a4e1794aa355292ef1514";
export const config = { mode: "rtc", codec: "vp8", appId: appId, token: sessionStorage.getItem('token') };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

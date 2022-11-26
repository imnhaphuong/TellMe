import {
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";

export const appId = "26631c618a2a4e1794aa355292ef1514";
export const token =
  "007eJxTYPBhEWs8ImG5ntnVdFvGOWOuoiVs/8yjZ9283ZN6OjgogkuBwcjMzNgw2czQItEo0STV0NzSJDHR2NTUyNIoNc3Q1NDkbFZjckMgI4OQaQsTIwMEgvgsDLmJmXkMDAA1LRuA";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";

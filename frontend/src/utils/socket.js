import io from "socket.io-client";
import { ROOT_URL } from "../settings/apiConfig";

export const socket = io(ROOT_URL);
if (localStorage.getItem('0_glb')) {
    socket.emit('userConnected', localStorage.getItem('0_glb'));
}

import io from "socket.io-client";
import { ROOT_URL } from "../settings/apiConfig";

export const socket = io(ROOT_URL);
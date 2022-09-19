import { createContext } from "react";
import io from "socket.io-client";

const socket = io("https://kahoot.up.railway.app/", { transports: ['websocket'] });
const UserContext = createContext(null);
//http://localhost:8000/
//https://kahoot.up.railway.app/
export { socket, UserContext };
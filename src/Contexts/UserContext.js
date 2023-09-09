import { createContext } from "react";
import io from "socket.io-client";

const socket = io("https://quiz-jwgl.onrender.com", { transports: ['websocket'] });
const UserContext = createContext(null);
//http://localhost:8000/
//https://kahoot.up.railway.app/
//https://quiz-jwgl.onrender.com -active
export { socket, UserContext };
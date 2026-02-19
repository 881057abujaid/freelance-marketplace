import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from "./config/db.js";
import chatSocket from "./socket/chatSocket.js";


dotenv.config();
connectDB();

const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "https://freelance-marketplace-three-rho.vercel.app/"
        ],
        methods: ["GET", "POST"],
    },
});

chatSocket(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
import Message from "../models/Message.js";

const chatSocket = (io) => {
    io.on("connection", (socket) => {

        // Join room order based
        socket.on("joinRoom", (room) => {
            socket.join(room);
        });

        // Send message
        socket.on("sendMessage", async (msg) => {
            try {
                console.log("Message received:", msg);

                const saved = await Message.create({
                    orderId: msg.orderId,
                    sender: msg.sender,
                    text: msg.text
                    });

                const populated = await saved.populate("sender", "name avatar");

                io.to(msg.orderId).emit("receiveMessage", populated);


            } catch (err) {
                console.error("Save failed:", err);
            }
        });
    });
};

export default chatSocket;
import Message from "../models/Message.js";

const getMessages = async (req, res) => {
    const messages = await Message.find({
        orderId: req.params.orderId
    }).populate("sender", "name avatar").sort("createdAt");
    res.json(messages);
};
export default getMessages;
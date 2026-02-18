import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        orderId: String,
        sender: String,
        text: String,
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
    },
    { timestamps: true }
);
export default mongoose.model("Message", messageSchema);
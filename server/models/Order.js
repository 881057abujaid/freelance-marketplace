import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        gig: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Gig",
            required: true,
        },

        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        price: Number,
        package: String,

        status: {
            type: String,
            enum: ["pending", "active", "completed", "cancelled"],
            default: "pending",
        },

        paymentStatus: {
            type: String,
            enum: ["unpaid", "paid"],
            default: "unpaid",
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
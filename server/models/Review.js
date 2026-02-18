import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
            unique: true,
        },

        reviewer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        freelancer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },

        comment: String,
    },
    { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
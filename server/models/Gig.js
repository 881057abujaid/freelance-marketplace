import mongoose from "mongoose";

const gigSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,

            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        images: [String],

        category: String,
        deliveryTime: Number,
        sellerLevel: {
            type: String,
            enum: ["new", "level1", "level2", "top"],
            default: "new",
        },
        tags: [String],

        freelancer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Gig = mongoose.model("Gig", gigSchema);

export default Gig;
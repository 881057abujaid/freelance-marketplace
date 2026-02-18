import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["client", "freelancer"],
            default: "client",
        },

        avatar: {
            type: String,
            default: "",
        },

        bio: {
            type: String,
            default: ""
        },

        rating: {
            type: Number,
            default: 0,
        },

        numReviews: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
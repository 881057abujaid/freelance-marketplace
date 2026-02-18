import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadImage = async (req, res, next) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const stream = cloudinary.uploader.upload_stream(
            { folder: process.env.CLOUDINARY_FOLDER || "freelance_marketplace" },
            (error, result) => {
                if (error) return next(error);
                return res.status(200).json({ url: result.secure_url });
            }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
    } catch (err) {
        next(err);
    }
};
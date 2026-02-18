import express from "express";
import upload from "../config/multer.js";
import protect from "../middlewares/authMiddleware.js";
import { createUser, loginUser, registerUser, updateProfile, getUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/me", protect, getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", protect, upload.single("avatar"), updateProfile);

export default router;
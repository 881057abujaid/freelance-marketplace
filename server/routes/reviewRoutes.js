import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { createReview, getFreelancerReviews } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", protect, createReview);
router.get("/:id", getFreelancerReviews);

export default router;
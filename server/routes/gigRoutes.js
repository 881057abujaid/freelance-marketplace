import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import { createGig, deleteGig, getGig, getMyGigs, getAllGigs, updateGig } from "../controllers/gigController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("freelancer"), createGig);
router.get("/my", protect, getMyGigs);
router.get("/", getAllGigs);
router.get("/:id", getGig);

router.put("/:id", protect, authorizeRoles("freelancer"), updateGig);
router.delete("/:id", protect, authorizeRoles("freelancer"), deleteGig);

export default router;
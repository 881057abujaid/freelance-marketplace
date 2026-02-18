import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "API working perfectly" });
});

router.get("/private", protect, (req, res) => {
    res.json({ message: "Private route accessed", user: req.user });
});

router.get("/freelancer-only", protect, authorizeRoles("freelancer"), (req, res) => {
    res.json({ message: "Welcome Freelancer" });
});

router.get("/client-only", protect, authorizeRoles("client"), (req, res) => {
    res.json({ message: "Welcome Client" });
});

export default router;
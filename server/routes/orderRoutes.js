import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import { createCheckoutSession, createOrder, getMyOrders, markOrderPaid, updateOrderStatus, markOrderCompleted, getSellerOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("client"), createOrder);
router.get("/seller", protect, authorizeRoles("freelancer"), getSellerOrders);
router.get("/my", protect, getMyOrders);
router.put("/:id/status", protect, authorizeRoles("freelancer"), updateOrderStatus);
router.post("/:id/checkout", protect, authorizeRoles("client"), createCheckoutSession);
router.put("/:id/pay", protect, authorizeRoles("client"), markOrderPaid);
router.put("/:id/complete", protect, authorizeRoles("freelancer"), markOrderCompleted);

export default router;
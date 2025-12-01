import express from "express";
import {
  addOrder,
  getOrderById,
  updateOrderToPaid,
  getOrders
} from "../controllers/orderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin-protected routes
router
  .route("/")
  .post(protect, admin, addOrder)
  .get(protect, admin, getOrders);

router
  .route("/:id")
  .get(protect, admin, getOrderById);

// Payment update route (no protection?)
router.put("/:id/pay", updateOrderToPaid);

export default router;

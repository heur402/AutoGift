import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getOrder,
  listOrders,
  updateOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = Router();

// GET /api/orders - list orders, optionally filtered by user or status.
router.get("/", listOrders);
// GET /api/orders/:id - fetch one order.
router.get("/:id", getOrder);
// POST /api/orders - create an order.
router.post("/", createOrder);
// PUT /api/orders/:id - update an order.
router.put("/:id", updateOrder);
// PATCH /api/orders/:id/status - update only an order status.
router.patch("/:id/status", updateOrderStatus);
// DELETE /api/orders/:id - remove an order.
router.delete("/:id", deleteOrder);

export default router;

import { Router } from "express";
import {
  createNotification,
  deleteNotification,
  getNotification,
  listNotifications,
  markNotificationRead,
  updateNotification,
} from "../controllers/notificationController.js";

const router = Router();

// GET /api/notifications - list notifications, optionally filtered by user or read state.
router.get("/", listNotifications);
// GET /api/notifications/:id - fetch one notification.
router.get("/:id", getNotification);
// POST /api/notifications - create a notification.
router.post("/", createNotification);
// PUT/PATCH /api/notifications/:id - edit a notification.
router.put("/:id", updateNotification);
router.patch("/:id", updateNotification);
// PATCH /api/notifications/:id/read - mark a notification as read.
router.patch("/:id/read", markNotificationRead);
// DELETE /api/notifications/:id - remove a notification.
router.delete("/:id", deleteNotification);

export default router;

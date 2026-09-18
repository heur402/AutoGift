import { Router } from "express";
import {
  createNotification,
  deleteNotification,
  getNotificationsByUser,
  listNotifications,
  markNotificationRead,
} from "../controllers/notificationController.js";

const router = Router();

// POST /api/notifications - create a notification for a user.
router.post("/", createNotification);
router.get("/", listNotifications);
// GET /api/notifications/:userId - list notifications for a user.
router.get("/:userId", getNotificationsByUser);
// PATCH /api/notifications/:id/read - mark a notification as read.
router.patch("/:id/read", markNotificationRead);
router.delete("/:id", deleteNotification);

export default router;

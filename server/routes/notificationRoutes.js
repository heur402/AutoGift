import { Router } from "express";
import {
  createNotification,
  getNotificationsByUser,
  markNotificationRead,
} from "../controllers/notificationController.js";

const router = Router();

// POST /api/notifications - create a notification for a user.
router.post("/", createNotification);
// GET /api/notifications/:userId - list notifications for a user.
router.get("/:userId", getNotificationsByUser);
// PATCH /api/notifications/:id/read - mark a notification as read.
router.patch("/:id/read", markNotificationRead);

export default router;

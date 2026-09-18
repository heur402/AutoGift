import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  listUsers,
  updateUserStatus,
} from "../controllers/userController.js";

const router = Router();

// GET /api/users - list users with optional search and status filters.
router.get("/", listUsers);
// GET /api/users/:id - fetch one user.
router.get("/:id", getUser);
// POST /api/users - create a user.
router.post("/", createUser);
// PATCH /api/users/:id/status - block or activate a user.
router.patch("/:id/status", updateUserStatus);
// DELETE /api/users/:id - remove a user.
router.delete("/:id", deleteUser);

export default router;

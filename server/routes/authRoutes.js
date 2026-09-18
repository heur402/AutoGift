import { Router } from "express";
import { login, register, registerAdmin, updateAdminProfile } from "../controllers/authController.js";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.post("/admin/register", registerAdmin);
router.patch("/admin/:id", updateAdminProfile);
export default router;

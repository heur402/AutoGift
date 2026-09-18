import { Router } from "express";
import { login, register, registerAdmin } from "../controllers/authController.js";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.post("/admin/register", registerAdmin);
export default router;

import { Router } from "express";
import { createTransaction, listTransactions } from "../controllers/walletController.js";

const router = Router();
router.get("/:userId", listTransactions);
router.post("/:userId", createTransaction);
export default router;

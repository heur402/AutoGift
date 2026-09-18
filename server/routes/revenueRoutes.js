import { Router } from "express";
import { getRevenueSummary } from "../controllers/revenueController.js";

const router = Router();

// GET /api/revenue/summary - return the revenue summary.
router.get("/summary", getRevenueSummary);

export default router;

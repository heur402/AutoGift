import { Router } from "express";
import { getRevenueSummary } from "../controllers/revenueController.js";

const router = Router();

// GET /api/revenue - return an aggregated six-calendar-month revenue summary.
router.get("/", getRevenueSummary);

export default router;

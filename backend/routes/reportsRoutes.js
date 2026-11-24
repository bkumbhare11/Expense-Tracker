import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  monthlyReports,
  monthlyReport,
} from "../controllers/reportsController.js";

const router = express.Router();

router.get("/monthly-reports", authMiddleware, monthlyReports);

router.get("/monthly-report", authMiddleware, monthlyReport);

export default router;

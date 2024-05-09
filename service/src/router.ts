import express from "express";
import { GetQuestionAndOptions, HealthCheck } from "./controller";

const router = express.Router();
router.get("/health-check", HealthCheck);
router.get("/data", GetQuestionAndOptions);

export default router;

import express from "express";
import { processResume,searchResume } from "../controllers/resumeController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/enrich", verifyToken, processResume); 
router.post("/search", verifyToken, searchResume);

export default router;
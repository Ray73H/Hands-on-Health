import { Router } from "express";
import { createWorkoutTemplate } from "../controllers/workoutTemplateController";
import { Request, Response } from "express";
import { authenticate } from "../controllers/authController";

const router = Router();

// Create Workout Template
router.post("/", authenticate, (req: Request, res: Response) => {
	createWorkoutTemplate(req, res);
})


export default router;

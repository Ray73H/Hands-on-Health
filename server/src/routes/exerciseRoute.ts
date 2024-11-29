import { Router } from "express";
import { Request, Response } from "express";
import { getCustomExercises, getExercises, setCustomExercise } from "../controllers/exerciseController";
import { authenticate } from "../controllers/authController";

const router = Router();

// Get default exercises
router.get("/", (req: Request, res: Response) => {
    getExercises(req, res);
});

// Get custom exercises
router.get("/custom", authenticate, (req: Request, res: Response) => {
    getCustomExercises(req, res);
});

// Set custom exercise
router.patch("/custom", authenticate, (req: Request, res: Response) => {
    setCustomExercise(req, res);
});

export default router;

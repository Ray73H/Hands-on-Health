import { Router } from "express";
import { Request, Response } from "express";
import { finishCurrentWorkout, getAllWorkoutPlans, getCurrentWorkoutPlan, saveCurrentWorkoutPlan } from "../controllers/workoutPlanController";
import { authenticate } from "../controllers/authController";
import client from "../config/db";
import { ObjectId } from "mongodb"; // update


const router = Router();

// Get current (most recent) workout plan
router.get("/", authenticate, (req: Request, res: Response) => {
    getCurrentWorkoutPlan(req, res);
});

// Save current (most recent) workout plan
router.patch("/", authenticate, (req: Request, res: Response) => {
    saveCurrentWorkoutPlan(req, res);
})

// Finish the current workout
router.patch("/deactivate", authenticate, (req: Request, res: Response) => {
    finishCurrentWorkout(req, res);
});

// Get all workout plans: history
router.get("/all", authenticate, (req: Request, res: Response) => {
    getAllWorkoutPlans(req, res);
});

// Delete a workout plan by ID
/*
router.delete("/:id", authenticate, async (req: Request, res: Response) => {
    const planId = req.params.id;

    try {
        const deleteResult = await client
            .db("main")
            .collection("plans")
            .deleteOne({ _id: new ObjectId(planId) }); // Fixed line

        if (deleteResult.deletedCount === 1) {
            res.status(200).json({ message: "Workout plan deleted successfully" });
        } else {
            res.status(404).json({ message: "Workout plan not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting workout plan", error });
    }
});
*/

// Get all exercises
router.get("/exercises", authenticate, (req: Request, res: Response) => {
    getAllExercises(req, res);
});

// Add a new exercise
router.post("/exercises", authenticate, (req: Request, res: Response) => {
    addNewExercise(req, res);
});

// Save current workout
router.post("/current-workout/save", authenticate, (req: Request, res: Response) => {
    saveCurrentWorkout(req, res);
});


export default router;

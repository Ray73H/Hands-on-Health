import { Request, Response } from "express";
import client from "../config/db";
import { ObjectId } from "mongodb";

// Get the current (most recent) workout plan
export async function getCurrentWorkoutPlan(req: Request, res: Response) {
    const { userId } = req.body.user as { userId: string };

    try {
        // Check if there is an active workout plan
        const user = await client
            .db("main")
            .collection("users")
            .findOne({ _id: new ObjectId(userId) });
        // Return if no active workout
        if (!user || !user.activeWorkout) {
            return res.status(204).send();
        }

        const currentPlan = await client
            .db("main")
            .collection("plans")
            .findOne({ userId: userId }, { sort: { createdAt: -1 } });

        res.status(200).json(currentPlan);
    } catch (error) {
        res.status(500).json({ message: "Error fetching workout plan", error });
    }
}

// Save the current (most recent) workout plan
export async function saveCurrentWorkoutPlan(req: Request, res: Response) {
    const { userId } = req.body.user as { userId: string };
    const { workoutPlan } = req.body;

    try {
        await client
            .db("main")
            .collection("plans")
            .findOneAndUpdate({ userId: userId }, { $set: { workoutPlan: workoutPlan } }, { sort: { createdAt: -1 } });
        res.status(200).send();
    } catch (error) {
        res.status(500).json({ message: "Error saving workout plan", error });
    }
}

// Function to make active workout to false
export async function finishCurrentWorkout(req: Request, res: Response) {
    const { userId } = req.body.user as { userId: string };

    try {
        await client
            .db("main")
            .collection("users")
            .updateOne({ _id: new ObjectId(userId) }, { $set: { activeWorkout: false } });
        res.status(200).send();
    } catch (error) {
        res.status(500).send();
    }
}

// Get all workout plans by user
export async function getAllWorkoutPlans(req: Request, res: Response) {
    const { userId } = req.body.user as { userId: string };

    try {
        const allPlans = await client
            .db("main")
            .collection("plans")
            .find({ userId: userId })
            .sort({ createdAt: -1 })
            .toArray();
        if (!allPlans) {
            return res.status(204).send();
        }

        res.status(200).json(allPlans);
    } catch (error) {
        res.status(500).json({ message: "Error fetching workout plans", error });
    }
}

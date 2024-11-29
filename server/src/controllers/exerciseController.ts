import { Request, Response } from "express";
import client from "../config/db";
import { ObjectId } from "mongodb";

export async function getExercises(req: Request, res: Response) {
    try {
        const exercises = await client.db("main").collection("exercises").find().toArray();
        exercises.forEach((exercise) => {
            delete (exercise as any)._id;
            delete (exercise as any).priority;
        });

        res.status(200).json(exercises);
    } catch (error) {
        res.status(500).json({ message: "Error getting exercises", error });
    }
}

export async function getCustomExercises(req: Request, res: Response) {
    const { userId } = req.body.user as { userId: string };

    try {
        const user = await client
            .db("main")
            .collection("users")
            .findOne({ _id: new ObjectId(userId) });

        if (!user || !user.customExercises) {
            return res.status(204).send();
        }

        res.status(200).json(user.customExercises);
    } catch (error) {
        res.status(500).json({ message: "Error getting custom exercises", error });
    }
}

export async function setCustomExercise(req: Request, res: Response) {
    const { userId } = req.body.user as { userId: string };
    const { customExercise } = req.body;

    try {
        await client
            .db("main")
            .collection("users")
            .findOneAndUpdate({ _id: new ObjectId(userId) }, { $push: { customExercises: customExercise } });

        res.status(200).send();
    } catch (error) {
        res.status(500).json({ message: "Error setting custom exercise", error });
    }
}

import { Request, Response } from "express";
import client from "../config/db";
import { ObjectId } from "mongodb";

// JSON from frontend
// {
//     planName: "Upper Body Workout"
//     exerciseTypes: ["Chest", "Back"],
//     duration: "30",
//     intensity: "normal"
// }


// Create workout template by getting from database and generating the workout
export async function createWorkoutTemplate(req: Request, res: Response) {
    const { planName, exerciseTypes, duration, intensity } = req.body as {
        planName: string;
        exerciseTypes: string[];
        duration: number;
        intensity: string;
    };
    const { userId } = req.body.user as { userId: string };

    if (!exerciseTypes || !duration || !intensity) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const exercises = await client
            .db("main")
            .collection("exercises")
            .find({ type: { $in: exerciseTypes } })
            .toArray();

        // Generate the workout (Helper Function)
        const workoutPlan = generateWorkout(exercises, exerciseTypes.length, duration, intensity);

        // Put the new plan into the database
        const newDocument = {
            userId: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
            planName: planName,
            exerciseTypes: exerciseTypes,
            duration: duration,
            intensity: intensity,
            workoutPlan: workoutPlan,
        };
        await client.db("main").collection("plans").insertOne(newDocument);

        // Set active workout for user to true
        await client
            .db("main")
            .collection("users")
            .updateOne({ _id: new ObjectId(userId) }, { $set: { activeWorkout: true } });

        res.status(200).json(workoutPlan);
    } catch (error) {
        res.status(500).json({ message: "Error fetching exercises", error });
    }
}

// Helper Function
function generateWorkout(exercises: any[], numberOfTypes: number, duration: number, intensity: string) {
    // Determine the number of sets based on intensity
    let setsPerExercise;
    switch (intensity) {
        case "Low":
            setsPerExercise = 2;
            break;
        case "Normal":
            setsPerExercise = 3;
            break;
        case "High":
            setsPerExercise = 4;
            break;
        case "EXTREME":
            setsPerExercise = 5;
            break;
        default:
            throw new Error("Invalid intensity");
    }

    // Determine the number of total exercises based on duration
    // 10 min = 1 exercise
    let totalExercisesNeeded = Math.round(duration / 10);

    // Determine the number of exercises per type
    let exercisesPerType: number[] = [];
    switch (numberOfTypes) {
        case 1:
            exercisesPerType = [totalExercisesNeeded];
            break;
        case 2:
            exercisesPerType = [Math.ceil(totalExercisesNeeded / 2), Math.floor(totalExercisesNeeded / 2)];
            break;
        case 3:
            exercisesPerType = [
                Math.ceil(totalExercisesNeeded / 3),
                Math.floor(totalExercisesNeeded / 3),
                Math.floor(totalExercisesNeeded / 3),
            ];
            break;
        case 4:
            exercisesPerType =
                totalExercisesNeeded === 6 ? [2, 2, 1, 1] : totalExercisesNeeded === 9 ? [3, 2, 2, 2] : [3, 3, 3, 3];
            break;
        case 5:
            exercisesPerType =
                totalExercisesNeeded === 6
                    ? [2, 1, 1, 1, 1]
                    : totalExercisesNeeded === 9
                    ? [2, 2, 2, 2, 1]
                    : [3, 3, 2, 2, 2];
            break;
        case 6:
            exercisesPerType =
                totalExercisesNeeded === 6
                    ? [1, 1, 1, 1, 1, 1]
                    : totalExercisesNeeded === 9
                    ? [2, 2, 2, 1, 1, 1]
                    : [2, 2, 2, 2, 2, 2];
            break;
        default:
            throw new Error("Invalid number of types");
    }

    const workoutPlan: any[] = [];
    const typeGroups: { [key: string]: any[] } = {};

    // Group exercises by type
    exercises.forEach((exercise) => {
        if (!typeGroups[exercise.type]) {
            typeGroups[exercise.type] = [];
        }
        typeGroups[exercise.type].push(exercise);
    });

    // Generate the Workout Plan by selecting exercises from each type
    exercisesPerType.forEach((countNeeded, index) => {
        const type = Object.keys(typeGroups)[index]; // Get the type
        const exercisesOfType = typeGroups[type]; // Get the exercises of that type

        // Seperate the exercises by priority
        const priority1Exercises = exercisesOfType.filter((exercise) => exercise.priority === 1);
        const priority2Exercises = exercisesOfType.filter((exercise) => exercise.priority === 2);

        // Loop through the count needed and select exercises
        for (let i = 0; i < countNeeded; i++) {
            let selectedExercise;

            if (i < 3) {
                // Choose from priority 1 first
                const randomIndex = Math.floor(Math.random() * priority1Exercises.length);
                selectedExercise = priority1Exercises[randomIndex];
                priority1Exercises.splice(randomIndex, 1); // Remove the selected exercise
            } else {
                // If we need more, choose from priority 2
                const randomIndex = Math.floor(Math.random() * priority2Exercises.length);
                selectedExercise = priority2Exercises[randomIndex];
                priority2Exercises.splice(randomIndex, 1); // Remove the selected exercise
            }

            // For the selected exercise, set the number of sets based on intensity
            if (selectedExercise) {
                selectedExercise.sets = Array.from({ length: setsPerExercise }, () => ({
                    weight: null,
                    reps: null,
                }));
                selectedExercise.notes = "";
                delete selectedExercise.priority; // Remove the priority field
                delete selectedExercise._id;
                workoutPlan.push(selectedExercise);
            }
        }
    });

    return workoutPlan;
}

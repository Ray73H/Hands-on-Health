import { API_BASE_URL } from "../constants/Initial_consts";
import { Exercise, Exercise2 } from "../types/types";

// Function to create workout template in the backend. Method: POST
export async function createWorkoutTemplate(
    token: string | null,
    planName: string,
    exerciseTypes: string[],
    duration: number,
    intensity: string
) {
    try {
        const response = await fetch(`${API_BASE_URL}/workout-template`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                planName,
                exerciseTypes,
                duration,
                intensity,
            }),
        });

        if (response.status === 401) {
            return { logout: true };
        }

        if (!response.ok) {
            throw new Error;
        }

        // Wait for the response to be parsed as JSON
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        console.error("Error in createWorkoutTemplate");
    }
}

// Function to get the current workout plan from the backend. Method: GET
export async function fetchCurrentPlan(token: string | null) {
    try {
        const response = await fetch(`${API_BASE_URL}/workout-plan`, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });

        if (response.status === 401) {
            return { logout: true };
        }

        if (response.status == 204) {
            return { notActive: true };
        }

        if (!response.ok) {
            throw new Error;
        }

        const jsonResponse = await response.json();
        console.log("Data from fetchCurrentPlan", jsonResponse);
        return jsonResponse;
    } catch (error) {
        console.error("Error in fetchCurrentPlan");
    }
}

// Function to save the current workout plan to the backend. Method: PATCH
export async function saveCurrentPlan(token: string | null, workoutPlan: Exercise2[]) {
    try {
        const response = await fetch(`${API_BASE_URL}/workout-plan`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                workoutPlan,
            }),
        });

        if (response.status === 401) {
            return { logout: true };
        }

        if (!response.ok) {
            throw new Error;
        }

        return { logout: false };
    } catch (error) {
        console.error("Error in saveCurrentPlan");
    }
}

//Function to get all workout plans for history. Method: GET
export async function fetchAllPlans(token: string | null) {
    try {
        const response = await fetch(`${API_BASE_URL}/workout-plan/all`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
            return { logout: true };
        }

        if (!response.ok) {
            throw new Error;
        }

        if (response.status == 204) {
            return;
        }

        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        console.error("Error in fetchAllPlans");
    }
}

// Fucntion to delete workout plans from history. Method: 
export async function deletePlan(planId: string, token: string | null) {
    try {
        const response = await fetch(`${API_BASE_URL}/workout-plan/${planId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
            return { logout: true };
        }

        if (!response.ok) {
            throw new Error("Failed to delete the workout plan");
        }

        return { success: true };
    } catch (error) {
        console.error("Error in deletePlan", error);
        return { success: false, error };
    }
}

// Function to finish the current workout. Method: PATCH
export async function finishCurrentWorkout(token: string | null) {
    try {
        const response = await fetch(`${API_BASE_URL}/workout-plan/deactivate`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
            return { logout: true };
        }

        if (!response.ok) {
            throw new Error;
        }

        return { logout: false };
    } catch (error) {
        console.log("Error in finishCurrentWorkout");
    }
}

// Function to get the default exercises. Method: GET
export async function getDefaultExercises() {
    try {
        const response = await fetch(`${API_BASE_URL}/exercise`, { method: "GET" });

        if (!response.ok) {
            throw new Error("Failed to get exercises");
        }

        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        console.log("Error in getDefaultExercises");
    }
}

// Function to get custom exercises. Method: GET
export async function getCustomExercises(token: string | null) {
    try {
        const response = await fetch(`${API_BASE_URL}/exercise/custom`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status == 401) {
            return { logout: true };
        }

        if (!response.ok) {
            throw new Error;
        }

        if (response.status == 204) {
            return;
        }

        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        console.log("Error in getCustomeExercises");
    }
}

// Function to set custome exercise. Method: POST
export async function setCustomExercise(token: string | null, customExercise: Exercise) {
    try {
        const response = await fetch(`${API_BASE_URL}/exercise/custom`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                customExercise,
            }),
        });

        if (response.status == 401) {
            return { logout: true };
        }

        if (!response.ok) {
            throw new Error;
        }

        return { logout: false };
    } catch (error) {
        console.log("Error in setCustomExercise");
    }
}
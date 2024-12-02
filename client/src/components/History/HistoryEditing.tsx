import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../WorkOutPlan/Header";
import "../WorkOutPlan/css/WorkoutTemplateOptions.css";
import "./HistoryEditing.css";
import { useAuth } from "../../contexts/AuthContext";
import { deletePlan, fetchAllPlans } from "../../utils/exercise-utils";
import { Exercise2 } from "../../types/types";

interface WorkoutPlan {
    _id: string;
    planName: string;
    duration: number;
    exerciseTypes: string[];
    intensity: string;
    createdAt: string;
    workoutPlan: Exercise2[]
}

const HistoryEditing: React.FC = () => {
    const navigate = useNavigate();
    const { token, logout } = useAuth();
    const [workoutHistory, setWorkoutHistory] = useState<WorkoutPlan[]>([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        async function getPlans() {
            const workoutPlans = await fetchAllPlans(token);
            if (workoutPlans.logout) {
                logout();
                navigate("/login");
            }

            setWorkoutHistory(workoutPlans);
        }

        if (token) {
            getPlans();
        }
    }, [token]);

    const handleDeleteWorkout = async (planId: string) => {
        // setWorkoutHistory((prev) => prev.filter((plan) => plan._id !== planId));
        const result = await deletePlan(planId, token);
        if (result.logout) {
            logout();
            navigate("/login");
        } else if (result.success) {
            setWorkoutHistory((prev) => prev.filter((plan) => plan._id !== planId));
        } else {
            alert("Failed to delete the workout plan.");
        }
    };

    const handleStartWorkout = async (planId: string) => {
        
    }

    return (
        <div className="duration-page-view">
            <Header />
            <div className="title-and-cancel">
                <h1 className="focus">History</h1>
                <button className="cancel-button" onClick={() => navigate("/home")}>
                    Back
                </button>
            </div>

            <div className="history-container">
                {workoutHistory && workoutHistory.length > 0 ? (
                    workoutHistory.map((plan) => (
                        <div key={plan._id} className="workout-item">
                            <div className="workout-info">
                                <h3 className="workout-title">{plan.planName}</h3>
                                <p className="workout-details">
                                    Duration: {plan.duration} mins | Focus: {plan.exerciseTypes.join(", ")} | Intensity:{" "}
                                    {plan.intensity} | Date: {new Date(plan.createdAt).toLocaleString()}
                                </p>
                            </div>
                            {isEditing && (
                                <button className="delete-button" onClick={() => handleDeleteWorkout(plan._id)}>
                                    Delete
                                </button>
                            )}
                            {!isEditing && (
                                <button className="start-workout-button">
                                    Start Workout
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="subtitle">No workout history found.</p>
                )}
            </div>

            <div className="navigation-buttons">
                {isEditing ? (
                    <button className="next-button" onClick={() => setIsEditing(false)}>
                        Finish Editing
                    </button>
                ) : (
                    <button className="next-button" onClick={() => setIsEditing(true)}>
                        Edit History
                    </button>
                )}
            </div>
        </div>
    );
};

export default HistoryEditing;

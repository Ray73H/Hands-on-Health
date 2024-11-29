import { useState } from "react";
import { createWorkoutTemplate } from "../../utils/exercise-utils";
import { useNavigate } from "react-router-dom";
import { useWorkout } from "../../contexts/WorkoutContext";
import { useAuth } from "../../contexts/AuthContext";
import "./css/review.css";
import Header from "./Header";

function Review() {
    const { duration, focus, intensity } = useWorkout();
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const [planName, setPlanName] = useState("Workout 1");
    const [editPlanName, setEditPlanName] = useState(false);

    async function handleStartWorkout() {
        const data = await createWorkoutTemplate(token, planName, focus, duration, intensity);
        console.log(data);

        if (data.logout) {
            logout();
            navigate("/login");
        }

        navigate("/current-workout");
    }

    // Navigate to the prevous page
    function handlePrevious() {
        navigate("/select-intensity");
    }

    // Cancel the workout template creation
    function handleCancel() {
        navigate("/");
    }

    return (
        <div>
            < Header/>
            <div className="navbar-space"></div> {/* Placeholder space for future navbar */}
            <div className="top-nav-buttons">
                <button className="previous-button" onClick={handlePrevious}>Previous</button>
                <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
            <div className="workout-plan-container">
                <div className="plan-detail-container">
                    <p className="plan-detail">
                        Name:{" "}
                        {editPlanName ? (
                            <input
                                type="text"
                                value={planName}
                                className="plan-name-input"
                                onChange={(e) => setPlanName(e.target.value)}
                            />
                        ) : (
                            <strong>{planName}</strong>
                        )}
                    </p>
                    <p className="plan-detail">Duration: {duration} min</p>
                    <p className="plan-detail">
                        Focus: {focus.length > 1 ? focus.join(", ") : focus[0] || "None"}
                    </p>
                    <p className="plan-detail">Intensity: {intensity}</p>
                </div>
                <div className="edit-buttons">
                    <button onClick={() => setEditPlanName(!editPlanName)}>
                        {editPlanName ? "Save Name" : "Edit Name"}
                    </button>
                    <button onClick={handleStartWorkout}>Start Workout</button>
                </div>
            </div>
        </div>
    );
}

export default Review;

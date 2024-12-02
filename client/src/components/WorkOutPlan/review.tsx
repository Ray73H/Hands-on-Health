import { useEffect, useState } from "react";
import { createWorkoutTemplate } from "../../utils/exercise-utils";
import { useNavigate } from "react-router-dom";
import { useWorkout } from "../../contexts/WorkoutContext";
import { useAuth } from "../../contexts/AuthContext";
import "./css/review.css";
import Header from "./Header";

function Review() {
    const { duration, focus, intensity, cancel } = useWorkout();
    const { token, user, firstName, logout } = useAuth();
    const navigate = useNavigate();
    const [planName, setPlanName] = useState(`${firstName}'s Workout`);
    const [editPlanName, setEditPlanName] = useState(false);

    // Redirect to home page on reload
    useEffect(() => {
        const isReloaded = sessionStorage.getItem("reloadReview");
        if (isReloaded) {
            navigate("/");
        } else {
            sessionStorage.setItem("reloadReview", "true");
        }

        return () => {
            sessionStorage.removeItem("reloadReview");
        };
    }, [navigate]);

    async function handleStartWorkout() {
        const data = await createWorkoutTemplate(token, planName, focus, duration, intensity);

        if (data && data.logout) {
            logout();
            navigate("/login");
        }

        cancel();
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
            <Header />
            <div className="navbar-space"></div> {/* Placeholder space for future navbar */}
            <div className="top-nav-buttons">
                <button className="previous-button" onClick={handlePrevious}>
                    Previous
                </button>
                <button className="cancel-button" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
            <div className="workout-plan-container">
                <div className="plan-detail-container">
                    <p className="plan-detail">
                        Name:
                        <input
                            type="text"
                            value={planName}
                            className="plan-name-input"
                            onChange={(e) => setPlanName(e.target.value)}
                        />
                    </p>
                    <p className="plan-detail">Duration: {duration} min</p>
                    <p className="plan-detail">Focus: {focus.length > 1 ? focus.join(", ") : focus[0] || "None"}</p>
                    <p className="plan-detail">Intensity: {intensity}</p>
                </div>
                <div className="edit-buttons">
                    <button onClick={handleStartWorkout}>Start Workout</button>
                </div>
            </div>
        </div>
    );
}

export default Review;

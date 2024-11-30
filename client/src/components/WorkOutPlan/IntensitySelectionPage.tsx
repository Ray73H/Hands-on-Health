import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkout } from "../../contexts/WorkoutContext";
import Header from "./Header";
import "./css/WorkoutTemplateOptions.css";

const IntensitySelectionPage: React.FC = () => {
    const { intensity, setIntensity, duration, focus, cancel } = useWorkout();
    const navigate = useNavigate();

    const isIntensitySelected = intensity !== "";

    // Redirect to home page on reload
    useEffect(() => {
        const isReloaded = sessionStorage.getItem("reloadIntensity");
        if (isReloaded) {
            navigate("/");
        } else {
            sessionStorage.setItem("reloadIntensity", "true");
        }

        return () => {
            sessionStorage.removeItem("reloadIntensity");
        };
    }, [navigate]);

    function handleCancelButton() {
        cancel();
        navigate("/");
    }

    const selectedDuration = duration ? `${duration} minutes` : "No duration selected";
    const selectedFocus = focus?.length ? focus.join(", ") : "No muscles selected";

    return (
        <div className="intensity-page-view">
            <Header />
            <div className="content-container">
                <div className="title-and-cancel">
                    <h3 className="subtitle">Choose Your Workout Intensity</h3>
                    <button className="cancel-button" onClick={handleCancelButton}>
                        Cancel
                    </button>
                </div>
                <h2 className="intensity">Intensity</h2>
                <p>Selected Duration: {selectedDuration}</p>
                <p>Selected Focus Muscles: {selectedFocus}</p>
                <div className="intensity-group-container">
                    {["Low", "Normal", "High", "EXTREME"].map((inten) => (
                        <button
                            key={inten}
                            className={`intensity-button ${intensity === inten ? "selected" : ""}`}
                            onClick={() => setIntensity(inten)}
                        >
                            {inten}
                        </button>
                    ))}
                </div>
                <div className="navigation-buttons">
                    <button className="prev-button" onClick={() => navigate("/select-focus")}>
                        Prev
                    </button>
                    <button
                        className="next-button"
                        onClick={() => navigate("/review-plan")}
                        disabled={!isIntensitySelected}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IntensitySelectionPage;

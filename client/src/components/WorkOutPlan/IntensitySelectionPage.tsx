import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkout } from "../../contexts/WorkoutContext";
import Header from "./Header";
import "./css/WorkoutTemplateOptions.css";

const IntensitySelectionPage: React.FC = () => {
    const { intensity, setIntensity, cancel } = useWorkout();
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

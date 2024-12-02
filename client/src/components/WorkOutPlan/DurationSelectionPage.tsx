import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkout } from "../../contexts/WorkoutContext";
import Header from "./Header";
import "./css/WorkoutTemplateOptions.css";

const DurationSelectionPage: React.FC = () => {
    const { duration, setDuration, cancel } = useWorkout();
    const navigate = useNavigate();

    // Redirect to home page on reload
    useEffect(() => {
        const isReloaded = sessionStorage.getItem("reloadDuration");
        if (isReloaded) {
            navigate("/");
        } else {
            sessionStorage.setItem("reloadDuration", "true");
        }

        return () => {
            sessionStorage.removeItem("reloadDuration");
        };
    }, [navigate]);

    function handleCancelButton() {
        cancel();
        navigate("/");
    }

    const isDurationSelected = duration !== 0;

    return (
        <div className="duration-page-view">
            <Header />
            <div className="content-container">
                <div className="title-and-cancel">
                    <h3 className="subtitle">Choose Your Workout Duration</h3>
                    <button className="cancel-button" onClick={handleCancelButton}>
                        Cancel
                    </button>
                </div>
                <h2 className="duration">Duration</h2>
                <div className="duration-group-container">
                    {[30, 60, 90, 120].map((value) => (
                        <button
                            key={value}
                            className={`duration-button ${duration === value ? "selected" : ""}`}
                            onClick={() => setDuration(value)}
                        >
                            {value} min
                        </button>
                    ))}
                </div>
                <div className="navigation-buttons">
                    <button
                        className="next-button"
                        onClick={() => navigate("/select-focus")}
                        disabled={!isDurationSelected}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DurationSelectionPage;

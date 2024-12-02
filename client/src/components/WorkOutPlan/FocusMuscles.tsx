import React, { useEffect, useState } from "react";
import { FocusMuscles } from "../../types/types";
import { useNavigate } from "react-router-dom";
import "./css/WorkoutTemplateOptions.css";
import { useWorkout } from "../../contexts/WorkoutContext";
import Header from "./Header";

const initialFocusMuscles: FocusMuscles[] = [
    { id: 1, name: "Chest", selected: false },
    { id: 2, name: "Legs", selected: false },
    { id: 3, name: "Back", selected: false },
    { id: 4, name: "Arms", selected: false },
    { id: 5, name: "Cardio", selected: false },
    { id: 6, name: "Abs", selected: false },
];

const FocusMusclesView: React.FC = () => {
    // Now accepts duration as a prop
    const { duration, setFocus, cancel } = useWorkout();
    const navigate = useNavigate();

    const [muscleGroups, setMuscleGroups] = useState<FocusMuscles[]>(() => {
        const savedMuscles = sessionStorage.getItem("selectedMuscles");
        return savedMuscles ? JSON.parse(savedMuscles) : [...initialFocusMuscles];
    });

    useEffect(() => {
        sessionStorage.setItem("selectedMuscles", JSON.stringify(muscleGroups));
    }, [muscleGroups]);

    useEffect(() => {
        window.addEventListener("beforeunload", () => {
            sessionStorage.removeItem("selectedMuscles");
        });

        return () => {
            window.removeEventListener("beforeunload", () => {
                sessionStorage.removeItem("selectedMuscles");
            });
        };
    }, []);

    // Redirect to home page on reload
    useEffect(() => {
        const isReloaded = sessionStorage.getItem("reloadFocus");
        if (isReloaded) {
            navigate("/");
        } else {
            sessionStorage.setItem("reloadFocus", "true");
        }

        return () => {
            sessionStorage.removeItem("reloadFocus");
        };
    }, [navigate]);

    const toggleMuscleGroup = (id: number) => {
        const updatedMuscleGroups = muscleGroups.map((group) => ({
            ...group,
            selected: group.id === id ? !group.selected : group.selected,
        }));

        setMuscleGroups(updatedMuscleGroups);

        // Update Focus
        const selectedFocuses = updatedMuscleGroups.filter((group) => group.selected).map((group) => group.name);

        setFocus(selectedFocuses);

        if (duration === 30 && selectedFocuses.length > 3) {
            alert("Only 3 muscle groups can be selected for a 30-minute workout.");
            setMuscleGroups(muscleGroups);
            setFocus(muscleGroups.filter((group) => group.selected).map((group) => group.name));
            return;
        }
    };

    function handleCancelButton() {
        cancel();
        navigate("/");
    }

    const isAnyGroupSelected = muscleGroups.some((group) => group.selected);

    return (
        <div className="focus-muscles-view">
            <Header />
            <div className="content-container">
                <div className="title-and-cancel">
                    <h3 className="subtitle">Choose Your Workout Focus</h3>
                    <button className="cancel-button" onClick={handleCancelButton}>
                        Cancel
                    </button>
                </div>
                <h2 className="focus">Focus</h2>
                <p className="description">(Select one or multiple)</p>
                <div className="muscle-group-container">
                    {muscleGroups.map((group) => (
                        <button
                            key={group.id}
                            onClick={() => toggleMuscleGroup(group.id)}
                            className={`muscle-group-button ${group.selected ? "selected" : ""}`}
                        >
                            {group.name}
                        </button>
                    ))}
                </div>
                <div className="navigation-buttons">
                    <button className="prev-button" onClick={() => navigate("/select-duration")}>
                        Prev
                    </button>
                    <button
                        className="next-button"
                        onClick={() => navigate("/select-intensity")}
                        disabled={!isAnyGroupSelected} // Disable the button if no groups are selected
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FocusMusclesView;

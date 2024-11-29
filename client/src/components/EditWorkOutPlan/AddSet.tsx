import React from "react";
import { Exercise2, Set } from "../../types/types";

type AddSetProps = {
    exercise: Exercise2;
    onAddSet: (updatedExercise: Exercise2) => void;
};

const AddSet: React.FC<AddSetProps> = ({ exercise, onAddSet }) => {
    const handleAddSet = () => {
        // Define a new set with default values (customize these as needed)
        const newSet: Set = { weight: null, reps: null }; // Example values
        const updatedExercise = {
            ...exercise,
            sets: [...exercise.sets, newSet],
        };

        // Pass the updated exercise back to the parent component
        onAddSet(updatedExercise);
    };

    return (
        <button onClick={handleAddSet} className="button--control">
            Add Set
        </button>
    );
};

export default AddSet;

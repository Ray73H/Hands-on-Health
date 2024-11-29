import React from "react";
import { Exercise2 } from "../../types/types";

type DeleteSetProps = {
    exercise: Exercise2;
    setIndex: number;
    onUpdateExercise: (updatedExercise: Exercise2) => void;
};

const DeleteSet: React.FC<DeleteSetProps> = ({ exercise, setIndex, onUpdateExercise }) => {
    const handleDeleteSet = () => {
        // Filter out the set at the specified index
        const updatedSets = exercise.sets.filter((_, index) => index !== setIndex);
        const updatedExercise = { ...exercise, sets: updatedSets };

        // Call the update function to update the exercise in the parent component
        onUpdateExercise(updatedExercise);
    };

    return (
        <button onClick={handleDeleteSet} className="button--set-delete">X</button>
    );
};

export default DeleteSet;

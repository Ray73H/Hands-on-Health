import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { defaultAvaliableExercises } from "../../constants/Initial_consts";
import DeleteExercise from "./DeleteExerciseType";
import { Exercise, Exercise2 } from "../../types/types";
import ExerciseModal from "./AddExerciseModal";
import { saveCurrentPlan } from "../../utils/exercise-utils";
import { useAuth } from "../../contexts/AuthContext";

interface ExerciseListProps {
    navigateToCurrentWorkout: () => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({ navigateToCurrentWorkout }) => {
    const {
        AvailableExercises,
        SearchedExercises,
        setSearchedExercises,
        setAvailableExercises,
        noSearchResult,
        currentWorkoutExercises,
        setCurrentWorkoutExercises,
    } = useContext(AppContext);
    const { token } = useAuth();

    const [selectedExercise, setSelectedExercise] = useState<Exercise2 | null>(null);

    const handleExerciseClick = async (exercise: Exercise) => {
        const newExerciseToAdd: Exercise2 = {
            name: exercise.name,
            type: exercise.type,
            sets: [{ weight: null, reps: null }],
            notes: "",
        };

        const newWorkoutExercises = [...currentWorkoutExercises, newExerciseToAdd];
        await saveCurrentPlan(token, newWorkoutExercises);
        setCurrentWorkoutExercises(currentWorkoutExercises);
        navigateToCurrentWorkout();

        // setSelectedExercise(exercise);
    };

    // const handleModalClose = () => {
    //     setSelectedExercise(null);
    // };

    // const handleAddExerciseToCW = async (event: React.FormEvent<HTMLFormElement>) => {
    //     // const setsInput = document.getElementById("setsInput") as HTMLInputElement;
    //     // const repsInput = document.getElementById("repsInput") as HTMLInputElement;

    //     // const numSets = parseInt(setsInput?.value || "0");
    //     // const numReps = parseInt(repsInput?.value || "0");

    //     if (selectedExercise) {
    //         const newExerciseToAdd: Exercise2 = {
    //             name: selectedExercise.name,
    //             type: selectedExercise.type,
    //             sets: [{ weight: null, reps: null }],
    //         };

    //         const newWorkoutExercises = [...currentWorkoutExercises, newExerciseToAdd];
    //         await saveCurrentPlan(token, newWorkoutExercises);
    //         setCurrentWorkoutExercises(currentWorkoutExercises);
    //     }

    //     handleModalClose();
    //     navigateToCurrentWorkout();
    // };

    return (
        <ul className="list-availableExercises">
            {SearchedExercises.map((Exercise) => (
                <div className="exercise-box" key={Exercise.name}>
                    <h2>{Exercise.name}</h2>
                    <div className="add-exercise-button-box">
                        <button className="add-new-exType" onClick={() => handleExerciseClick(Exercise)}>
                            Add
                        </button>
                        {/*for now we don't want users to delete the basic exercise in the list*/}
                        {/*<DeleteExercise Exercise={Exercise} />*/}
                    </div>
                </div>
            ))}
            {/* {selectedExercise && (
                <ExerciseModal exercise={selectedExercise} onClose={handleModalClose} onAdd={handleAddExerciseToCW} />
            )} */}
        </ul>
    );
};

export default ExerciseList;

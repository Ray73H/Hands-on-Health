import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Exercise2 } from "../types/types";
import { EditAddExercise } from "./AddExerciseView";
import { AppContext, AppProvider } from "../contexts/AppContext";
import { CurrentWorkout } from "./CurrentWorkoutView";

function CurrentWorkout_AddExercise_Combined() {
    const [exercises, setExercises] = React.useState<Exercise2[]>();
    //   const [show, setShow] = React.useState<boolean>(false); // Disabled for testing

    const [view, setView] = useState("currentWorkout");
    const { currentWorkoutExercises, setCurrentWorkoutExercises } = useContext(AppContext);

    // Function to add an exercise to the current workout
    const addExerciseToWorkout = (exercise: Exercise2) => {
        // setCurrentWorkoutExercises((prevExercises) => [...prevExercises, exercise]);
    };

    const showAddExerciseView = () => setView("addExercise");
    const showCurrentWorkoutView = () => setView("currentWorkout");

    return (
        <AppProvider>
            <div className="CurrentWorkout_AddExercise_Combined">
                {view === "currentWorkout" ? (
                    <CurrentWorkout onAddExercise={showAddExerciseView} />
                ) : (
                    <EditAddExercise
                        onBack={showCurrentWorkoutView}
                        navigateToCurrentWorkout={showCurrentWorkoutView}
                    />
                )}
            </div>
        </AppProvider>
    );
}

export default CurrentWorkout_AddExercise_Combined;

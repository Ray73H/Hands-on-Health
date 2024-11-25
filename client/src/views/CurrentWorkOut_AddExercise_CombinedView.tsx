import React from "react";
import { useState } from "react";
import { Exercise2 } from "../types/types";
import { defaultExercises } from "../constants/Initial_consts";
import { EditAddExercise } from "./AddExerciseView";
import { AppProvider } from "../contexts/AppContext";
import { CurrentWorkout } from "./CurrentWorkoutView";

function CurrentWorkout_AddExercise_Combined() {
    const [exercises, setExercises] = React.useState<Exercise2[]>(defaultExercises);
    //   const [show, setShow] = React.useState<boolean>(false); // Disabled for testing

    const [view, setView] = useState("currentWorkout");

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

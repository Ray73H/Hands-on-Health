import React from "react";
import "./App.css";
import { fetchWorkoutTemplate } from "./utils/exercise-utils";
import { Exercise, Exercise2 } from "./types/types";
import { defaultExercises } from "./constants/Initial_consts";
import { EditWorkOutPlan } from "./views/EditWorkOutPlan";
import { AppProvider } from "./contexts/AppContext";

// ALL TEMPORARY CODE - CAN BE DELETED
function App() {
  const [exercises, setExercises] =
    React.useState<Exercise2[]>(defaultExercises);
  //   const [show, setShow] = React.useState<boolean>(false); // Disabled for testing

  return (
    <AppProvider>
      <div className="App">
        <EditWorkOutPlan />
        <ul>
          {exercises.map((exercise, index) => {
            return (
              <li key={index}>
                <h2>{exercise.name}</h2>
                <p>Type: {exercise.type}</p>
                <p>Sets:</p>
                <ul>
                  {exercise.sets.map((set, setIndex) => (
                    <li key={setIndex}>
                      Weight: {set.weight} lbs, Reps: {set.reps}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </AppProvider>
  );
}

export default App;

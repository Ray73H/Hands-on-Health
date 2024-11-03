import React from "react";
import "./App.css";
import { fetchWorkoutTemplate } from "./utils/exercise-utils";
import { Exercise } from "./types/types";

// ALL TEMPORARY CODE - CAN BE DELETED
function App() {
    const [exercises, setExercises] = React.useState<Exercise[]>([]);
    const [show, setShow] = React.useState<boolean>(false);

    return (
        <div className="App">
            <button
                onClick={() => {
                    fetchWorkoutTemplate().then((data) => {
                        setExercises(data);
                        setShow(true);
                    });
                }}
            >
                Test
            </button>
            <ul>
                {show
                    ? exercises.map((exercise, index) => {
                          return (
                              <li key={index}>
                                  <h2>{exercise.name}</h2>
                                  <p>Type: {exercise.type}</p>
                                  <p>Sets: {exercise.sets}</p>
                                  <p>Reps: {exercise.reps}</p>
                              </li>
                          );
                      })
                    : null}
            </ul>
        </div>
    );
}

export default App;

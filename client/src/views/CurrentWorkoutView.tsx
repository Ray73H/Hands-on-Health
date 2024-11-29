import { useContext, useEffect, useRef, useState } from "react";
import "./css/CurrentWorkoutView.css";
import { AppContext } from "../contexts/AppContext";
import { Exercise2 } from "../types/types";
import {
    fetchCurrentPlan,
    finishCurrentWorkout,
    getCustomExercises,
    getDefaultExercises,
    saveCurrentPlan,
} from "../utils/exercise-utils";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/WorkOutPlan/Header";
import AddSet from "../components/EditWorkOutPlan/AddSet";
import DeleteSet from "../components/EditWorkOutPlan/DeleteSet";

interface CurrentWorkoutProps {
    onAddExercise: () => void;
}

export const CurrentWorkout: React.FC<CurrentWorkoutProps> = ({ onAddExercise }) => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const {
        currentWorkoutExercises,
        setCurrentWorkoutExercises,
        deleteExerciseFromCurrentWorkout,
        AvailableExercises,
        setAvailableExercises,
        setSearchedExercises,
    } = useContext(AppContext);

    const isFirstRender = useRef(true);
    const currentWorkoutExercisesRef = useRef(currentWorkoutExercises);
    const [isInitialLoad, setIsInitialLoad] = useState(true); // Track if this is the initial load

    // New state container for the current exercise types
    const [currentExerciseTypes, setCurrentExerciseTypes] = useState<string[]>([]);

    console.log(currentWorkoutExercises);

    // Get the default and custom exercises from the backend
    useEffect(() => {
        async function getData() {
            const [defaultExercises, customExercises] = await Promise.all([
                getDefaultExercises(),
                getCustomExercises(token),
            ]);
            if (customExercises) {
                setAvailableExercises([...defaultExercises, ...customExercises]);
                setSearchedExercises([...defaultExercises, ...customExercises]);
            } else {
                setAvailableExercises(defaultExercises);
                setSearchedExercises(defaultExercises);
            }
        }

        if (token) {
            getData();
        }
    }, [token]);

    // Get the default exercises from the backend and filter only those in the current workout types
    // useEffect(() => {
    //     async function getData() {
    //         try {
    //             // Fetch all available exercises from the backend
    //             const data = await getDefaultExercises();

    //             // Use the currentExerciseTypes container to filter exercises
    //             const filteredExercises = data.filter((exercise: Exercise2) =>
    //                 currentExerciseTypes.includes(exercise.type)
    //             );

    //             // Update the state with the filtered exercises, but only if it's the initial load
    //             if (isInitialLoad) {
    //                 setAvailableExercises(filteredExercises.length > 0 ? filteredExercises : data);
    //                 setIsInitialLoad(false); // Set to false to prevent future fetching
    //             }
    //         } catch (error) {
    //             console.error("Error fetching exercises:", error);
    //         }
    //     }

    //     // Fetch available exercises only if we have exercise types
    //     if (currentExerciseTypes.length > 0 && isInitialLoad) {
    //         getData();
    //     }
    // }, [currentExerciseTypes, setAvailableExercises]);

    // Get the current workout plan information from the backend and set the exercise types
    useEffect(() => {
        async function handleDataFetch() {
            try {
                const data = await fetchCurrentPlan(token);

                if (data.logout) {
                    logout();
                    navigate("/login");
                }

                if (data.notActive) {
                    navigate("/home");
                }

                // Set current workout exercises
                setCurrentWorkoutExercises(data.workoutPlan);

                // Extract unique exercise types from the current workout and set them
                const types = Array.from(
                    new Set(data.workoutPlan.map((exercise: Exercise2) => exercise.type))
                ) as string[];
                setCurrentExerciseTypes(types);
            } catch (error) {
                console.error("Error fetching current workout plan:", error);
            }
        }

        if (token) {
            handleDataFetch();
        }
    }, [token, setCurrentWorkoutExercises]);

    // Update the reference so that it can be used on unmount
    useEffect(() => {
        currentWorkoutExercisesRef.current = currentWorkoutExercises;
    }, [currentWorkoutExercises]);

    // Send the current workout plan information to backend when currentWorkoutExercises updates or on unmount
    const handleDataSave = async () => {
        const data = await saveCurrentPlan(token, currentWorkoutExercisesRef.current);
        if (data.logout) {
            logout();
            navigate("/login");
        }
    };

    // Before component unmounts
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            return () => {
                handleDataSave();
            };
        }
    }, []);

    // Before page reloads
    useEffect(() => {
        window.addEventListener("beforeunload", handleDataSave);
        return () => {
            window.removeEventListener("beforeunload", handleDataSave);
        };
    });

    // Update exercise sets
    const handleUpdateExercise = (updatedExercise: Exercise2) => {
        const updatedExercises = currentWorkoutExercises.map((exercise) =>
            exercise.name === updatedExercise.name ? updatedExercise : exercise
        );
        setCurrentWorkoutExercises(updatedExercises);
    };

    // Update the sets values: weight and reps
    const handleSetChange = (exerciseName: string, setIndex: number, field: "weight" | "reps", value: number) => {
        const updatedExercises = currentWorkoutExercises.map((exercise) =>
            exercise.name === exerciseName
                ? {
                      ...exercise,
                      sets: exercise.sets.map((set, index) => (index === setIndex ? { ...set, [field]: value } : set)),
                  }
                : exercise
        );
        setCurrentWorkoutExercises(updatedExercises);
    };

    // Delete an exercise
    const handleDeleteExercise = (index: number) => {
        setCurrentWorkoutExercises(currentWorkoutExercises.filter((exercise, i) => index !== i));
    };

    // Update selected exercises
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const currExercise = event.target.value;
        const updatedExercises = [...currentWorkoutExercises];
        updatedExercises[index] = { ...updatedExercises[index], name: currExercise };
        setCurrentWorkoutExercises(updatedExercises);
    };

    // Finish Workout
    async function handleFinishWorkout() {
        const data = await finishCurrentWorkout(token);
        if (data.logout) {
            logout();
            navigate("/login");
        }
        navigate("/home");
    }

    // Navigation functions
    const navigateHome = () => navigate("/");
    const navigateToDemo = (exerciseName: string) => navigate(`/workout-demo/${exerciseName}`);

    return (
        <div className="page--current-workout">
            <Header />
            <div className="container--navigation-buttons">
                <button className="button--action-home" onClick={navigateHome}>
                    Home
                </button>
                <button className="button--action-finish" onClick={handleFinishWorkout}>
                    Finish Workout
                </button>
            </div>
            <div className="container--header-action">
                <h1 className="text--header-title">Current Workout</h1>
            </div>
            <div className="container--exercise-list">
                {currentWorkoutExercises.map((exercise, index) => (
                    <div key={index} className="card--exercise">
                        <div className="container--exercise-header">
                            <h2 className="text--exercise-name">
                                <select
                                    className="select--dropdown"
                                    value={exercise.name}
                                    onChange={(event) => handleSelectChange(event, index)}
                                >
                                    {AvailableExercises.map((exerciseOption, idx) => (
                                        <option key={idx} value={exerciseOption.name}>
                                            {exerciseOption.name}
                                        </option>
                                    ))}
                                </select>
                            </h2>
                            <div className="container--controls">
                                <AddSet exercise={exercise} onAddSet={handleUpdateExercise} />
                                <button className="button--control" onClick={() => navigateToDemo(exercise.name)}>
                                    Demo
                                </button>
                                <button className="button--control" onClick={() => handleDeleteExercise(index)}>
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div className="container--exercise-content">
                            <div className="container--set-list">
                                {exercise.sets.map((set, setIndex) => (
                                    <div key={setIndex} className="item--set">
                                        <label>Weight:</label>
                                        <input
                                            type="number"
                                            value={set.weight || ""}
                                            className="input--set"
                                            onChange={(e) =>
                                                handleSetChange(
                                                    exercise.name,
                                                    setIndex,
                                                    "weight",
                                                    parseInt(e.target.value)
                                                )
                                            }
                                        />
                                        <label>Reps:</label>
                                        <input
                                            type="number"
                                            value={set.reps || ""}
                                            className="input--set"
                                            onChange={(e) =>
                                                handleSetChange(
                                                    exercise.name,
                                                    setIndex,
                                                    "reps",
                                                    parseInt(e.target.value)
                                                )
                                            }
                                        />
                                        <DeleteSet
                                            exercise={exercise}
                                            setIndex={setIndex}
                                            onUpdateExercise={handleUpdateExercise}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="container--notes">
                                <label>Notes:</label>
                                <textarea
                                    className="input--notes"
                                    placeholder="Add any notes here..."
                                    value={exercise.notes}
                                    onChange={(e) => (exercise.notes = e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="button--add-exercise" onClick={onAddExercise}>
                Add Exercise
            </button>
        </div>
    );
};

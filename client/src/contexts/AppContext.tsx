import { Exercise, Exercise2 } from "../types/types";
import { useState, createContext, ReactNode } from "react";

interface AppContextType {
    AvailableExercises: Exercise[];
    setAvailableExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;

    SearchedExercises: Exercise[];
    setSearchedExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;

    noSearchResult: boolean;
    setNoSearchResult: React.Dispatch<React.SetStateAction<boolean>>;

    currentWorkoutExercises: Exercise2[];
    setCurrentWorkoutExercises: React.Dispatch<React.SetStateAction<Exercise2[]>>; // Added here
    addExerciseToCurrentWorkout: (exercise: Exercise2) => void;
    deleteExerciseFromCurrentWorkout: (exerciseName: String) => void;
}

const initialState: AppContextType = {
    AvailableExercises: [],
    setAvailableExercises: () => {},
    SearchedExercises: [],
    setSearchedExercises: () => {},
    noSearchResult: false,
    setNoSearchResult: () => {},
    currentWorkoutExercises: [],
    setCurrentWorkoutExercises: () => {}, // Added here
    addExerciseToCurrentWorkout: () => {},
    deleteExerciseFromCurrentWorkout: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = (props: AppProviderProps) => {
    const [AvailableExercises, setAvailableExercises] = useState<Exercise[]>(initialState.AvailableExercises);

    const [SearchedExercises, setSearchedExercises] = useState<Exercise[]>(initialState.SearchedExercises);

    const [noSearchResult, setNoSearchResult] = useState<boolean>(initialState.noSearchResult);

    const [currentWorkoutExercises, setCurrentWorkoutExercises] = useState<Exercise2[]>([]);
    const addExerciseToCurrentWorkout = (exercise: Exercise2) => {
        setCurrentWorkoutExercises((prevExercises) => [...prevExercises, exercise]);
    };
    const deleteExerciseFromCurrentWorkout = (exerciseName: String) => {
        setCurrentWorkoutExercises((prevExercises) => prevExercises.filter((ex) => ex.name !== exerciseName));
    };

    return (
        <AppContext.Provider
            value={{
                AvailableExercises,
                setAvailableExercises,
                SearchedExercises,
                setSearchedExercises,
                noSearchResult,
                setNoSearchResult,
                currentWorkoutExercises,
                setCurrentWorkoutExercises, // Provided here
                addExerciseToCurrentWorkout,
                deleteExerciseFromCurrentWorkout,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

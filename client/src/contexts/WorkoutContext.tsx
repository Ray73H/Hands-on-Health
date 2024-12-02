import React, { createContext, useContext, useState, ReactNode } from "react";

type WorkoutContextType = {
    duration: number;
    focus: string[];
    intensity: string;
    setDuration: (value: number) => void;
    setFocus: (value: string[]) => void;
    setIntensity: (value: string) => void;
    cancel: () => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
    const [duration, setDuration] = useState<number>(0);
    const [focus, setFocus] = useState<string[]>([]);
    const [intensity, setIntensity] = useState<string>("");

    function cancel(){
        setDuration(0);
        setFocus([]);
        setIntensity("");
    }

    return (
        <WorkoutContext.Provider value={{ duration, focus, intensity, setDuration, setFocus, setIntensity, cancel }}>
            {children}
        </WorkoutContext.Provider>
    );
};

export const useWorkout = () => {
    const context = useContext(WorkoutContext);
    if (!context) {
        throw new Error("useWorkout must be used within a WorkoutProvider");
    }
    return context;
};

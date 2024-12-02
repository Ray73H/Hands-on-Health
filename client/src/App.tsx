import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { WorkoutProvider } from "./contexts/WorkoutContext";
import HomePage from "./components/HomePage";
import DurationSelectionPage from "./components/WorkOutPlan/DurationSelectionPage";
import IntensitySelectionPage from "./components/WorkOutPlan/IntensitySelectionPage";
import "./App.css";
import { AppProvider } from "./contexts/AppContext";
import Login from "./components//Login/Login";
import Signup from "./components/Login/Signup";
import FocusMusclesView from "./components/WorkOutPlan/FocusMuscles";
import Review from "./components/WorkOutPlan/review";
import CurrentWorkout_AddExercise_Combined from "./views/CurrentWorkOut_AddExercise_CombinedView";
import HistoryPage from "./components/HistoryPage";
import DemoPlayer from "./views/DemoPage";
import HistoryEditing from "./components/History/HistoryEditing";
import { useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";

function App() {
    const { token, setToken } = useAuth();

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <AppProvider>
            <WorkoutProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={token ? <Navigate to="/home" /> : <Navigate to="/login" />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Signup />} />
                        <Route path="/home" element={<HomePage />} />

                        {/* Workout Plan Template */}
                        <Route path="/select-duration" element={<DurationSelectionPage />} />
                        <Route path="/select-focus" element={<FocusMusclesView />} />
                        <Route path="/select-intensity" element={<IntensitySelectionPage />} />
                        <Route path="/review-plan" element={<Review />} />

                        {/* Current Workout */}
                        <Route path="/current-workout" element={<CurrentWorkout_AddExercise_Combined />} />
                        <Route path="/history" element={<HistoryEditing />} />

                        {/* History Editing */}
                        <Route path="/history-editing" element={<HistoryEditing />} />
                        <Route path="/workout-demo/:exerciseName" element={<DemoPlayer />} />
                    </Routes>
                </Router>
            </WorkoutProvider>
        </AppProvider>
    );
}

export default App;

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Review from "../../components/WorkOutPlan/review";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { WorkoutProvider } from "../../contexts/WorkoutContext";
import IntensitySelectionPage from "../../components/WorkOutPlan/IntensitySelectionPage";
import HomePage from "../../components/HomePage";
import { AuthProvider } from "../../contexts/AuthContext";

// Mock the `createWorkoutTemplate` function
jest.mock("../../utils/exercise-utils", () => ({
    createWorkoutTemplate: jest.fn(() => Promise.resolve("Workout Created")),
}));

describe("Review Component", () => {
    beforeEach(() => {
        render(
            <AuthProvider>
                <WorkoutProvider>
                    <MemoryRouter initialEntries={["/review-plan"]}>
                        <Routes>
                            <Route path="/review-plan" element={<Review />} />
                            <Route path="/select-intensity" element={<IntensitySelectionPage />} />
                            <Route path="/" element={<HomePage />} />
                        </Routes>
                    </MemoryRouter>
                </WorkoutProvider>
            </AuthProvider>
        );
    });

    test("renders workout plan details", () => {
        expect(screen.getByText(/Name:/)).toBeInTheDocument();
        expect(screen.getByText(/Duration:/)).toBeInTheDocument();
        expect(screen.getByText(/Focus:/)).toBeInTheDocument();
        expect(screen.getByText(/Intensity:/)).toBeInTheDocument();
    });

    test("toggles edit mode for plan name", () => {
        const editButton = screen.getByText("Edit Name");
        fireEvent.click(editButton);

        // Check if input field is now visible
        expect(screen.getByRole("textbox")).toBeInTheDocument();

        // Change input value and save
        fireEvent.change(screen.getByRole("textbox"), { target: { value: "New Plan" } });
        fireEvent.click(screen.getByText("Save Name"));

        // Check if the new plan name is displayed correctly
        expect(screen.getByText("New Plan")).toBeInTheDocument();
    });

    test("Previous button click functionality", () => {
        const previousButton = screen.getByText("Previous");
        waitFor(() => {
            fireEvent.click(previousButton);
        });

        expect(screen.getByText("Intensity")).toBeInTheDocument();
    });

    test("Cancel button click functionality", () => {
        const cancelButton = screen.getByText("Cancel");
        fireEvent.click(cancelButton);

        expect(screen.getByText(/Welcome/)).toBeInTheDocument();
    });
});

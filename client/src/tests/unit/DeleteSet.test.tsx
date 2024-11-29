import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeleteSet from "../../components/EditWorkOutPlan/DeleteSet";
import { Exercise2, Set } from "../../types/types";

// Mock data for the test
const mockExercise: Exercise2 = {
    name: "Push Ups",
    type: "Strength",
    sets: [
        { reps: 10, weight: 0 },
        { reps: 12, weight: 0 },
    ],
    notes: "",
};

describe("DeleteSet Component", () => {
    test("removes the specified set when 'x' button is clicked", () => {
        // Mock onUpdateExercise function
        const mockOnUpdateExercise = jest.fn();

        // Render DeleteSet for the first set (index 0)
        render(<DeleteSet exercise={mockExercise} setIndex={0} onUpdateExercise={mockOnUpdateExercise} />);

        // Find and click the "x" button
        const deleteButton = screen.getByText("X");
        fireEvent.click(deleteButton);

        // Check if onUpdateExercise was called once
        expect(mockOnUpdateExercise).toHaveBeenCalledTimes(1);

        // Retrieve the updated exercise passed to onUpdateExercise
        const updatedExercise: Exercise2 = mockOnUpdateExercise.mock.calls[0][0];

        // Check that the updated exercise has one less set
        expect(updatedExercise.sets.length).toBe(mockExercise.sets.length - 1);

        // Ensure that the remaining set is the second one (index 1 of the original sets)
        expect(updatedExercise.sets[0]).toEqual(mockExercise.sets[1]);
    });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddSet from "../../components/EditWorkOutPlan/AddSet";
import { Exercise2, Set } from "../../types/types";

// Mock data for the test
const mockExercise: Exercise2 = {
    name: "Push Ups",
    type: "Strength",
    sets: [{ reps: null, weight: null }],
    notes: "",
};

describe("AddSet Component", () => {
    it("calls onAddSet with the updated exercise when 'Add Set' button is clicked", () => {
        // Mock onAddSet function
        const mockOnAddSet = jest.fn();

        // Render AddSet with mock exercise and mock onAddSet function
        render(<AddSet exercise={mockExercise} onAddSet={mockOnAddSet} />);

        // Find the "Add Set" button
        const addSetButton = screen.getByText("Add Set");

        // Click the "Add Set" button
        fireEvent.click(addSetButton);

        // Check if onAddSet was called with the updated exercise
        expect(mockOnAddSet).toHaveBeenCalledTimes(1);

        // Retrieve the updated exercise passed to onAddSet
        const updatedExercise: Exercise2 = mockOnAddSet.mock.calls[0][0];

        // Check that the updated exercise has one additional set
        expect(updatedExercise.sets.length).toBe(mockExercise.sets.length + 1);

        // Optionally, you can also check the details of the new set added
        const newSet: Set = updatedExercise.sets[updatedExercise.sets.length - 1];
        expect(newSet.reps).toBe(null); // Assuming default reps for new set
        expect(newSet.weight).toBe(null); // Assuming default weight for new set
    });
});

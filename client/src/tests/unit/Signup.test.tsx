import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { register } from "../../utils/auth-utils";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "../../components/Login/Signup";

// Mock signup function
jest.mock("../../utils/auth-utils", () => ({
    login: jest.fn(),
    register: jest.fn(() => Promise.resolve({ result: true, token: "mockToken" })),
}));

// Mock navigate and Location
jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
    useLocation: () => ({ pathname: '/register' })
}));

// Mock auth context
jest.mock("../../contexts/AuthContext", () => ({
    useAuth: jest.fn(),
}));

describe("Signup Component", () => {
    const mockSetToken = jest.fn();
    const mockSetUser = jest.fn();
    const mockNavigate = jest.fn();
    const mockSetFirstName = jest.fn();

    beforeEach(() => {
        mockSetToken.mockReset();
        mockSetUser.mockReset();
        mockSetFirstName.mockReset();
        mockNavigate.mockReset();
        (useAuth as jest.Mock).mockReturnValue({
            setToken: mockSetToken,
            setUser: mockSetUser,
            setFirstName: mockSetFirstName,
        });
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        render(<Signup />);
    });

    test("Should correctly show page when rendered", () => {
        expect(screen.getByText(/sign up/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();
        expect(screen.getByText(/login to account/i)).toBeInTheDocument();
        expect(screen.getByText(/create account/i)).toBeInTheDocument();
    });

    test("Should show the correct error message when email is already registered", async () => {
        (register as jest.Mock).mockResolvedValueOnce({ result: false, message: "Email is already registered" });

        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "testUser" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "testPass" } });
        fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "testPass" } });
        fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: "test" } });
        fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: "user" } });
        fireEvent.click(screen.getByText(/create account/i));

        await waitFor(() => expect(screen.getByText("Email is already registered")).toBeInTheDocument());
    });

    test("Should show the correct error message when missing fields", async () => {
        fireEvent.click(screen.getByText(/create account/i));

        await waitFor(() => expect(screen.getByText("Please fill all fields")));
    });

    test("Should throw error when server fails to register", async () => {
        (register as jest.Mock).mockRejectedValueOnce(new Error("Server error"));

        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "testUser" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "testPass" } });
        fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "testPass" } });
        fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: "test" } });
        fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: "user" } });
        fireEvent.click(screen.getByText(/create account/i));

        await waitFor(() => expect(screen.getByText("Signup failed. Please try again.")).toBeInTheDocument());
    });

    test("Should successfully register and navigate to home page when button clicked", async () => {
        (register as jest.Mock).mockResolvedValueOnce({ result: true, token: "mockToken" });

        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "testUser" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "testPass" } });
        fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "testPass" } });
        fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: "test" } });
        fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: "user" } });
        fireEvent.click(screen.getByText(/create account/i));

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/home"));
        expect(mockSetToken).toHaveBeenCalledWith("mockToken");
        expect(mockSetUser).toHaveBeenCalledWith("testUser");
    });

    test("Should navigate to login page when button is clicked", async () => {
        fireEvent.click(screen.getByText(/login to account/i));

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/login"));
    });
});

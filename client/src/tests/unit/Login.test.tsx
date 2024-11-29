import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../../components/Login/Login";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/auth-utils";

// Mock login function
jest.mock("../../utils/auth-utils", () => ({
    login: jest.fn(),
}));

// Mock navigate
jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

// Mock auth context
jest.mock("../../contexts/AuthContext", () => ({
    useAuth: jest.fn(),
}));

describe("Login Component", () => {
    const mockSetToken = jest.fn();
    const mockSetIsGuest = jest.fn();
    const mockSetUser = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(() => {
        mockSetToken.mockReset();
        mockSetIsGuest.mockReset();
        mockSetUser.mockReset();
        mockNavigate.mockReset();
        (useAuth as jest.Mock).mockReturnValue({
            setToken: mockSetToken,
            setIsGuest: mockSetIsGuest,
            setUser: mockSetUser,
        });
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        render(<Login />);
    });

    test("Should correctly show page when rendered", () => {
        expect(screen.getByTestId("loginHeader")).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByText(/register for account/i)).toBeInTheDocument();
        expect(screen.getByTestId("loginButton")).toBeInTheDocument();
        expect(screen.getByText(/continue as guest/i)).toBeInTheDocument();
    });

    test("Should show the correct error message when user is not found", async () => {
        (login as jest.Mock).mockResolvedValueOnce({ result: false, message: "User not found" });

        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "testUser" } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: "testPass" } });
        fireEvent.click(screen.getByTestId("loginButton"));

        await waitFor(() => expect(screen.getByText("User not found")).toBeInTheDocument());
    });

    test("Should show the correct error message when password is incorrect", async () => {
        (login as jest.Mock).mockResolvedValueOnce({ result: false, message: "Incorrect Password" });

        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "testUser" } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: "testPass" } });
        fireEvent.click(screen.getByTestId("loginButton"));

        await waitFor(() => expect(screen.getByText("Incorrect Password")).toBeInTheDocument());
    });

    test("Should show the correct error message when missing fields", async () => {
        fireEvent.click(screen.getByTestId("loginButton"));

        await waitFor(() => expect(screen.getByText("Please fill all fields")).toBeInTheDocument());
    });

    test("Should throw error when server fails to login", async () => {
        (login as jest.Mock).mockRejectedValueOnce(new Error("Server error"));

        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "testUser" } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: "testPass" } });
        fireEvent.click(screen.getByTestId("loginButton"));

        await waitFor(() => expect(screen.getByText("Login failed. Please try again.")).toBeInTheDocument());
    });

    test("Should successfully login and navigate to home page when button clicked and authenticated", async () => {
        (login as jest.Mock).mockResolvedValueOnce({ result: true, token: "mockToken" });

        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "testUser" } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: "testPass" } });
        fireEvent.click(screen.getByTestId("loginButton"));

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/home"));
        expect(mockSetToken).toHaveBeenCalledWith("mockToken");
        expect(mockSetUser).toHaveBeenCalledWith("testUser");
    });

    test("Should navigate to signup page when button is clicked", async () => {
        fireEvent.click(screen.getByText(/register for account/i));

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/register"));
    });
});

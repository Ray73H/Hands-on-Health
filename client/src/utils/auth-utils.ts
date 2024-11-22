import { API_BASE_URL } from "../constants/Initial_consts";

// Register account function. Method: POST
export async function register(email: String, password: String, firstName: String, lastName: String) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, firstName, lastName }),
        });

        const jsonResponse = await response.json();

        if (!response.ok) {
            return { result: false, message: jsonResponse.message };
        }
        console.log("Signup successful:", jsonResponse);
        return { result: true, token: jsonResponse.token };
    } catch (error) {
        console.error("Error in register", error);
        throw error;
    }
}

// Login function. Method: POST
export async function login(email: String, password: String) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const jsonResponse = await response.json();

        if (!response.ok) {
            return { result: false, message: jsonResponse.message };
        }
        console.log("Login successful:", jsonResponse);
        return { result: true, token: jsonResponse.token };
    } catch (error) {
        console.error("Error in login", error);
        throw error;
    }
}

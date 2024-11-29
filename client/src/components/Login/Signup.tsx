import React, { useState } from "react";
import { register } from "../../utils/auth-utils";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../WorkOutPlan/Header";
import "./css/Signup.css";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const { setToken, setUser } = useAuth();
    const navigate = useNavigate();

    async function handleSignup(event: any) {
        event.preventDefault();

        if (!email || !password || !firstName || !lastName) {
            setError("Please fill all fields");
        }

        try {
            const data = await register(email, password, firstName, lastName);

            if (data.result) {
                setUser(email);
                setToken(data.token);
                localStorage.setItem("authToken", data.token);
                navigate("/home");
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("Signup failed. Please try again.");
        }
    }

    return (
        <div className="register">
            <Header />
            <h1>Sign Up</h1>
            <div className="back-to-login-button">
                <button onClick={() => navigate("/login")}>Back to Login</button>
            </div>
            <form onSubmit={handleSignup}>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="form-group">
                    <h2>Email:</h2>
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <h2>Password:</h2>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <h2>First Name:</h2>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <h2>Last Name:</h2>
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="submit">
                    <button type="submit">Create Account</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;

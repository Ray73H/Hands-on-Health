import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/auth-utils";
import Header from "../WorkOutPlan/Header";
import "./css/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setToken, setIsGuest, setUser } = useAuth();
    const navigate = useNavigate();

    async function handleLogin(event: any) {
        event.preventDefault();

        if (!email || !password) {
            setError("Please fill all fields");
            return;
        }

        try {
            const data = await login(email, password);

            if (data.result) {
                setToken(data.token);
                setUser(email);
                localStorage.setItem("authToken", data.token); // Save the token in localStorage
                setIsGuest(false);
                navigate("/home");
            } else {
                setError(data.message || "Invalid login credentials");
            }
        } catch (error) {
            setError("Login failed. Please try again.");
        }
    }

    function handleGuestLogin() {
        setIsGuest(true);
        setToken(null);
        navigate("/home");
    }

    return (
        <div className="login">
            <Header />
            <h1 data-testid="loginHeader">Login</h1>
            <form onSubmit={handleLogin}>
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
                    <p onClick={() => navigate("/register")} className="register-button">
                        Register for account
                    </p>
                </div>
                <div className="form-group submit">
                    <button type="submit" data-testid="loginButton">
                        Login
                    </button>
                </div>
                <div className="form-group guest">
                    <p onClick={handleGuestLogin} className="guest-login">
                        Continue as guest
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;

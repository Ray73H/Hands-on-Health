import React, { useState } from "react";
import { register } from "../../utils/auth-utils";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../WorkOutPlan/Header";
import "./css/Signup.css";
import showImg from "../../logos/eye.png";
import hideImg from "../../logos/hidden.png";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { setToken, setUser, setFirstName: setContextFirstName } = useAuth();
    const navigate = useNavigate();

    async function handleSignup(event: any) {
        event.preventDefault();

        if (!email || !password || !confirmPassword || !firstName || !lastName) {
            setError("Please fill all fields");
            return;
        }

        if (password != confirmPassword) {
            setError("Password doesn't match");
            return;
        }

        try {
            const data = await register(email, password, firstName, lastName);

            if (!data){
                setError("Signup failed. Please try again.");
            }
            else if (data.result) {
                setUser(email);
                setToken(data.token);
                setContextFirstName(firstName);
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("firstName", firstName);
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
            <form onSubmit={handleSignup}>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="names-group">
                    <div className="names first-name">
                        <h2>First Name:</h2>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="names last-name">
                        <h2>Last Name:</h2>
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <h2>Email:</h2>
                    <input
                        type="text"
                        placeholder="Email"
                        className="email-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <h2>Password:</h2>
                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="password-input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="icon" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <img src={hideImg} alt="hide" /> : <img src={showImg} alt="show" />}
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <h2>Confirm Password:</h2>
                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="password-input"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <span className="icon" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <img src={hideImg} alt="hide" /> : <img src={showImg} alt="show" />}
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <p onClick={() => navigate("/login")} className="login-button">
                        Login to account
                    </p>
                </div>
                <div className="form-group submit">
                    <button type="submit">Create Account</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;

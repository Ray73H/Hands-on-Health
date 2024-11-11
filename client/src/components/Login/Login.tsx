import React, { useState } from "react";

const Login = ({
	onLoginSuccess,
}: {
	onLoginSuccess: (token: string) => void;
}) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch(
				"http://localhost:8080/api/auth/login",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username, password }),
				},
			);

			if (response.ok) {
				const data = await response.json();
				onLoginSuccess(data.token); // Pass the token to App component or save it
			} else {
				const errorData = await response.json();
				setError(errorData.message || "Login failed");
			}
		} catch (err) {
			setError("Error occurred during login");
		}
	};

	return (
		<form onSubmit={handleLogin}>
			<h2>Login</h2>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<input
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button type="submit">Login</button>
		</form>
	);
};

export default Login;
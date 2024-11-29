import React from "react";
import { useNavigate } from "react-router-dom";

const HistoryPage: React.FC = () => {
	const navigate = useNavigate();

	function handleBackToHome() {
		navigate("/");
	}

	return (
		<div>
			<h1>Workout History</h1>
			<p>Your past workouts will be displayed here.</p>
			<button onClick={handleBackToHome}>Back to Home</button>
		</div>
	);
};

export default HistoryPage;
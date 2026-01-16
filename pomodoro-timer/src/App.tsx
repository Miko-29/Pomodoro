import { useState, useEffect } from "react";
import "./index.css";

export default function App() {
	// --- 1. STATE VARIABLES (The app's "Memory") ---

	// 'work' = 25 mins, 'break' = 5 mins
	const [mode, setMode] = useState("work");

	// Timer is in seconds. 25 mins * 60 = 1500 seconds
	const [timeLeft, setTimeLeft] = useState(25 * 60);

	// Is the timer currently ticking?
	const [isRunning, setIsRunning] = useState(false);

	// --- 2. THE TIMER LOGIC ---
	useEffect(() => {
		let interval: ReturnType<typeof setInterval> | undefined;

		if (isRunning && timeLeft > 0) {
			// If running, subtract 1 second every 1000 milliseconds
			interval = setInterval(() => {
				setTimeLeft((prevTime) => prevTime - 1);
			}, 1000);
		} else if (timeLeft === 0) {
			// If time hits 0, stop the timer and play an alert
			setIsRunning(false);
			alert("Time is up! Take a break or get back to work.");
		}

		// Cleanup function (stops weird glitches when timer stops)
		return () => clearInterval(interval);
	}, [isRunning, timeLeft]); // Run this logic whenever isRunning or timeLeft changes

	// --- 3. HELPER FUNCTIONS ---

	// Convert seconds (e.g., 90) into MM:SS format (01:30)
	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		// Add a '0' in front if the number is less than 10
		return `${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
	};

	// Switch to Work Mode (25 mins)
	const handleWorkMode = () => {
		setMode("work");
		setIsRunning(false);
		setTimeLeft(25 * 60);
	};

	// Switch to Break Mode (5 mins)
	const handleBreakMode = () => {
		setMode("break");
		setIsRunning(false);
		setTimeLeft(5 * 60);
	};

	// Reset the timer based on current mode
	const handleReset = () => {
		setIsRunning(false);
		if (mode === "work") {
			setTimeLeft(25 * 60);
		} else {
			setTimeLeft(5 * 60);
		}
	};

	// --- 4. THE VISUALS (HTML) ---
	return (
		<div className="app-container">
			<div className="timer-box">
				<h1>{mode === "work" ? "Work Time" : "Break Time"}</h1>

				<div className="timer-display">{formatTime(timeLeft)}</div>

				<div className="buttons-row">
					<button onClick={() => setIsRunning(!isRunning)} className={isRunning ? "stop-btn" : "start-btn"}>
						{isRunning ? "Pause" : "Start"}
					</button>

					<button onClick={handleReset} className="reset-btn">
						Reset
					</button>
				</div>

				<div className="mode-buttons">
					<button onClick={handleWorkMode} className={mode === "work" ? "active-mode" : ""}>
						Work (25m)
					</button>
					<button onClick={handleBreakMode} className={mode === "break" ? "active-mode" : ""}>
						Break (5m)
					</button>
				</div>
			</div>
		</div>
	);
}

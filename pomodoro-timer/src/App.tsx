import { useState, useEffect } from "react";
import "./index.css";

export default function App() {
	// --- 1. STATE WITH TYPES ---

	// We specify that mode can ONLY be 'work' or 'break'
	const [mode, setMode] = useState<"work" | "break">("work");

	// Time is a number
	const [timeLeft, setTimeLeft] = useState<number>(25 * 60);

	// isRunning is a boolean (true/false)
	const [isRunning, setIsRunning] = useState<boolean>(false);

	// --- 2. TIMER LOGIC ---
	useEffect(() => {
		// We define the type for the interval ID
		let interval: ReturnType<typeof setInterval>;

		if (isRunning && timeLeft > 0) {
			interval = setInterval(() => {
				setTimeLeft((prevTime) => prevTime - 1);
			}, 1000);
		} else if (timeLeft === 0) {
			setIsRunning(false);
			alert("Time is up!");
		}

		// Cleanup function
		return () => clearInterval(interval);
	}, [isRunning, timeLeft]);

	// --- 3. HELPER FUNCTIONS ---

	// 'seconds' must be a number
	const formatTime = (seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
	};

	const handleWorkMode = () => {
		setMode("work");
		setIsRunning(false);
		setTimeLeft(25 * 60);
	};

	const handleBreakMode = () => {
		setMode("break");
		setIsRunning(false);
		setTimeLeft(5 * 60);
	};

	const handleReset = () => {
		setIsRunning(false);
		if (mode === "work") {
			setTimeLeft(25 * 60);
		} else {
			setTimeLeft(5 * 60);
		}
	};

	// --- 4. THE VISUALS ---
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

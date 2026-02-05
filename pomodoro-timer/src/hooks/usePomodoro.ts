import { useState, useEffect, useCallback } from "react";

export type Mode = "focus" | "shortBreak" | "longBreak";

interface PomodoroSettings {
    focusTime: number; // in minutes
    shortBreakTime: number; // in minutes
    longBreakTime: number; // in minutes
    longBreakInterval: number; // number of focus sessions before long break
}

export const usePomodoro = () => {
    const [mode, setMode] = useState<Mode>("focus");
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [sessionsCompleted, setSessionsCompleted] = useState(0);

    const [settings, setSettings] = useState<PomodoroSettings>({
        focusTime: 25,
        shortBreakTime: 5,
        longBreakTime: 15,
        longBreakInterval: 4,
    });

    const getTotalTime = useCallback(() => {
        switch (mode) {
            case "focus": return settings.focusTime * 60;
            case "shortBreak": return settings.shortBreakTime * 60;
            case "longBreak": return settings.longBreakTime * 60;
        }
    }, [mode, settings]);

    const switchMode = useCallback((newMode: Mode) => {
        setMode(newMode);
        setIsRunning(false);
        // Set time based on new mode
        let newTime;
        switch (newMode) {
            case "focus": newTime = settings.focusTime * 60; break;
            case "shortBreak": newTime = settings.shortBreakTime * 60; break;
            case "longBreak": newTime = settings.longBreakTime * 60; break;
        }
        setTimeLeft(newTime);
    }, [settings]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            // Handle Auto-Transitions
            if (mode === "focus") {
                const newCompleted = sessionsCompleted + 1;
                setSessionsCompleted(newCompleted);
                if (newCompleted % settings.longBreakInterval === 0) {
                    switchMode("longBreak");
                } else {
                    switchMode("shortBreak");
                }
            } else {
                // Break is over, back to focus
                switchMode("focus");
            }
        }

        return () => clearInterval(interval);
    }, [isRunning, timeLeft, mode, sessionsCompleted, settings, switchMode]);

    // If settings change, we might need to update current timer IF it wasn't running? 
    // For simplicity, we only update if we reset or switch modes manually.
    // Ideally, if user changes "Focus Time" while in Focus mode and paused, we update it?
    // Let's keep it simple: Settings update effective on next reset or mode switch.

    const toggleTimer = () => setIsRunning(!isRunning);

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(getTotalTime());
    };

    const updateSettings = (newSettings: Partial<PomodoroSettings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    return {
        mode,
        timeLeft,
        isRunning,
        sessionsCompleted,
        settings,
        toggleTimer,
        resetTimer,
        switchMode,
        updateSettings,
        getTotalTime,
    };
};

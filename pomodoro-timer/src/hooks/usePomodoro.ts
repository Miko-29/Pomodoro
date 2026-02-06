import { useState, useEffect, useCallback } from "react";

export type Mode = "focus" | "shortBreak" | "longBreak";

interface PomodoroSettings {
    focusTime: number; // in minutes
    shortBreakTime: number; // in minutes
    longBreakTime: number; // in minutes
    longBreakInterval: number; // number of focus sessions before long break
}

const DEFAULT_SETTINGS: PomodoroSettings = {
    focusTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    longBreakInterval: 4,
};

// Load settings from localStorage
const loadSettings = (): PomodoroSettings => {
    try {
        const stored = localStorage.getItem('pomodoroSettings');
        if (stored) {
            const parsed = JSON.parse(stored);
            // Validate that all required fields exist and are numbers
            if (parsed.focusTime && parsed.shortBreakTime && parsed.longBreakTime && parsed.longBreakInterval) {
                return parsed;
            }
        }
    } catch (error) {
        console.error('Failed to load settings:', error);
    }
    return DEFAULT_SETTINGS;
};

// Save settings to localStorage
const saveSettings = (settings: PomodoroSettings) => {
    try {
        localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
    } catch (error) {
        console.error('Failed to save settings:', error);
    }
};

export const usePomodoro = () => {
    // Load settings first before using them
    const initialSettings = loadSettings();

    const [mode, setMode] = useState<Mode>("focus");
    const [isRunning, setIsRunning] = useState(false);
    const [sessionsCompleted, setSessionsCompleted] = useState(0);
    const [hasSessionStarted, setHasSessionStarted] = useState(false);
    const [settings, setSettings] = useState<PomodoroSettings>(initialSettings);
    const [timeLeft, setTimeLeft] = useState(initialSettings.focusTime * 60);

    const getTotalTime = useCallback(() => {
        switch (mode) {
            case "focus": return settings.focusTime * 60;
            case "shortBreak": return settings.shortBreakTime * 60;
            case "longBreak": return settings.longBreakTime * 60;
        }
    }, [mode, settings]);

    const switchMode = useCallback((newMode: Mode, autoStart: boolean = false) => {
        setMode(newMode);
        // Set time based on new mode
        let newTime;
        switch (newMode) {
            case "focus": newTime = settings.focusTime * 60; break;
            case "shortBreak": newTime = settings.shortBreakTime * 60; break;
            case "longBreak": newTime = settings.longBreakTime * 60; break;
        }
        setTimeLeft(newTime);

        // Auto-start if specified (for breaks)
        if (autoStart) {
            setIsRunning(true);
        } else {
            setIsRunning(false);
        }
    }, [settings]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && hasSessionStarted) {
            // Auto-transition when timer reaches 0
            if (mode === "focus") {
                const newCompleted = sessionsCompleted + 1;
                setSessionsCompleted(newCompleted);
                if (newCompleted % settings.longBreakInterval === 0) {
                    switchMode("longBreak", true); // Auto-start long break
                } else {
                    switchMode("shortBreak", true); // Auto-start short break
                }
            } else {
                // Break is over, back to focus (auto-start)
                switchMode("focus", true);
            }
        }

        return () => clearInterval(interval);
    }, [isRunning, timeLeft, mode, sessionsCompleted, settings, switchMode, hasSessionStarted]);

    const toggleTimer = () => {
        if (!hasSessionStarted) {
            setHasSessionStarted(true);
        }
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(getTotalTime());
    };

    const stopSession = () => {
        setIsRunning(false);
        setHasSessionStarted(false);
        setMode("focus");
        setSessionsCompleted(0);
        setTimeLeft(settings.focusTime * 60);
    };

    const updateSettings = (newSettings: Partial<PomodoroSettings>) => {
        const updatedSettings = { ...settings, ...newSettings };
        setSettings(updatedSettings);
        saveSettings(updatedSettings); // Save to localStorage

        // Update current timer if not in an active session
        if (!hasSessionStarted && !isRunning) {
            // Update time based on current mode
            let newTime;
            switch (mode) {
                case "focus": newTime = updatedSettings.focusTime * 60; break;
                case "shortBreak": newTime = updatedSettings.shortBreakTime * 60; break;
                case "longBreak": newTime = updatedSettings.longBreakTime * 60; break;
            }
            setTimeLeft(newTime);
        }
    };

    return {
        mode,
        timeLeft,
        isRunning,
        sessionsCompleted,
        settings,
        hasSessionStarted,
        toggleTimer,
        resetTimer,
        stopSession,
        switchMode,
        updateSettings,
        getTotalTime,
    };
};

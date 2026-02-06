import { RotateCcw, Settings, Square } from "lucide-react";

interface ActionButtonsProps {
    isRunning: boolean;
    hasSessionStarted: boolean;
    onToggle: () => void;
    onReset: () => void;
    onStop: () => void;
    onSettings: () => void;
    mode: "focus" | "shortBreak" | "longBreak";
}

export default function ActionButtons({
    isRunning,
    hasSessionStarted,
    onToggle,
    onReset,
    onStop,
    onSettings,
    mode
}: ActionButtonsProps) {

    // Dynamic button gradient based on mode
    const getButtonGradient = () => {
        switch (mode) {
            case 'focus': return 'linear-gradient(135deg, #5B9FFE, #3B7FDE)';
            case 'shortBreak': return 'linear-gradient(135deg, #7FD85C, #5FC83C)';
            case 'longBreak': return 'linear-gradient(135deg, #a78bfa, #7c3aed)';
            default: return 'linear-gradient(135deg, #a78bfa, #7c3aed)';
        }
    };

    const getButtonShadow = () => {
        switch (mode) {
            case 'focus': return '0 10px 20px rgba(59, 127, 222, 0.3)';
            case 'shortBreak': return '0 10px 20px rgba(95, 200, 60, 0.3)';
            case 'longBreak': return '0 10px 20px rgba(124, 58, 237, 0.3)';
            default: return '0 10px 20px rgba(124, 58, 237, 0.3)';
        }
    };

    return (
        <div className="w-full flex justify-between items-center">

            {/* Reset Button - 44px circle */}
            <button
                onClick={onReset}
                className="flex items-center justify-center rounded-full transition-all active:scale-95"
                aria-label="Reset"
                style={{
                    width: '44px',
                    height: '44px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
            >
                <RotateCcw size={20} strokeWidth={2} color="#fff" style={{ opacity: 0.8 }} />
            </button>

            {/* Start/Pause/Resume Button - gradient with specific styling */}
            <button
                onClick={onToggle}
                className="transition-all active:scale-[0.96]"
                style={{
                    background: getButtonGradient(),
                    color: 'white',
                    border: 'none',
                    padding: '14px 45px',
                    borderRadius: '30px',
                    fontWeight: 600,
                    fontSize: '15px',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    boxShadow: getButtonShadow()
                }}
            >
                {isRunning ? "PAUSE" : (hasSessionStarted ? "RESUME" : "START")}
            </button>

            {/* Settings/Stop Button - 44px circle */}
            {hasSessionStarted ? (
                // Show Stop button when session has started
                <button
                    onClick={onStop}
                    className="flex items-center justify-center rounded-full transition-all active:scale-95"
                    aria-label="Stop"
                    style={{
                        width: '44px',
                        height: '44px',
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)'
                    }}
                >
                    <Square size={18} strokeWidth={2} color="#ef4444" fill="#ef4444" />
                </button>
            ) : (
                // Show Settings button when no session is active
                <button
                    onClick={onSettings}
                    className="flex items-center justify-center rounded-full transition-all active:scale-95"
                    aria-label="Settings"
                    style={{
                        width: '44px',
                        height: '44px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <Settings size={20} strokeWidth={2} color="#fff" style={{ opacity: 0.8 }} />
                </button>
            )}

        </div>
    );
}

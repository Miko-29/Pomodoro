import { useState } from "react";
import { usePomodoro, type Mode } from "./hooks/usePomodoro";
import TimerDisplay from "./components/TimerDisplay";
import ActionButtons from "./components/ActionButtons";
import Settings from "./components/Settings";
import ConfirmStopModal from "./components/ConfirmStopModal";
import "./index.css";

export default function App() {
  const {
    mode,
    timeLeft,
    isRunning,
    sessionsCompleted,
    settings,
    hasSessionStarted,
    toggleTimer,
    resetTimer,
    stopSession,
    updateSettings,
    getTotalTime
  } = usePomodoro();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isStopConfirmOpen, setIsStopConfirmOpen] = useState(false);

  const handleStopClick = () => {
    setIsStopConfirmOpen(true);
  };

  const handleConfirmStop = () => {
    setIsStopConfirmOpen(false);
    stopSession();
  };

  // Background Logic
  const getBackgroundClass = (m: Mode) => {
    switch (m) {
      case "focus": return "bg-focus";
      case "shortBreak": return "bg-short-break";
      case "longBreak": return "bg-long-break";
      default: return "";
    }
  };

  // Progress Color Logic (matching HTML purple)
  const getProgressColorVar = (m: Mode) => {
    switch (m) {
      case "focus": return "#5B9FFE";
      case "shortBreak": return "#7FD85C";
      case "longBreak": return "#9d8df1"; // matching HTML var(--primary-purple)
    }
  };

  return (
    <div className={`relative min-h-screen w-full overflow-hidden transition-all duration-1000 ${getBackgroundClass(mode)} bg-cover bg-center bg-no-repeat`}>
      {/* Overlay matching HTML - brightness(0.6) contrast(1.1) */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          mixBlendMode: 'multiply'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">

        {/* Timer Card - exact HTML dimensions: 340x480 */}
        <div
          className="flex flex-col items-center justify-between"
          style={{
            width: '340px',
            height: '480px',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(25px) saturate(150%)',
            WebkitBackdropFilter: 'blur(25px) saturate(150%)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '35px',
            padding: '50px 30px 40px 30px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
            '--progress-color': getProgressColorVar(mode)
          } as React.CSSProperties}
        >
          <TimerDisplay
            timeLeft={timeLeft}
            totalTime={getTotalTime()}
            mode={mode}
            sessionsCompleted={sessionsCompleted}
            longBreakInterval={settings.longBreakInterval}
          />

          <ActionButtons
            isRunning={isRunning}
            hasSessionStarted={hasSessionStarted}
            onToggle={toggleTimer}
            onReset={resetTimer}
            onStop={handleStopClick}
            onSettings={() => setIsSettingsOpen(true)}
            mode={mode}
          />
        </div>
      </div>

      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdate={updateSettings}
      />

      <ConfirmStopModal
        isOpen={isStopConfirmOpen}
        onConfirm={handleConfirmStop}
        onCancel={() => setIsStopConfirmOpen(false)}
      />
    </div>
  );
}

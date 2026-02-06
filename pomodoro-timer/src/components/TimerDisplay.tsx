import type { Mode } from "../hooks/usePomodoro";

interface TimerDisplayProps {
    timeLeft: number;
    totalTime: number;
    mode: Mode;
    sessionsCompleted: number;
    longBreakInterval: number;
}

export default function TimerDisplay({
    timeLeft,
    totalTime,
    mode,
    sessionsCompleted,
    longBreakInterval
}: TimerDisplayProps) {

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
    };

    // Calculate Progress (matching HTML: r=110, circumference = 2*PI*110 = 690)
    const radius = 110;
    const circumference = 2 * Math.PI * radius;
    const progress = timeLeft / totalTime;
    const strokeDashoffset = circumference - (1 - progress) * circumference;

    const getModeLabel = () => {
        switch (mode) {
            case "focus": return "FOCUS";
            case "shortBreak": return "BREAK";
            case "longBreak": return "REST";
        }
    };

    // Dots Logic
    const currentSessionInCycle = sessionsCompleted % longBreakInterval;

    return (
        <div className="relative flex flex-col items-center justify-center">
            {/* Circle Container - 240px */}
            <div className="relative w-[240px] h-[240px] flex items-center justify-center">
                {/* SVG - 230px */}
                <svg width="230" height="230" className="rotate-[-90deg]">
                    {/* Track Circle */}
                    <circle
                        cx="115"
                        cy="115"
                        r={radius}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx="115"
                        cy="115"
                        r={radius}
                        stroke="var(--progress-color)"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-300 ease-linear"
                        style={{ filter: 'drop-shadow(0 0 8px rgba(157, 141, 241, 0.4))' }}
                    />
                </svg>

                {/* Inner Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                    {/* Label - 11px, uppercase, letter-spacing 2px, weight 500 */}
                    <div
                        className="uppercase mb-1 opacity-60"
                        style={{
                            fontSize: '11px',
                            fontWeight: 500,
                            letterSpacing: '2px',
                            color: 'rgba(255, 255, 255, 0.6)'
                        }}
                    >
                        {getModeLabel()}
                    </div>

                    {/* Time - 54px, weight 300, letter-spacing -1px, Space Mono font */}
                    <div
                        className="font-mono"
                        style={{
                            fontSize: '54px',
                            fontWeight: 300,
                            letterSpacing: '-1px',
                            color: '#ffffff'
                        }}
                    >
                        {formatTime(timeLeft)}
                    </div>

                    {/* Dots - 6px, gap 6px */}
                    <div className="flex gap-[6px] mt-[15px]">
                        {Array.from({ length: longBreakInterval }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-full transition-all duration-300"
                                style={{
                                    width: '6px',
                                    height: '6px',
                                    background: i < currentSessionInCycle ? '#fff' : 'rgba(255, 255, 255, 0.2)'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

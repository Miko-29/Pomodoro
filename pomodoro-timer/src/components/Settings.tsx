import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface SettingsProps {
    isOpen: boolean;
    onClose: () => void;
    settings: {
        focusTime: number;
        shortBreakTime: number;
        longBreakTime: number;
        longBreakInterval: number;
    };
    onUpdate: (newSettings: any) => void;
}

export default function Settings({ isOpen, onClose, settings, onUpdate }: SettingsProps) {
    const [localSettings, setLocalSettings] = useState(settings);

    if (!isOpen) return null;

    const handleChange = (key: string, value: number) => {
        setLocalSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        onUpdate(localSettings);
        onClose();
    };

    const increment = (key: string) => {
        const currentValue = localSettings[key as keyof typeof localSettings];
        handleChange(key, currentValue + 1);
    };

    const decrement = (key: string) => {
        const currentValue = localSettings[key as keyof typeof localSettings];
        if (currentValue > 1) {
            handleChange(key, currentValue - 1);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
            style={{ background: 'rgba(0, 0, 0, 0.5)' }}
            onClick={onClose}
        >
            <div
                className="w-full max-w-[300px] rounded-[2rem] p-8 shadow-2xl animate-fade-in mx-4"
                style={{
                    background: 'linear-gradient(180deg, rgba(220, 220, 225, 0.95) 0%, rgba(200, 200, 210, 0.95) 100%)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                }}
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}
                <div className="flex justify-center items-center mb-8 relative">
                    <button
                        onClick={onClose}
                        className="absolute left-0 text-gray-400 hover:text-gray-600 text-2xl font-light"
                    >
                        ‹
                    </button>
                    <h2 className="text-gray-500 font-semibold text-base" style={{ letterSpacing: '0.02em' }}>
                        Edit Duration
                    </h2>
                </div>

                {/* Time Displays */}
                <div className="space-y-5 mb-8">
                    <div className="text-center text-gray-400 text-xl font-light">
                        {localSettings.focusTime} min
                    </div>
                    <div className="text-center text-gray-400 text-xl font-light">
                        {localSettings.shortBreakTime} min
                    </div>
                    <div className="text-center text-gray-400 text-xl font-light">
                        {localSettings.longBreakTime} min
                    </div>
                </div>

                {/* Intervals Control */}
                <div className="flex items-center justify-between mb-6 text-gray-400">
                    <span className="text-base font-light">{localSettings.longBreakInterval} intervals</span>
                    <div className="flex flex-col">
                        <button
                            onClick={() => increment('longBreakInterval')}
                            className="text-gray-400 hover:text-gray-600 -mb-1"
                        >
                            <ChevronUp size={20} strokeWidth={2} />
                        </button>
                        <button
                            onClick={() => decrement('longBreakInterval')}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <ChevronDown size={20} strokeWidth={2} />
                        </button>
                    </div>
                </div>

                {/* Slider */}
                <div className="mb-8">
                    <div className="relative h-1.5 bg-gray-300 rounded-full overflow-hidden mb-4">
                        <div
                            className="absolute left-0 top-0 h-full bg-blue-400 transition-all duration-200 rounded-full"
                            style={{ width: `${(localSettings.longBreakInterval / 10) * 100}%` }}
                        />
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={localSettings.longBreakInterval}
                            onChange={(e) => handleChange('longBreakInterval', Number(e.target.value))}
                            className="absolute inset-0 w-full opacity-0 cursor-pointer"
                        />
                    </div>
                    <div className="text-center text-blue-400 font-bold text-3xl">
                        {localSettings.longBreakInterval}
                    </div>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 px-8 rounded-full transition-all shadow-lg"
                    style={{
                        letterSpacing: '0.08em',
                        boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)'
                    }}
                >
                    SAVE
                </button>

            </div>
        </div>
    );
}

import { useState } from "react";
import { X, ChevronDown } from "lucide-react";

interface SettingsProps {
    isOpen: boolean;
    onClose: () => void;
    settings: {
        focusTime: number;
        shortBreakTime: number;
        longBreakTime: number;
        longBreakInterval: number;
        notificationsEnabled: boolean;
        soundEnabled: boolean;
    };
    onUpdate: (newSettings: any) => void;
}

export default function Settings({ isOpen, onClose, settings, onUpdate }: SettingsProps) {
    const [localSettings, setLocalSettings] = useState(settings);
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleChange = (key: string, value: number) => {
        setLocalSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        onUpdate(localSettings);
        onClose();
    };

    // Curated time options for better UX
    const getTimeOptions = (type: string): number[] => {
        switch (type) {
            case 'focusTime':
                return [15, 20, 25, 30, 45, 60]; // Common focus durations
            case 'shortBreakTime':
                return [3, 5, 10, 15]; // Short break options
            case 'longBreakTime':
                return [10, 15, 20, 25, 30]; // Long break options
            case 'longBreakInterval':
                return [2, 3, 4, 5, 6]; // Sections/intervals
            default:
                return [];
        }
    };

    const renderScrollablePicker = (key: string, currentValue: number, label: string) => {
        const values = getTimeOptions(key);

        return (
            <div className="mt-3 mb-4">
                <div className="relative">
                    {/* Scrollable dropdown */}
                    <div
                        className="max-h-48 overflow-y-auto rounded-2xl p-2 custom-scrollbar"
                        style={{
                            background: 'rgba(0, 0, 0, 0.3)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        {values.map((val) => (
                            <div
                                key={val}
                                onClick={() => {
                                    handleChange(key, val);
                                    setExpandedRow(null);
                                }}
                                className="cursor-pointer px-4 py-3 rounded-xl transition-all duration-200"
                                style={{
                                    background: val === currentValue ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                                    color: '#ffffff',
                                    fontSize: '1rem',
                                    fontWeight: val === currentValue ? 600 : 400
                                }}
                            >
                                {val} {label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
            style={{
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(8px)'
            }}
            onClick={onClose}
        >
            {/* Glassmorphic Modal Card */}
            <div
                className="relative flex flex-col w-full max-w-md mx-4 animate-fade-in"
                style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    borderRadius: '32px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    padding: '32px 28px',
                    height: '85vh',
                    overflow: 'hidden'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2
                        className="text-white font-semibold text-2xl"
                        style={{ letterSpacing: '-0.5px' }}
                    >
                        Settings
                    </h2>
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:bg-white/10"
                    >
                        <X size={24} strokeWidth={2} color="rgba(255, 255, 255, 0.8)" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                    {/* Focus Time */}
                    <div className="mb-2">
                        <div
                            className="flex justify-between items-center py-4 px-4 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-white/5"
                            onClick={() => setExpandedRow(expandedRow === 'focusTime' ? null : 'focusTime')}
                        >
                            <span className="text-white/70 text-base">Focus Time</span>
                            <div className="flex items-center gap-3">
                                <span className="text-white font-medium text-base">
                                    {localSettings.focusTime} min
                                </span>
                                <ChevronDown
                                    size={18}
                                    strokeWidth={2.5}
                                    color="rgba(255, 255, 255, 0.6)"
                                    className="transition-transform duration-200"
                                    style={{ transform: expandedRow === 'focusTime' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                />
                            </div>
                        </div>
                        {expandedRow === 'focusTime' && renderScrollablePicker('focusTime', localSettings.focusTime, 'min')}
                    </div>

                    {/* Short Break */}
                    <div className="mb-2">
                        <div
                            className="flex justify-between items-center py-4 px-4 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-white/5"
                            onClick={() => setExpandedRow(expandedRow === 'shortBreakTime' ? null : 'shortBreakTime')}
                        >
                            <span className="text-white/70 text-base">Short Break</span>
                            <div className="flex items-center gap-3">
                                <span className="text-white font-medium text-base">
                                    {localSettings.shortBreakTime} min
                                </span>
                                <ChevronDown
                                    size={18}
                                    strokeWidth={2.5}
                                    color="rgba(255, 255, 255, 0.6)"
                                    className="transition-transform duration-200"
                                    style={{ transform: expandedRow === 'shortBreakTime' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                />
                            </div>
                        </div>
                        {expandedRow === 'shortBreakTime' && renderScrollablePicker('shortBreakTime', localSettings.shortBreakTime, 'min')}
                    </div>

                    {/* Long Break */}
                    <div className="mb-2">
                        <div
                            className="flex justify-between items-center py-4 px-4 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-white/5"
                            onClick={() => setExpandedRow(expandedRow === 'longBreakTime' ? null : 'longBreakTime')}
                        >
                            <span className="text-white/70 text-base">Long Break</span>
                            <div className="flex items-center gap-3">
                                <span className="text-white font-medium text-base">
                                    {localSettings.longBreakTime} min
                                </span>
                                <ChevronDown
                                    size={18}
                                    strokeWidth={2.5}
                                    color="rgba(255, 255, 255, 0.6)"
                                    className="transition-transform duration-200"
                                    style={{ transform: expandedRow === 'longBreakTime' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                />
                            </div>
                        </div>
                        {expandedRow === 'longBreakTime' && renderScrollablePicker('longBreakTime', localSettings.longBreakTime, 'min')}
                    </div>

                    {/* Notifications Toggle */}
                    <div className="mb-2">
                        <div
                            className="flex justify-between items-center py-4 px-4 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-white/5"
                            onClick={async () => {
                                if (!localSettings.notificationsEnabled) {
                                    // Request permission when enabling
                                    const { requestNotificationPermission } = await import('../utils/notifications');
                                    const granted = await requestNotificationPermission();
                                    if (granted) {
                                        setLocalSettings(prev => ({ ...prev, notificationsEnabled: true }));
                                    }
                                } else {
                                    setLocalSettings(prev => ({ ...prev, notificationsEnabled: false }));
                                }
                            }}
                        >
                            <span className="text-white/70 text-base">Notifications</span>
                            <div
                                className="relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200"
                                style={{
                                    background: localSettings.notificationsEnabled
                                        ? 'linear-gradient(135deg, #10b981, #059669)'
                                        : 'rgba(255, 255, 255, 0.2)'
                                }}
                            >
                                <span
                                    className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
                                    style={{
                                        transform: localSettings.notificationsEnabled ? 'translateX(26px)' : 'translateX(4px)'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sound Toggle */}
                    <div className="mb-2">
                        <div
                            className="flex justify-between items-center py-4 px-4 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-white/5"
                            onClick={async () => {
                                const newValue = !localSettings.soundEnabled;
                                setLocalSettings(prev => ({ ...prev, soundEnabled: newValue }));

                                // Play test sound when enabling
                                if (newValue) {
                                    const { playCompletionSound } = await import('../utils/sounds');
                                    playCompletionSound();
                                }
                            }}
                        >
                            <span className="text-white/70 text-base">Sound</span>
                            <div
                                className="relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200"
                                style={{
                                    background: localSettings.soundEnabled
                                        ? 'linear-gradient(135deg, #10b981, #059669)'
                                        : 'rgba(255, 255, 255, 0.2)'
                                }}
                            >
                                <span
                                    className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
                                    style={{
                                        transform: localSettings.soundEnabled ? 'translateX(26px)' : 'translateX(4px)'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sections/Intervals */}
                    <div className="mb-2">
                        <div
                            className="flex justify-between items-center py-4 px-4 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-white/5"
                            onClick={() => setExpandedRow(expandedRow === 'longBreakInterval' ? null : 'longBreakInterval')}
                        >
                            <span className="text-white/70 text-base">Long Break Interval</span>
                            <div className="flex items-center gap-3">
                                <span className="text-white font-medium text-base">
                                    {localSettings.longBreakInterval}
                                </span>
                                <ChevronDown
                                    size={18}
                                    strokeWidth={2.5}
                                    color="rgba(255, 255, 255, 0.6)"
                                    className="transition-transform duration-200"
                                    style={{ transform: expandedRow === 'longBreakInterval' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                />
                            </div>
                        </div>
                        {expandedRow === 'longBreakInterval' && renderScrollablePicker('longBreakInterval', localSettings.longBreakInterval, 'sections')}
                    </div>
                </div>

                {/* Save Button */}
                <div className="mt-6 pt-4 border-t border-white/10">
                    <button
                        onClick={handleSave}
                        className="w-full py-3.5 rounded-2xl font-semibold text-base transition-all active:scale-95"
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                            letterSpacing: '0.5px'
                        }}
                    >
                        SAVE CHANGES
                    </button>
                </div>
            </div>
        </div>
    );
}

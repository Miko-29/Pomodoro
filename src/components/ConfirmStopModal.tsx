import { AlertTriangle } from "lucide-react";

interface ConfirmStopModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmStopModal({ isOpen, onConfirm, onCancel }: ConfirmStopModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
            style={{
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)'
            }}
            onClick={onCancel}
        >
            {/* Modal Card */}
            <div
                className="relative flex flex-col mx-4 animate-fade-in"
                style={{
                    width: '360px',
                    background: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    borderRadius: '28px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    padding: '32px 28px'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Warning Icon */}
                <div className="flex justify-center mb-4">
                    <div
                        className="flex items-center justify-center rounded-full"
                        style={{
                            width: '64px',
                            height: '64px',
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '2px solid rgba(239, 68, 68, 0.3)'
                        }}
                    >
                        <AlertTriangle size={32} strokeWidth={2} color="#ef4444" />
                    </div>
                </div>

                {/* Title */}
                <h2
                    className="text-white font-bold text-center mb-3"
                    style={{ fontSize: '1.5rem', letterSpacing: '-0.5px' }}
                >
                    Stop Your Session?
                </h2>

                {/* Message */}
                <p
                    className="text-white/80 text-center mb-6"
                    style={{ fontSize: '0.95rem', lineHeight: '1.5' }}
                >
                    You're doing great! Stopping now will reset your progress and break your flow. Are you sure you want to give up?
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                    {/* Cancel - Keep Going (Primary) */}
                    <button
                        onClick={onCancel}
                        className="flex-1 py-3.5 rounded-2xl font-semibold transition-all active:scale-95"
                        style={{
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            color: 'white',
                            fontSize: '0.95rem',
                            letterSpacing: '0.3px',
                            boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)'
                        }}
                    >
                        Keep Going
                    </button>

                    {/* Confirm - Stop Session (Secondary) */}
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-3.5 rounded-2xl font-semibold transition-all active:scale-95"
                        style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#ffffff',
                            fontSize: '0.95rem',
                            letterSpacing: '0.3px'
                        }}
                    >
                        Stop
                    </button>
                </div>
            </div>
        </div>
    );
}

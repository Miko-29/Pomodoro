import { useEffect } from 'react';

interface KeyboardShortcutsProps {
    onToggle: () => void;
    onReset: () => void;
    onStop: () => void;
    onEscapeSettings?: () => void;
    onEscapeStopModal?: () => void;
    isSettingsOpen: boolean;
    isStopModalOpen: boolean;
    hasSessionStarted: boolean;
}

export const useKeyboardShortcuts = ({
    onToggle,
    onReset,
    onStop,
    onEscapeSettings,
    onEscapeStopModal,
    isSettingsOpen,
    isStopModalOpen,
    hasSessionStarted,
}: KeyboardShortcutsProps) => {
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            // Don't trigger shortcuts if user is typing in an input
            const target = event.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                return;
            }

            // Escape key - close modals
            if (event.key === 'Escape') {
                if (isStopModalOpen && onEscapeStopModal) {
                    onEscapeStopModal();
                    return;
                }
                if (isSettingsOpen && onEscapeSettings) {
                    onEscapeSettings();
                    return;
                }
            }

            // Don't process other shortcuts when modal is open
            if (isSettingsOpen || isStopModalOpen) {
                return;
            }

            const key = event.key.toLowerCase();

            switch (key) {
                case ' ': // Space - Toggle timer
                    event.preventDefault(); // Prevent page scroll
                    onToggle();
                    break;

                case 'r': // R - Reset
                    event.preventDefault();
                    onReset();
                    break;

                case 's': // S - Stop (only if session started)
                    if (hasSessionStarted) {
                        event.preventDefault();
                        onStop();
                    }
                    break;

                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [
        onToggle,
        onReset,
        onStop,
        onEscapeSettings,
        onEscapeStopModal,
        isSettingsOpen,
        isStopModalOpen,
        hasSessionStarted,
    ]);
};

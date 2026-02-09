// Sound utility using Web Audio API
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
    if (!audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext;
};

// Play a pleasant notification sound
export const playCompletionSound = () => {
    try {
        const ctx = getAudioContext();

        // Create three ascending tones for a pleasant notification
        const times = [0, 0.15, 0.3];
        const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5 (C major chord)

        times.forEach((time, index) => {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            // Use a sine wave for a pleasant tone
            oscillator.type = 'sine';
            oscillator.frequency.value = frequencies[index];

            // Envelope for smooth sound
            const startTime = ctx.currentTime + time;
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

            oscillator.start(startTime);
            oscillator.stop(startTime + 0.4);
        });
    } catch (error) {
        console.error('Failed to play sound:', error);
    }
};

// Play a single beep (simpler alternative)
export const playBeep = () => {
    try {
        const ctx = getAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.value = 800; // 800 Hz

        const startTime = ctx.currentTime;
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.2);
    } catch (error) {
        console.error('Failed to play beep:', error);
    }
};

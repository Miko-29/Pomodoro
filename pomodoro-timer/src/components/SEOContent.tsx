import { X } from "lucide-react";

interface SEOContentProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SEOContent({ isOpen, onClose }: SEOContentProps) {
  if (!isOpen) return null;

  return (
    <div className="seo-modal-overlay" onClick={onClose}>
      <div
        className="seo-modal-content custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="seo-modal-close"
          onClick={onClose}
          aria-label="Close info panel"
        >
          <X size={20} strokeWidth={2} />
        </button>

        <section id="about" aria-label="About the Pomodoro Technique">
          <h2>Free Aesthetic Pomodoro Timer</h2>
          <p>
            This simple, beautiful Pomodoro timer helps you work smarter using the{" "}
            <strong>Pomodoro Technique</strong> — a proven time management method
            that breaks work into focused 25-minute sessions separated by short
            breaks. No signup, no download, no distractions — just an aesthetic,
            minimal focus timer that works.
          </p>

          <h3>How the Pomodoro Technique Works</h3>
          <ol>
            <li>
              <strong>Set your task.</strong> Decide what you'll work on.
            </li>
            <li>
              <strong>Start the 25-minute timer.</strong> Work with full focus until
              it rings.
            </li>
            <li>
              <strong>Take a 5-minute break.</strong> Step away from your screen.
            </li>
            <li>
              <strong>Repeat.</strong> After 4 Pomodoros, take a 15–30 minute long
              break.
            </li>
          </ol>

          <h3>Why the Pomodoro Technique Works</h3>
          <p>
            Regular structured breaks maintain mental freshness. The ticking timer
            creates urgency that defeats procrastination. Knowing a break is coming
            makes it easier to stay on task. Studies in cognitive science support
            interval-based focus for improving both output quality and sustained
            attention.
          </p>

          <h3>Frequently Asked Questions</h3>
          <details>
            <summary>How long is a Pomodoro?</summary>
            <p>
              A standard Pomodoro is 25 minutes. After the timer ends, take a
              5-minute break. After 4 Pomodoros, take a longer 15–30 minute break.
            </p>
          </details>
          <details>
            <summary>Is this Pomodoro timer free?</summary>
            <p>
              Yes — completely free, no account required, works in any browser.
            </p>
          </details>
          <details>
            <summary>Who invented the Pomodoro Technique?</summary>
            <p>
              Francesco Cirillo developed the technique in the late 1980s using a
              tomato-shaped kitchen timer. "Pomodoro" is Italian for tomato.
            </p>
          </details>
          <details>
            <summary>Can I use this as a study timer?</summary>
            <p>
              Absolutely. The Pomodoro Technique is widely used by students for
              studying. The 25/5 rhythm helps with memorization and prevents burnout
              during long study sessions.
            </p>
          </details>
        </section>
      </div>
    </div>
  );
}

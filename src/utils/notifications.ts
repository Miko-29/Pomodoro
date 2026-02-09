// Notification utility functions
export const requestNotificationPermission = async (): Promise<boolean> => {
    if (!("Notification" in window)) {
        console.log("This browser does not support notifications");
        return false;
    }

    if (Notification.permission === "granted") {
        return true;
    }

    if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        return permission === "granted";
    }

    return false;
};

// Extend NotificationOptions to include vibrate property (not in TS definitions but in Web API spec)
interface ExtendedNotificationOptions extends NotificationOptions {
    vibrate?: number[];
}

export const showNotification = (title: string, body: string, icon?: string) => {
    if (Notification.permission === "granted") {
        new Notification(title, {
            body,
            icon: icon || "/vite.svg",
            badge: "/vite.svg",
            vibrate: [200, 100, 200],
            tag: "pomodoro-timer",
            requireInteraction: false,
        } as ExtendedNotificationOptions);
    }
};

export const getNotificationMessage = (mode: "focus" | "shortBreak" | "longBreak") => {
    switch (mode) {
        case "focus":
            return {
                title: "🎯 Focus Session Complete!",
                body: "Great work! Time for a break to recharge."
            };
        case "shortBreak":
            return {
                title: "☕ Short Break Over!",
                body: "Ready to get back to work? Let's stay focused!"
            };
        case "longBreak":
            return {
                title: "🌟 Long Break Complete!",
                body: "You've earned it! Ready for another productive session?"
            };
    }
};

// pages/_app.tsx or components/NotificationSetup.tsx
import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "@/firebase";

const vapidKey = "YOUR_WEB_PUSH_CERTIFICATE_KEY_PAIR"; // from Firebase Console

export default function NotificationSetup() {
  useEffect(() => {
    // Request permission and get token
    const initFCM = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, { vapidKey });
        console.log("FCM Token:", token);
        // ✅ Send token to backend to save it
      } else {
        console.warn("Notification permission denied.");
      }
    };

    initFCM();

    // Optional: handle incoming messages in foreground
    onMessage(messaging, (payload) => {
      console.log("Message received in foreground:", payload);
      // You can show a toast or alert here
    });
  }, []);

  return null;
}

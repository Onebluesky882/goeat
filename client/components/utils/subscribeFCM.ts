// utils/subscribeFCM.ts

import { getToken, messaging } from "@/firebase";

export async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: "YOUR_WEB_PUSH_CERTIFICATE_KEY_PAIR",
    });
    return token;
  } else {
    console.warn("Permission not granted");
    return null;
  }
}

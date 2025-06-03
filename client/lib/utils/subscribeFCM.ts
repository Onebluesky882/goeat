import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";

const VAPID_KEY =
  "BM9sCjo9L-XpmcoeE7N9iB-ax9ojUtuXH4qwJOsicgyEmX0mMrHXAmnEMIxkr0Ekfei3sVb4hTBuYA3gBkGr7gA";

export const subscribeFCM = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Permission not granted for notifications");
      return null;
    }

    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    console.log("FCM Token:", token);
    return token;
  } catch (error) {
    console.error("FCM subscription failed", error);
    return null;
  }
};

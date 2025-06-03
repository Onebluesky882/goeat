"use client";
import { subscribeFCM } from "@/lib/utils/subscribeFCM";
import { useEffect } from "react";

const NotificationSetup = ({ userId }: { userId: string }) => {
  useEffect(() => {
    async function setup() {
      const token = await subscribeFCM();
      if (token && userId) {
        await fetch("api/save-fcm-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, token }),
        });
      }
    }
    setup();
  }, [userId]);
  return null;
};
export default NotificationSetup;

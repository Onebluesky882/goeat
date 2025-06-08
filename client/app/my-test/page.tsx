"use client";
import { Button } from "@/components/ui/button";
import liff from "@line/liff";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

// side effect logic here
type UserProps = {
  userId: string;
  displayName: string;
  pictureUrl: string;
};

const page = () => {
  const [profile, setProfile] = useState<UserProps | null>(null);
  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: "2007542481-DdLb0oJ3" });

        if (!liff.isLoggedIn()) {
          liff.login(); // redirect ไป login ก่อน
          return false;
        }
        const profile = await liff.getProfile();

        setProfile({
          userId: profile.userId,
          displayName: profile.displayName,
          pictureUrl: profile.pictureUrl ?? "",
        });

        await axios.post("/api/save-user", profile);
      } catch (error) {
        console.error("LIFF init error", error);
      }
    };
    initLiff();
  }, []);

  const handleLogout = () => {
    liff.logout();
  };
  return (
    <div className="bg-blue-300 min-h-screen flex flex-col items-center justify-center p-6 text-white space-y-6">
      <h1 className="text-2xl font-bold">Hello, {profile?.displayName}</h1>
      <p>uuid : {profile?.userId}</p>
      {profile?.pictureUrl && (
        <Image
          src={profile.pictureUrl}
          width={100}
          height={100}
          alt="Profile Picture"
          className="rounded-full shadow-lg"
        />
      )}

      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};
// if client want follow must register first
// .....................
// client add channel
// frontend get data from Line  send data to backend to store profile
//
export default page;

"use client";
import { UserProfile, useUser } from "@clerk/nextjs";

export default function Profile() {
  const { user } = useUser();
  console.log("profile user", user);
  return (
    <div className="h-screen flex justify-center items-center">
      <UserProfile />
    </div>
  );
}

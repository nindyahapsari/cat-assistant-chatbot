"use client";
import { UserProfile, useUser } from "@clerk/nextjs";

export default function Profile() {
  const { user } = useUser();
  return (
    <div className="h-screen flex justify-center items-center">
      <UserProfile />
    </div>
  );
}

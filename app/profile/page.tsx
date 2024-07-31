"use client";
import { UserProfile, useUser } from "@clerk/nextjs";

export default function Profile() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <UserProfile />
    </div>
  );
}

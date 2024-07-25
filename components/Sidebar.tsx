"use client";
import {
  SignInButton,
  SignedIn,
  SignOutButton,
  SignedOut,
  useUser,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Sidebar() {
  const { user } = useUser();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const params = new URLSearchParams();
  });

  return (
    <div className="bg-slate-400 h-full px-12 py-8 flex flex-col items-center desktop:col-span-2 desktop:row-span-12">
      <div className="my-4">
        <Link href="/">
          <h1 className="desktop:text-2xl desktop:font-semibold">Whisker</h1>
        </Link>
      </div>
      <div className="h-full w-full flex flex-col justify-end gap-y-4">
        <SignedOut>
          <Button variant="outline">
            <SignInButton />
          </Button>
        </SignedOut>

        <SignedIn>
          <Button variant="outline">
            <Link href={`/${user?.id}/profile`}>Profile</Link>
          </Button>
          <Button variant="outline">
            <SignOutButton />
          </Button>
        </SignedIn>
      </div>
    </div>
  );
}

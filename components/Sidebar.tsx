"use client";
import {
  SignInButton,
  SignedIn,
  SignOutButton,
  SignedOut,
  useUser,
  UserButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function Sidebar() {
  const { user } = useUser();
  const router = useRouter();
  const path = usePathname();

  const userId = user?.id;

  return (
    <>
      <div className="bg-slate-100 h-full px-12  flex flex-col items-center desktop:col-span-2 desktop:row-span-12">
        <div className="my-2">
          <Link href="/">
            <Image
              alt="Product image"
              className="aspect-square w-full rounded-md object-cover"
              src="/assets/1.svg"
              height="300"
              width="300"
            />
          </Link>
        </div>
        <div className="my-8 h-full w-full flex flex-col justify-end items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link href={`/cat-profile`}>Cat Profile</Link>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </>
  );
}

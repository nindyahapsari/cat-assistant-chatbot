"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { SignInButton, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-screen flex flex-col justify-between items-center px-24 desktop:flex-row">
      <div className="text-xl font-bold">Whisker</div>
      <NavigationMenu className="">
        <NavigationMenuItem className="list-none">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          {/* <Link href="#">
            <NavigationMenuLink>Signin</NavigationMenuLink>
            </Link> */}
        </NavigationMenuItem>
      </NavigationMenu>
    </div>
  );
}

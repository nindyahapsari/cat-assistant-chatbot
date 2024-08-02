"use client";
import { useState, useEffect } from "react";
import {
  SignInButton,
  SignedIn,
  SignOutButton,
  SignedOut,
  useUser,
  UserButton,
  SignUpButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Cat,
  CircleUser,
  Layout,
  Menu,
  Search,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Loading from '@/components/Loading';


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

export default function Sidebar({children}) {

  const [isClient, setIsClient] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const path = usePathname();

  const userId = user?.id;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-60 flex justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="grid max-h-screen w-full tablet:grid-cols-[220px_1fr] desktop:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 tablet:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 desktop:h-[60px] desktop:px-6">
          <Link
              href="/"
              className="flex flex-row justify-center items-center gap-2 font-semibold"
            >
              <Image
                alt="logo"
                className="scale-125"
                src="/assets/2.svg"
                width={100}
                height={100}
              />
              <span className="">Whisker</span>
            </Link>
          </div>
          <div className="flex-1 min-h-[calc(100vh-3.5rem)]">
            <nav className="grid items-start px-2 text-sm font-medium desktop:px-4">
            <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Layout className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/cat-profile"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Cat className="h-4 w-4" />
                Cat Profile
              </Link>
            </nav>
          </div>
         
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 mobile:max-w-screen desktop:h-[60px] desktop:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 tablet:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col mobile:max-w-40 bg-blue-300">
              <nav className="grid gap-2 text-lg font-medium">
              <Link
              href="/"
              className="flex flex-row justify-center items-center gap-2 font-semibold"
            >
              <Image
                alt="logo"
                className="scale-125"
                src="/assets/2.svg"
                width={100}
                height={100}
              />
              <span className="">Whisker</span>
            </Link>
            <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Layout className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/cat-profile"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Cat className="h-4 w-4" />
                Cat Profile
              </Link>
               
              </nav>
              
            </SheetContent>
          </Sheet>
           <div className="my-12 h-auto w-full flex flex-col items-end justify-center gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <Link
                    href="#"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <CircleUser className="h-5 w-5" />
                    Sign In
                  </Link>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "h-9 w-9",
                      userButtonPopoverCard: "p-4",
                    },
                  }}
                />
              </SignedIn>
            </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 overflow-hidden desktop:gap-6 desktop:p-6 ">    
          {children}        
        </main>
      </div>
    </div>
  );
}

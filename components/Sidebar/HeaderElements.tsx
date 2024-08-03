import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Cat, CircleUser, Layout, Menu, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/Sidebar/Logo";

type SidebarLinks = {
    path: string;
    name: string;
    icon: JSX.Element;
  };
  

export default function HeaderElements({ sidebarLinksInfo }: { sidebarLinksInfo: SidebarLinks[] }) {
  console.log('sidebar', sidebarLinksInfo)  
  return (
        <>
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
            <SheetContent
              side="left"
              className="flex flex-col mobile:max-w-full"
            >
              <nav className="grid gap-2 text-lg font-medium">
              <Logo />
                {
                    sidebarLinksInfo.map(({ path, name, icon }: SidebarLinks) => (
                        <Link
                          key={path}
                          href={path}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                          {icon}
                          {name}
                        </Link>
                    ))
                }
                
              </nav>
            </SheetContent>
          </Sheet>
          <div className="my-12 h-auto w-[calc(100%-28px)] flex flex-col items-end justify-center gap-4">
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
        </>
    )
}

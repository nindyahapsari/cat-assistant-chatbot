"use client";
import { useState, useEffect, ReactNode } from "react";
import { useUser } from "@clerk/nextjs";
import Loading from "@/components/Loading";
import SidebarLinks from "@/components/Sidebar/SidebarLinks";
import HeaderElements from "@/components/Sidebar/HeaderElements";
import Logo from "@/components/Sidebar/Logo";
import { Cat, Layout } from "lucide-react";

export const SIDEBARLINKSINFO = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <Layout className="h-4 w-4" />,
  },
  {
    path: "/cat-profile",
    name: "Cat Profile",
    icon: <Cat className="h-4 w-4" />,
  },
];

export default function Sidebar({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const { user } = useUser();

  const userId = user?.id;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full flex justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="grid  w-full tablet:grid-cols-[220px_1fr] desktop:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 tablet:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 desktop:h-[100px] desktop:px-6">
            <Logo />
          </div>
          <div className="z-10 flex-1 min-h-[calc(100vh-3.5rem)]">
            <nav className="grid items-start px-2 text-sm font-medium desktop:px-4">
              <SidebarLinks sidebarLinksInfo={SIDEBARLINKSINFO} />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 mobile:max-w-scree desktop:h-[60px] desktop:px-6">
          <HeaderElements sidebarLinksInfo={SIDEBARLINKSINFO} />
        </header>
        <main className="mobile:max-w-[375px] overflow-hidden flex flex-1 flex-col gap-4 p-4 tablet:max-w-[1440px] tablet:max-h-[calc(100vh-60px)]">
          <div className="mobile:overflow-scroll tablet:overflow-auto tablet:overflow-y-scroll tablet:w-[calc(90vw-220px)] desktop:w-[calc(95vw-280px)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

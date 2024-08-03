import { Cat, Layout } from "lucide-react";
import Link from "next/link";

type SidebarLinks = {
  path: string;
  name: string;
  icon: JSX.Element;
};


export default function SidebarLinks({ sidebarLinksInfo }: { sidebarLinksInfo: SidebarLinks[] }) {
  return (
    <>
    { sidebarLinksInfo.map(({ path, name, icon }: SidebarLinks) => (
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
      
    </>
  );
}

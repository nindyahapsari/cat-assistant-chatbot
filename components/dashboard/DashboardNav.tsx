import Link from "next/link";
import { Menu, Package2, Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function DashboardNav() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 tablet:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium tablet:flex tablet:flex-row tablet:items-center tablet:gap-5 tablet:text-sm desktop:gap-6">
        <Link
          href="#"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
        <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Link
        </Link>
      </nav>
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
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link href="#" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Connect Apps
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 tablet:ml-auto tablet:gap-2 desktop:gap-4">
        <form className="ml-auto flex-1 mobile:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 mobile:w-[300px] tablet:w-[200px] desktop:w-[300px]"
            />
          </div>
        </form>
      </div>
    </header>
  );
}

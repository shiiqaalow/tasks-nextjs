"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { User } from "@/app/types/user";

type MobileNavProps = {
  links: { label: string; href: string }[];
  user: User | null;
};

const MobileNav = ({ links, user }: MobileNavProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const displayName = user?.name ?? user?.email ?? "Guest";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger >
        <Button
          variant="outline"
          size="icon"
          className="size-10 rounded-xl shadow-sm sm:size-11 md:hidden [&_svg]:size-5"
          aria-label="Open menu"
          title="Open menu"
        >
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="flex w-[85%] max-w-sm flex-col gap-6 p-6">
        <SheetHeader className="p-0 text-left">
          <SheetTitle className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">🍕</span>
            <span className="font-serif text-lg font-semibold tracking-tight">Retro Web</span>
          </SheetTitle>
          <SheetDescription className="sr-only">Site navigation menu</SheetDescription>
        </SheetHeader>

        <nav className="flex flex-col gap-1">
          {links.map(({ label, href }) => {
            const active = pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-xl px-4 py-3 text-base font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t pt-5">
          {user ? (
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3"
            >
              <Avatar className="size-12 rounded-xl">
                <AvatarImage src={user.image ?? undefined} alt={displayName} />
                <AvatarFallback className="rounded-xl">
                  {/* {getInitials(displayName)} */}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate font-semibold">{displayName}</p>
                {user.email && (
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                )}
              </div>
            </Link>
          ) : (
            <Button  className="h-12 w-full rounded-xl">
              <Link href="/signin" onClick={() => setOpen(false)}>
                Sign in
              </Link>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
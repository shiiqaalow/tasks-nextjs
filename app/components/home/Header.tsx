"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckCircle2, LayoutDashboard, LogOut, Menu, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { User } from "@/app/types/user";
import ThemeToggle from "../ThemeToggle";
import { logoutAction } from "@/app/actions/user/signout";

type HeaderProps = {
  user: User | null;
};

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Dashboard", href: "/dashboard" },
];

const getInitials = (value: string) =>
  value
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const iconButton = "size-10 rounded-xl shadow-sm";

const Header = ({ user }: HeaderProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const displayName = user?.name ?? user?.email ?? "Guest";

  const handleLogout = () => {
    setOpen(false);
    startTransition(async () => {
      await logoutAction();
    });
  };

  // Only real pages can be "active". Anchor links (/#features) never match a pathname.
  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  const linkClass = (href: string, mobile = false) =>
    cn(
      "font-medium transition-colors",
      mobile ? "rounded-xl px-4 py-3 text-base" : "rounded-full px-4 py-2 text-sm",
      isActive(href)
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:bg-muted hover:text-foreground",
    );

  return (
    <header className="sticky top-0 z-40 -mx-5 border-b bg-background/80 px-5 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left: hamburger (mobile) + brand */}
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={`${iconButton} md:hidden`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            title={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>

          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <CheckCircle2 className="size-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">TaskFlow</span>
          </Link>
        </div>

        {/* Center: desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={linkClass(href)}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                className="rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Account menu"
              >
                <Avatar className="size-10 rounded-xl">
                  <AvatarImage src={user.image ?? undefined} alt={displayName} />
                  <AvatarFallback className="rounded-xl">
                    {getInitials(displayName)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-60 rounded-2xl p-2">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal">
                    <p className="truncate text-sm font-semibold">{displayName}</p>
                    {user.email && (
                      <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                    )}
                  </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  render={<Link href="/dashboard" />}
                  className="cursor-pointer rounded-xl py-2.5"
                >
                  <LayoutDashboard className="mr-2 size-4" /> Dashboard
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isPending}
                  className="cursor-pointer rounded-xl py-2.5 text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 size-4" />
                  {isPending ? "Signing out..." : "Sign out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              render={<Link href="/signin" />}
              nativeButton={false}
              className="h-10 rounded-xl px-4"
            >
              Sign in
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav className="flex flex-col gap-1 border-t py-3 md:hidden">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={isActive(href) ? "page" : undefined}
              className={linkClass(href, true)}
            >
              {label}
            </Link>
          ))}

          <div className="mt-2 border-t pt-3">
            {user ? (
              <>
                <div className="mb-2 px-4">
                  <p className="truncate text-sm font-semibold">{displayName}</p>
                  {user.email && (
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isPending}
                  className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-base font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
                >
                  <LogOut className="size-4" />
                  {isPending ? "Signing out..." : "Sign out"}
                </button>
              </>
            ) : (
              <Button
                render={<Link href="/signin" />}
                nativeButton={false}
                onClick={() => setOpen(false)}
                className="h-11 w-full rounded-xl"
              >
                Sign in
              </Button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
import type { Metadata } from "next";
import { Anybody } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./components/ThemeProvider";

const anybody = Anybody({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fornello Pizzeria",
  description: "Wood-fired pizza, tracked live from oven to door.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", anybody.className)}
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
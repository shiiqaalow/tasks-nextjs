import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import BoardPreview from "./BoardPreview";

const Hero = ({ signedIn }: { signedIn: boolean }) => (
  <section className="grid items-center gap-12 py-8 lg:grid-cols-2 lg:py-16">
    <div className="space-y-6">
      <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
        <span className="size-2 rounded-full bg-primary" />
        Simple task management
      </span>

      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        Organize your work,{" "}
        <span className="text-primary">one task at a time.</span>
      </h1>

      <p className="max-w-lg text-lg text-muted-foreground">
        TaskFlow helps you capture tasks, track their progress and finish what
        matters, all in one clean, private workspace.
      </p>

      <div className="flex flex-wrap gap-3">
        {signedIn ? (
          <Button  size="lg" className="h-12 rounded-md px-6">
            <Link href="/dashboard" className="flex justify-center items-center gap-1">
              Go to dashboard <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        ) : (
          <>
            <Button  size="lg" className="h-12 rounded-xl px-6">
              <Link href="/signup" className="flex justify-center items-center gap-1" >
                Get started free <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button  variant="outline" size="lg" className="h-12 rounded-xl px-6">
              <Link href="/signin">Log in</Link>
            </Button>
          </>
        )}
      </div>

      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
        {["Free to use", "Sign in with Google", "Your data stays private"].map((item) => (
          <li key={item} className="flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-primary" />
            {item}
          </li>
        ))}
      </ul>
    </div>

    <BoardPreview />
  </section>
);

export default Hero;
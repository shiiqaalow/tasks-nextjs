import Link from "next/link";

import { Button } from "@/components/ui/button";

const CallToAction = ({ signedIn }: { signedIn: boolean }) => (
  <section className="py-12">
    <div className="rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground shadow-lg sm:px-12">
      <h2 className="mx-auto max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
        Ready to get your tasks under control?
      </h2>
      <p className="mx-auto mt-3 max-w-md text-primary-foreground/80">
        Start organizing your work today. It only takes a minute.
      </p>
      <Button variant="secondary" size="lg" className="mt-6 h-12 rounded-xl px-8">
        <Link href={signedIn ? "/dashboard" : "/signup"}>
          {signedIn ? "Open dashboard" : "Get started free"}
        </Link>
      </Button>
    </div>
  </section>
);

export default CallToAction;
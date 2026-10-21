import { Columns3, GripVertical, ListChecks, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: ListChecks,
    title: "Create and manage tasks",
    text: "Add, edit and delete tasks in seconds, each with a title and description.",
  },
  {
    icon: Columns3,
    title: "Track every status",
    text: "Move work through To do, In progress and Done, and filter by status.",
  },
  {
    icon: ShieldCheck,
    title: "Private to your account",
    text: "Sign in with email or Google. You only ever see your own tasks.",
  },
  {
    icon: GripVertical,
    title: "Drag and drop",
    text: "Reorder tasks and change their status by dragging cards on the board.",
  },
];

const Features = () => (
  <section id="features" className="scroll-mt-24 space-y-10 py-12">
    <div className="mx-auto max-w-2xl space-y-3 text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Everything you need, nothing you don&apos;t
      </h2>
      <p className="text-muted-foreground">
        A focused set of tools that keeps you moving, without the clutter.
      </p>
    </div>

    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {FEATURES.map(({ icon: Icon, title, text }) => (
        <article
          key={title}
          className="rounded-3xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
        >
          <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="size-6" />
          </span>
          <h3 className="mb-2 text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{text}</p>
        </article>
      ))}
    </div>
  </section>
);

export default Features;
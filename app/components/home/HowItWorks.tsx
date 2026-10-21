const STEPS = [
  { title: "Create your account", text: "Sign up with your email or Google in under a minute." },
  { title: "Add your tasks", text: "Write down what you need to do and give each task a status." },
  { title: "Track your progress", text: "Move tasks across the board until everything is done." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="scroll-mt-24 space-y-10 py-12">
    <div className="mx-auto max-w-2xl space-y-3 text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
      <p className="text-muted-foreground">Up and running in three simple steps.</p>
    </div>

    <ol className="grid gap-6 md:grid-cols-3">
      {STEPS.map((step, i) => (
        <li key={step.title} className="relative rounded-3xl border bg-card p-6 shadow-sm">
          <span className="mb-4 flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            {i + 1}
          </span>
          <h3 className="mb-1 text-lg font-semibold">{step.title}</h3>
          <p className="text-sm text-muted-foreground">{step.text}</p>
        </li>
      ))}
    </ol>
  </section>
);

export default HowItWorks;
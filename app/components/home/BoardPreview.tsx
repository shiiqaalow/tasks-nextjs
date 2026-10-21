const COLUMNS = [
  { title: "To do", dot: "bg-muted-foreground", tasks: ["Design landing page", "Write project report"] },
  { title: "In progress", dot: "bg-primary", tasks: ["Build task API"] },
  { title: "Done", dot: "bg-green-500", tasks: ["Set up authentication", "Deploy to Vercel"] },
];

const BoardPreview = () => (
  <div
    aria-hidden="true"
    className="rounded-3xl border bg-card p-4 shadow-xl sm:p-5 lg:rotate-1"
  >
    <div className="mb-4 flex items-center gap-1.5">
      <span className="size-2.5 rounded-full bg-red-400" />
      <span className="size-2.5 rounded-full bg-yellow-400" />
      <span className="size-2.5 rounded-full bg-green-400" />
    </div>

    <div className="grid grid-cols-3 gap-3">
      {COLUMNS.map((col) => (
        <div key={col.title} className="space-y-2 rounded-2xl bg-muted/60 p-2.5">
          <div className="flex items-center gap-1.5 px-1 text-[11px] font-semibold">
            <span className={`size-2 rounded-full ${col.dot}`} />
            {col.title}
          </div>
          {col.tasks.map((task) => (
            <div key={task} className="rounded-xl border bg-card p-2.5 text-[11px] font-medium shadow-sm">
              {task}
              <div className="mt-2 h-1.5 w-2/3 rounded-full bg-muted" />
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default BoardPreview;
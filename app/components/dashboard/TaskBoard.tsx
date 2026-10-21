"use client";
import { Task } from "@/app/types/task";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  Layers,
  ListTodo,
  Loader,
  Plus,
  Search,
} from "lucide-react";
import { useState } from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import { User } from "@/app/types/user";

type TaskboardProps = {
  tasks: Task[];
  user: User;
};

const TaskBoard = ({ tasks, user }: TaskboardProps) => {


  const [query, setQuery] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const counts = tasks.reduce(
    (acc, task) => {
      acc[task.status] += 1;
      return acc;
    },
    { total: tasks.length, todo: 0, "in-progress": 0, done: 0 },
  );

  const stats = [
    { label: "Total tasks", value: counts.total, icon: Layers },
    { label: "To do", value: counts.todo, icon: ListTodo },
    {
      label: "In progress",
      value: counts["in-progress"],
      icon: Loader,
    },
    { label: "Done", value: counts.done, icon: CheckCircle2 },
  ];

  const filteredTasks = tasks.filter((t) => {
    const q = query.trim().toLowerCase();
    return (
      t.title.toLowerCase().includes(q) ||
      t.description?.toLowerCase().includes(q)
    );
  });

  const percent = counts.total
    ? Math.round((counts.done / counts.total) * 100)
    : 0;

  const username = user.name?.split(" ")[0];

  return (
    <div className="min-h-screen flex flex-col gap-7">
      {/* welcome user */}
      <section className="flex items-center gap-3">
        <h1 className="text-2xl">
          Welcome Back{" "}
          <span className="text-md md:text-3xl font-bold">
            {username ?? "Guest"}
          </span>
        </h1>
      </section>

      {/* cards stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card
            key={label}
            className="rounded-3xl border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{label}</p>
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold tracking-tight">{value}</p>
          </Card>
        ))}
      </section>

      {/* progress bar card */}
      <section>
        <Card className="rounded-3xl border bg-card p-5 shadow-sm">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">Overall progress</span>
            <span className="text-muted-foreground">{percent}% complete</span>
          </div>
          <div
            className="h-2.5 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
        </Card>
      </section>

      {/* Toolbar */}
      <section className="flex flex-col">
        <div className="flex items-center justify-between gap-3">
          {/* search bar */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks..."
              aria-label="Search tasks"
              className="h-9 rounded-xl pl-10"
            />
          </div>
          <Button
            type="button"
            className="md:w-auto shrink-0 rounded-xl px-4 cursor-pointer"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="mr-1 size-4" /> Add task
          </Button>
        </div>
        {/* Add task */}
        <AddTask open={dialogOpen} onOpenChange={setDialogOpen} />
      </section>

      {/* task list */}
      <section>
        <TaskList user={user} tasks={filteredTasks} />
      </section>

    </div>
  );
};
export default TaskBoard;

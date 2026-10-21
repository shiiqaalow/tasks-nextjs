import type { Task } from "../types/task";

export const SAMPLE_TASKS: Task[] = [
  { id: "1", title: "Design the landing page", description: "Hero, features and call to action.", status: "done", createdAt: "2026-10-12T09:00:00Z" },
  { id: "2", title: "Set up authentication", description: "Email login plus Google sign-in.", status: "done", createdAt: "2026-10-13T09:00:00Z" },
  { id: "3", title: "Build the task board", description: "Three columns with status changes.", status: "in-progress", createdAt: "2026-10-15T09:00:00Z" },
  { id: "4", title: "Connect tasks to MongoDB", description: "Server actions for create, edit and delete.", status: "todo", createdAt: "2026-10-16T09:00:00Z" },
  { id: "5", title: "Write the project report", description: "", status: "todo", createdAt: "2026-10-17T09:00:00Z" },
];
export type TaskStatus = "todo" | "in-progress" | "done";

export type Task = {
  id: string;
  userId: string
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string; 
  updatedAt: string; 
};

export type SafeTask = Omit<Task, '_id' >

export type CreateTask = Pick<Task, 'title' | 'description' | 'status' >

export type UpdateTask = {
  title?: string;
  description?: string;
  status?: TaskStatus;
};

export const STATUSES: { value: TaskStatus; label: string; dot: string }[] = [
  { value: "todo", label: "To do", dot: "bg-muted-foreground" },
  { value: "in-progress", label: "In progress", dot: "bg-primary" },
  { value: "done", label: "Done", dot: "bg-green-500" },
];
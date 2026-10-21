import { STATUSES, Task, TaskStatus } from "@/app/types/task";
import { User } from "@/app/types/user";
import { Card } from "@/components/ui/card";
import { CalendarDays, Clock, TriangleAlert } from "lucide-react";
import TaskDropdown from "./TaskDropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TaskListProps = {
  tasks: Task[];
  user: User;
};

const TaskList = ({ tasks, user }: TaskListProps) => {
  const byStatus = (status: TaskStatus) =>
    tasks.filter((t) => t.status === status);

  const getInitials = (name?: string) =>
    (name ?? "?")
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {STATUSES.map((column) => {
        const columnTasks = byStatus(column.value as TaskStatus);

        return (
          <section
            key={column.value}
            className="flex min-h-64 flex-col gap-3 rounded-3xl border bg-muted/40 p-4"
          >
            {/* column header */}
            <header className="flex items-center justify-between px-1">
              <h2 className="font-semibold">{column.label}</h2>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {columnTasks.length}
              </span>
            </header>

            {/* column body (future drop zone) */}
            <div className="flex flex-1 flex-col gap-3">
              {columnTasks.length === 0 ? (
                <p className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed py-8 text-md text-muted-foreground">
                  <TriangleAlert className="size-8" />
                  No tasks
                </p>
              ) : (
                columnTasks.map((task) => {
                  const creator = user?.name.split(" ")[0] ?? "Unknown";

                  return (
                    <Card
                      key={task.id}
                      className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                    >
                      {/* title + description */}
                      <div>
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold leading-snug">
                            {task.title}
                          </h3>
                          {/* edit delete buttons */}
                          <TaskDropdown task={task} />
                        </div>
                        {task.description && (
                          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                            {task.description}
                          </p>
                        )}
                      </div>

                      {/* footer */}
                      <div className="flex items-center justify-between gap-3 border-t pt-3">
                        {/* creator */}
                        <div className="flex min-w-0 items-center gap-2">
                          <Avatar className="size-7 shrink-0">
                            <AvatarImage
                              src={user?.image ?? undefined}
                              alt={user.name}
                              referrerPolicy="no-referrer"
                            />
                            <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                              {getInitials(creator)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="min-w-0 leading-tight">
                            <p className="text-[11px] text-muted-foreground">
                              Created by
                            </p>
                            <p className="truncate text-xs font-medium">
                              {creator}
                            </p>
                          </div>
                        </div>

                        {/* dates */}
                        {task.createdAt && (
                          <div className="flex shrink-0 flex-col items-end gap-1 text-xs text-muted-foreground">
                            <span
                              className="flex items-center gap-1"
                              title={`Created ${formatDate(task.createdAt)} `}
                            >
                              <CalendarDays className="size-3.5" />
                              {formatDate(task.createdAt)}
                            </span>

                            {task.updatedAt &&
                              task.updatedAt !== task.createdAt && (
                                <span
                                  className="flex items-center gap-1"
                                  title={`Updated ${formatDate(task.updatedAt)}`}
                                >
                                  <Clock className="size-3.5" />
                                  Edited {formatDate(task.updatedAt)}
                                </span>
                              )}
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default TaskList;

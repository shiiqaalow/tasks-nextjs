"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { STATUSES, Task } from "@/app/types/task";
import { editTaskAction } from "@/app/actions/task/edit-task";

const initialState = {
  success: false,
  status: 0,
  message: ""
};

const EditTaskForm = ({ task }: { task: Task }) => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    editTaskAction.bind(null, task.id),
    initialState,
  );

  useEffect(() => {
    if (state.success) router.push("/dashboard");
  }, [state, router]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Input
        name="title"
        placeholder="Task title"
        defaultValue={task.title}
      />
      <Textarea
        name="description"
        placeholder="Task description"
        defaultValue={task.description}
      />
      <select
        name="status"
        defaultValue={task.status}
        className="h-10 rounded-md border bg-background px-3 text-sm"
      >
        {STATUSES.map((status) => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>

      {state.message && !state.success && (
        <p className="rounded-md bg-destructive/20 p-2 text-center text-sm text-destructive">
          {state.message}
        </p>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending} className="flex-1 cursor-pointer">
          {isPending ? (
            <>
              <Loader className="mr-2 size-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save changes"
          )}
        </Button>
        <Button variant="outline">
          <Link href="/dashboard">Cancel</Link>
        </Button>
      </div>
    </form>
  );
};

export default EditTaskForm;
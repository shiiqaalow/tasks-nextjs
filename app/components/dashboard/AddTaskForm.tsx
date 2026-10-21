// AddTaskForm.tsx (the form)
"use client";

import { useActionState, useEffect } from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { STATUSES } from "@/app/types/task";
import { createTaskAction } from "@/app/actions/task/create-task";
import { Label } from "@/components/ui/label";

const initialState = {
  success: false,
  status: 0,
  message: "",
  // values: { title: "", description: "", status: "todo" },
};

type AddTaskFormProps = {
  onDone: () => void;
};

const AddTaskForm = ({ onDone }: AddTaskFormProps) => {
  const [state, formAction, isPending] = useActionState(
    createTaskAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) onDone();
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.message && !state.success && (
        <p className="rounded-md bg-destructive/20 p-2 text-center text-sm text-destructive">
          {state.message}
        </p>
      )}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Task title"
          // defaultValue={state.values?.title}
          className="h-9"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <Textarea
          id="description"
          name="description"
          placeholder="Task description"
          // defaultValue={state.values?.description}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>

        <select
          id="status"
          name="status"
          // defaultValue={state.values?.status ?? "todo"}
          className="w-full h-9 rounded-md border bg-background px-3 text-sm"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-3">
        <Button
          onClick={onDone}
          variant={"outline"}
          className="flex-1 cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="flex-2 cursor-pointer"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader className="size-4 animate-spin" />
              Adding
              <span className="flex">
                <span className="animate-bounce [animation-delay:-0.3s]">
                  .
                </span>
                <span className="animate-bounce [animation-delay:-0.15s]">
                  .
                </span>
                <span className="animate-bounce">.</span>
              </span>
            </span>
          ) : (
            "Add task"
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddTaskForm;

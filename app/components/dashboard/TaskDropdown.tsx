"use client";

import { useActionState } from "react";
import { Task } from "@/app/types/task";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Loader, Pencil, Trash2 } from "lucide-react";
import { deleteTaskAction } from "@/app/actions/task/delete-task";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";

type TaskDropdownProps = {
  task: Task;
};

const initialState = { success: false, status: 0, message: "" };

const TaskDropdown = ({ task }: TaskDropdownProps) => {
  const [state, formAction, isPending] = useActionState(
    deleteTaskAction.bind(null, task.id),
    initialState,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Options for ${task.title}`}
        className="-mr-1 shrink-0 cursor-pointer rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <EllipsisVertical className="size-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        {/* edit button */}
        {/* <form action={editTaskAction}> */}
          <DropdownMenuItem
            onClick={()=>redirect(`/dashboard/edit/${task.id}`)}
            className="cursor-pointer"
          >
            <Input type="hidden" id='id' name='id' value={task.id} />
            <Pencil className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
        {/* </form> */}

        <DropdownMenuSeparator />

        {/* delete button */}
        <form action={formAction}>
          <Button
            type="submit"
            variant="ghost"
            disabled={isPending}
            // onClick={() => startTransition(() => formAction())}
            className="w-full cursor-pointer justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            {isPending ? (
              <Loader className="mr-2 size-4 animate-spin" />
            ) : (
              <Trash2 className="mr-2 size-4" />
            )}
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </form>

        {state.message && !state.success && (
          <p className="px-2 py-1.5 text-xs text-destructive">{state.message}</p>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskDropdown;
// app/actions/task/edit-task.ts
"use server";

import { revalidatePath } from "next/cache";
import { updateTask } from "@/app/lib/task/task";
import { getCurrentUser } from "@/app/lib/token/current-user";
import { getString, ServerResponseStatus } from "@/app/lib/utils";
import { STATUSES, TaskStatus } from "@/app/types/task";

export const editTaskAction = async (
  id: string,
  _prev: unknown,
  formData: FormData,
): Promise<ServerResponseStatus> => {
  const user = await getCurrentUser();
  if (!user?.id) {
    return { success: false, status: 401, message: "Not authenticated." };
  }

  const title = getString(formData, "title").trim();
  const description = getString(formData, "description").trim();
  const statuses = getString(formData, "status");

  if (!title) {
    return { success: false, status: 400, message: "Title is required." };
  }

  const validStatus = STATUSES.find((status) => status.value === statuses);
  if (!validStatus) {
    return { success: false, status: 400, message: "Invalid status." };
  }

  const result = await updateTask(user.id, id, {
    title,
    description,
    status: validStatus.value as TaskStatus,
  });

  if (result.success) revalidatePath("/dashboard");

  return {
    success: result.success,
    status: result.status,
    message: result.message,
  };
};
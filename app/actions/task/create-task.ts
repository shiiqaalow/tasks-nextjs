"use server";

import { revalidatePath } from "next/cache";
import { createTask } from "@/app/lib/task/task";
import { getCurrentUser } from "@/app/lib/token/current-user";
import { getString, ServerResponseStatus } from "@/app/lib/utils";
import { STATUSES, type TaskStatus } from "@/app/types/task";

export const createTaskAction = async (
  _prev: ServerResponseStatus,
  formData: FormData,
): Promise<ServerResponseStatus> => {
  const user = await getCurrentUser();
  if (!user?.id) {
    return { success: false, status: 401, message: "Not authenticated." };
  }

  const title = getString(formData, "title").trim();
  const description = getString(formData, "description").trim();
  const rawStatus = getString(formData, "status");

  if (!title) {
    return { success: false, status: 400, message: "Title is required." };
  }

  const status = STATUSES.find((s) => s.value === rawStatus)?.value as
    | TaskStatus
    | undefined;
  if (!status) {
    return { success: false, status: 400, message: "Invalid status." };
  }

  const result = await createTask(user.id, { title, description, status });

  if (result.success) {
    revalidatePath("/dashboard");
  }

  return {
    success: result.success,
    status: result.status,
    message: result.message,
  };
};
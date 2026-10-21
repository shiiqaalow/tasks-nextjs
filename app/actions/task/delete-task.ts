'use server'
import { revalidatePath } from "next/cache";
import { deleteTask } from "@/app/lib/task/task";
import { getCurrentUser } from "@/app/lib/token/current-user";
import { ServerResponseStatus } from "@/app/lib/utils";

export const deleteTaskAction = async (
  id: string
): Promise<ServerResponseStatus> => {
  const user = await getCurrentUser();
  if (!user?.id) {
    return { success: false, status: 401, message: "Not authenticated." };
  }

  const result = await deleteTask(user.id, id);

  if (result.success) revalidatePath("/dashboard");

  return {
    success: result.success,
    status: result.status,
    message: result.message,
  };
};
export const dynamic = "force-dynamic"

import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/app/lib/token/current-user";
import { getTaskById } from "@/app/lib/task/task";
import EditTaskForm from "@/app/components/dashboard/EditTaskForm";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const user = await getCurrentUser();
  if (!user?.id) redirect("/signin");

  const task = await getTaskById(user.id, id);
  if (!task.success || !task.data) notFound();

  return (
    <div className="mx-auto max-w-xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Edit task</h1>
      <EditTaskForm task={task.data} />
    </div>
  );
};

export default Page;
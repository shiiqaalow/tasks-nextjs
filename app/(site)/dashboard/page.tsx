// app/dashboard/page.tsx  (no "use client" here)
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/lib/token/current-user";
import { getAllTasks } from "@/app/lib/task/task";
import  TaskBoard  from "../../components/dashboard/TaskBoard";

const DashboardPage = async () => {
  const user = await getCurrentUser();
  if (!user?.id) redirect("/signin"); // use your login route
  const result = await getAllTasks(String(user.id));
  const tasks = result.success ? (result.data ?? []) : [];

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      {!result.success && (
        <p className="text-sm text-destructive" role="alert">
          {result.message}
        </p>
      )}
      <TaskBoard 
        user={user}
        tasks={tasks} />
    </main>
  );
}

export default DashboardPage
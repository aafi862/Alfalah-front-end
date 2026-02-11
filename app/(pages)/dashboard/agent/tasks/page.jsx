import DashboardLayout from "../../DashboardLayout";

export default function AgentTasksPage() {
  return (
    <DashboardLayout allowedRoles={["agent"]}>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <p>Manage agent tasks here.</p>
    </DashboardLayout>
  );
}

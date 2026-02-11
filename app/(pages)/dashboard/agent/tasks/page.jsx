import DashboardLayout from "../../DashboardLayout";
import { ROLES } from "@/lib/access-control";

export default function AgentTasksPage() {
  return (
    <DashboardLayout allowedRoles={[ROLES.AGENT]}>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <p>Manage agent tasks here.</p>
    </DashboardLayout>
  );
}

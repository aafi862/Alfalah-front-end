import DashboardLayout from "../../DashboardLayout";
import { ROLES } from "@/lib/access-control";

export default function AgentLeadsPage() {
  return (
    <DashboardLayout allowedRoles={[ROLES.AGENT]}>
      <h1 className="text-2xl font-bold mb-4">Leads</h1>
      <p>Manage agent leads here.</p>
    </DashboardLayout>
  );
}

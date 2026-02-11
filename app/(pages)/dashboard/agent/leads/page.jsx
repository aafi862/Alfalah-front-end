import DashboardLayout from "../../DashboardLayout";

export default function AgentLeadsPage() {
  return (
    <DashboardLayout allowedRoles={["agent"]}>
      <h1 className="text-2xl font-bold mb-4">Leads</h1>
      <p>Manage agent leads here.</p>
    </DashboardLayout>
  );
}

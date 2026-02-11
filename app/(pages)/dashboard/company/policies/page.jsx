import DashboardLayout from "../../DashboardLayout";

export default function CompanyPoliciesPage() {
  return (
    <DashboardLayout allowedRoles={["company"]}>
      <h1 className="text-2xl font-bold mb-4">Policies</h1>
      <p>List of all company policies.</p>
    </DashboardLayout>
  );
}

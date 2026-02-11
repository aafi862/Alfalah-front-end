import DashboardLayout from "../../DashboardLayout";

export default function CompanyEmployeesPage() {
  return (
    <DashboardLayout allowedRoles={["company"]}>
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <p>Manage company employees here.</p>
    </DashboardLayout>
  );
}

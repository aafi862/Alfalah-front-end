import DashboardLayout from "../../DashboardLayout";
import { ROLES } from "@/lib/access-control";

export default function CompanyEmployeesPage() {
  return (
    <DashboardLayout allowedRoles={[ROLES.COMPANY]}>
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <p>Manage company employees here.</p>
    </DashboardLayout>
  );
}

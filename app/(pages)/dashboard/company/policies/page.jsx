import DashboardLayout from "../../DashboardLayout";
import { ROLES } from "@/lib/access-control";

export default function CompanyPoliciesPage() {
  return (
    <DashboardLayout allowedRoles={[ROLES.COMPANY]}>
      <h1 className="text-2xl font-bold mb-4">Policies</h1>
      <p>List of all company policies.</p>
    </DashboardLayout>
  );
}

import DashboardLayout from "../../DashboardLayout";
import { ROLES } from "@/lib/access-control";

export default function ManageUsersPage() {
  return (
    <DashboardLayout allowedRoles={[ROLES.ADMIN]}>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <p>Admin can manage all users here.</p>
    </DashboardLayout>
  );
}

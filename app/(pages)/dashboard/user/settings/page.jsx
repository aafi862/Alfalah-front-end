import DashboardLayout from "../../DashboardLayout";
import { ROLES } from "@/lib/access-control";

export default function UserSettingsPage() {
  return (
    <DashboardLayout allowedRoles={[ROLES.USER]}>
      <h1 className="text-2xl font-bold mb-4">User Settings</h1>
      <p>Here you can update your account settings.</p>
    </DashboardLayout>
  );
}

import DashboardLayout from "../DashboardLayout";

export default function ManageUsers() {
    return (
        <DashboardLayout allowedRoles={["admin"]}>
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
            <p>Admin can manage all users here.</p>
        </DashboardLayout>
    );
}

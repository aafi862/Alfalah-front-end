import DashboardLayout from "../DashboardLayout";

export default function UserSettings() {
    return (
        <DashboardLayout allowedRoles={["user"]}>
            <h1 className="text-2xl font-bold mb-4">User Settings</h1>
            <p>Here you can update your account settings.</p>
        </DashboardLayout>
    );
}

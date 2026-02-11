"use client";

import Card from "@/components/common/Card";

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <Card title="Total Users" description="Overview of users">
                    <p>Users: 120</p>
                    <p>Companies: 8</p>
                </Card>

                <Card title="Pending Approvals" description="Approvals awaiting action">
                    <p>New agents: 5</p>
                    <p>New companies: 2</p>
                </Card>

                <Card title="System Status" description="Server and API status">
                    <p>API: Running</p>
                    <p>Server: Healthy</p>
                </Card>
            </div>
        </div>
    );
}

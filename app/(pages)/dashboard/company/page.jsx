"use client";

import Card from "@/components/common/Card";

export default function CompanyDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Company Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <Card title="Employees" description="List of employees">
                    <p>Total Employees: 50</p>
                    <p>Active Policies: 30</p>
                </Card>

                <Card title="Policies Overview" description="Company policies">
                    <ul className="list-disc pl-4">
                        <li>Health: 20 active</li>
                        <li>Life: 10 active</li>
                    </ul>
                </Card>
            </div>
        </div>
    );
}

"use client";

import Card from "@/components/common/Card";

export default function AgentDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Agent Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <Card title="Leads" description="Current leads assigned">
                    <ul className="list-disc pl-4">
                        <li>Lead 1: Pending</li>
                        <li>Lead 2: Contacted</li>
                    </ul>
                </Card>

                <Card title="Tasks" description="Your assigned tasks">
                    <ul className="list-disc pl-4">
                        <li>Follow up client A</li>
                        <li>Prepare report B</li>
                    </ul>
                </Card>
            </div>
        </div>
    );
}

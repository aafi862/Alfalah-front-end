"use client";

import { useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import { ROLES } from "@/lib/access-control";
import PageHeader from "@/components/dashboard/PageHeader";
import DataTableCard, { StatusBadge } from "@/components/dashboard/DataTableCard";
import Button from "@/components/common/Button";

const seedTasks = [
  { id: 1, task: "Prepare quote for Dawood Textiles", due: "Today", priority: "High", status: "Pending" },
  { id: 2, task: "Follow up with Saad Ahmed", due: "Tomorrow", priority: "Medium", status: "Contacted" },
  { id: 3, task: "Verify KYC for Nimra Clinic", due: "Friday", priority: "Low", status: "Active" },
];

export default function AgentTasksPage() {
  const [tasks, setTasks] = useState(seedTasks);

  const markDone = (id) => {
    setTasks((prev) => prev.map((item) => (item.id === id ? { ...item, status: "Completed" } : item)));
  };

  return (
    <DashboardLayout allowedRoles={[ROLES.AGENT]}>
      <div className="space-y-6">
        <PageHeader title="Tasks" description="Keep your day on track with clear priorities." actionLabel="Create Task" onAction={() => {}} />

        <DataTableCard
          title="Task Board"
          description="Prioritized by due date"
          columns={[
            { key: "task", label: "Task" },
            { key: "due", label: "Due" },
            { key: "priority", label: "Priority" },
            { key: "status", label: "Status", render: (value) => <StatusBadge status={value} /> },
            {
              key: "action",
              label: "Action",
              render: (_, row) => (
                <Button variant="outline" size="sm" disabled={row.status === "Completed"} onClick={() => markDone(row.id)}>
                  {row.status === "Completed" ? "Done" : "Mark Done"}
                </Button>
              ),
            },
          ]}
          rows={tasks}
        />
      </div>
    </DashboardLayout>
  );
}

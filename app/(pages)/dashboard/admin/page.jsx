"use client";

import { useMemo } from "react";
import DashboardLayout from "../DashboardLayout";
import { ROLES } from "@/lib/access-control";
import PageHeader from "@/components/dashboard/PageHeader";
import KpiCard from "@/components/dashboard/KpiCard";
import DataTableCard, { StatusBadge } from "@/components/dashboard/DataTableCard";

const approvals = [
  { id: 1, type: "Agent Onboarding", owner: "Ayesha Khan", submittedAt: "Today", status: "Pending" },
  { id: 2, type: "Company Verification", owner: "Rimsha Foods", submittedAt: "Yesterday", status: "Pending" },
  { id: 3, type: "Policy Exception", owner: "Nadeem Ali", submittedAt: "2 days ago", status: "Active" },
  { id: 4, type: "Claim Escalation", owner: "City Health", submittedAt: "2 days ago", status: "Overdue" },
];

export default function AdminDashboard() {
  const kpis = useMemo(
    () => [
      { title: "Total Users", value: "1,284", delta: "+6.8% from last month", tone: "success" },
      { title: "Pending Approvals", value: "18", delta: "Needs review in 24 hours", tone: "warning" },
      { title: "Open Tickets", value: "42", delta: "8 high priority", tone: "danger" },
      { title: "System Uptime", value: "99.98%", delta: "Healthy", tone: "success" },
    ],
    []
  );

  return (
    <DashboardLayout allowedRoles={[ROLES.ADMIN]}>
      <div className="space-y-6">
        <PageHeader
          title="Admin Dashboard"
          description="Monitor platform performance, team activity, and access requests."
          actionLabel="Export Report"
          onAction={() => {}}
        />

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((item) => (
            <KpiCard key={item.title} title={item.title} value={item.value} delta={item.delta} tone={item.tone} />
          ))}
        </section>

        <DataTableCard
          title="Approval Queue"
          description="Items that need admin action"
          columns={[
            { key: "type", label: "Request" },
            { key: "owner", label: "Owner" },
            { key: "submittedAt", label: "Submitted" },
            { key: "status", label: "Status", render: (value) => <StatusBadge status={value} /> },
          ]}
          rows={approvals}
        />
      </div>
    </DashboardLayout>
  );
}

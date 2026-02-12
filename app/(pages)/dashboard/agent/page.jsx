"use client";

import { useMemo } from "react";
import DashboardLayout from "../DashboardLayout";
import { ROLES } from "@/lib/access-control";
import PageHeader from "@/components/dashboard/PageHeader";
import KpiCard from "@/components/dashboard/KpiCard";
import DataTableCard, { StatusBadge } from "@/components/dashboard/DataTableCard";

const leadRows = [
  { id: 1, customer: "Saad Ahmed", product: "Health Plus", stage: "Contacted", eta: "Today" },
  { id: 2, customer: "Areeba Noor", product: "Auto Guard", stage: "Pending", eta: "Tomorrow" },
  { id: 3, customer: "Qasim Steel", product: "Corporate Shield", stage: "Active", eta: "Friday" },
];

export default function AgentDashboard() {
  const kpis = useMemo(
    () => [
      { title: "Assigned Leads", value: "32", delta: "+5 this week", tone: "success" },
      { title: "Tasks Due Today", value: "7", delta: "3 are high priority", tone: "warning" },
      { title: "Conversion Rate", value: "21.4%", delta: "+2.3%", tone: "success" },
      { title: "SLA Breaches", value: "1", delta: "Keep response under 4 hours", tone: "danger" },
    ],
    []
  );

  return (
    <DashboardLayout allowedRoles={[ROLES.AGENT]}>
      <div className="space-y-6">
        <PageHeader
          title="Agent Dashboard"
          description="Track your pipeline, priority tasks, and daily targets."
          actionLabel="Add Follow Up"
          onAction={() => {}}
        />

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((item) => (
            <KpiCard key={item.title} title={item.title} value={item.value} delta={item.delta} tone={item.tone} />
          ))}
        </section>

        <DataTableCard
          title="Today Pipeline"
          description="Leads requiring action"
          columns={[
            { key: "customer", label: "Customer" },
            { key: "product", label: "Product" },
            { key: "stage", label: "Stage", render: (value) => <StatusBadge status={value} /> },
            { key: "eta", label: "Next Follow Up" },
          ]}
          rows={leadRows}
        />
      </div>
    </DashboardLayout>
  );
}

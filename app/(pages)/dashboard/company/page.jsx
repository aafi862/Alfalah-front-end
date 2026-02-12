"use client";

import { useMemo } from "react";
import DashboardLayout from "../DashboardLayout";
import { ROLES } from "@/lib/access-control";
import PageHeader from "@/components/dashboard/PageHeader";
import KpiCard from "@/components/dashboard/KpiCard";
import DataTableCard, { StatusBadge } from "@/components/dashboard/DataTableCard";

const policyHealth = [
  { id: 1, segment: "Health", active: 124, utilization: "78%", status: "Active" },
  { id: 2, segment: "Life", active: 42, utilization: "64%", status: "Active" },
  { id: 3, segment: "Motor", active: 29, utilization: "89%", status: "Pending" },
  { id: 4, segment: "Travel", active: 16, utilization: "35%", status: "Paused" },
];

export default function CompanyDashboard() {
  const kpis = useMemo(
    () => [
      { title: "Total Employees", value: "215", delta: "+14 this quarter", tone: "success" },
      { title: "Active Policies", value: "211", delta: "4 pending activation", tone: "warning" },
      { title: "Open Claims", value: "13", delta: "2 require documents", tone: "warning" },
      { title: "Renewal Window", value: "27 days", delta: "Next cycle starts soon", tone: "neutral" },
    ],
    []
  );

  return (
    <DashboardLayout allowedRoles={[ROLES.COMPANY]}>
      <div className="space-y-6">
        <PageHeader
          title="Company Dashboard"
          description="Manage employee coverage, policy health, and claims visibility."
          actionLabel="Download Statement"
          onAction={() => {}}
        />

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((item) => (
            <KpiCard key={item.title} title={item.title} value={item.value} delta={item.delta} tone={item.tone} />
          ))}
        </section>

        <DataTableCard
          title="Portfolio Health"
          description="Coverage and utilization by policy type"
          columns={[
            { key: "segment", label: "Policy Type" },
            { key: "active", label: "Active Members" },
            { key: "utilization", label: "Utilization" },
            { key: "status", label: "Status", render: (value) => <StatusBadge status={value} /> },
          ]}
          rows={policyHealth}
        />
      </div>
    </DashboardLayout>
  );
}

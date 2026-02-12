"use client";

import { useMemo } from "react";
import DashboardLayout from "../DashboardLayout";
import { ROLES } from "@/lib/access-control";
import PageHeader from "@/components/dashboard/PageHeader";
import KpiCard from "@/components/dashboard/KpiCard";
import DataTableCard, { StatusBadge } from "@/components/dashboard/DataTableCard";

const userPolicies = [
  { id: 1, policy: "Health Essential", coverage: "PKR 500,000", renewal: "12 Sep 2026", status: "Active" },
  { id: 2, policy: "Car Protect", coverage: "PKR 1,200,000", renewal: "03 Dec 2026", status: "Active" },
  { id: 3, policy: "Travel Shield", coverage: "PKR 300,000", renewal: "21 May 2026", status: "Pending" },
];

export default function UserDashboard() {
  const kpis = useMemo(
    () => [
      { title: "Active Policies", value: "3", delta: "1 pending activation", tone: "warning" },
      { title: "Open Claims", value: "1", delta: "Awaiting documents", tone: "warning" },
      { title: "Premium Due", value: "PKR 12,400", delta: "Due in 5 days", tone: "danger" },
      { title: "Support Tickets", value: "0", delta: "All clear", tone: "success" },
    ],
    []
  );

  return (
    <DashboardLayout allowedRoles={[ROLES.USER]}>
      <div className="space-y-6">
        <PageHeader
          title="User Dashboard"
          description="Track your active coverage, premium schedule, and claim status."
          actionLabel="Submit Claim"
          onAction={() => {}}
        />

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((item) => (
            <KpiCard key={item.title} title={item.title} value={item.value} delta={item.delta} tone={item.tone} />
          ))}
        </section>

        <DataTableCard
          title="My Policies"
          description="Coverage summary and renewal timeline"
          columns={[
            { key: "policy", label: "Policy" },
            { key: "coverage", label: "Coverage" },
            { key: "renewal", label: "Renewal Date" },
            { key: "status", label: "Status", render: (value) => <StatusBadge status={value} /> },
          ]}
          rows={userPolicies}
        />
      </div>
    </DashboardLayout>
  );
}

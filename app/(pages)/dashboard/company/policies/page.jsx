"use client";

import { useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import { ROLES } from "@/lib/access-control";
import PageHeader from "@/components/dashboard/PageHeader";
import DataTableCard, { StatusBadge } from "@/components/dashboard/DataTableCard";
import Button from "@/components/common/Button";

const seedPolicies = [
  { id: 1, policy: "Health Plus", members: 124, renewal: "12 Sep 2026", status: "Active" },
  { id: 2, policy: "Life Care", members: 42, renewal: "02 Jan 2027", status: "Active" },
  { id: 3, policy: "Motor Shield", members: 29, renewal: "19 Aug 2026", status: "Paused" },
];

export default function CompanyPoliciesPage() {
  const [policies, setPolicies] = useState(seedPolicies);

  const togglePolicy = (id) => {
    setPolicies((prev) =>
      prev.map((policy) =>
        policy.id === id
          ? { ...policy, status: policy.status === "Active" ? "Paused" : "Active" }
          : policy
      )
    );
  };

  return (
    <DashboardLayout allowedRoles={[ROLES.COMPANY]}>
      <div className="space-y-6">
        <PageHeader title="Policies" description="Track policy status, members, and renewals." actionLabel="Create Policy" onAction={() => {}} />

        <DataTableCard
          title="Policy Portfolio"
          description="Coverage plans managed by your company"
          columns={[
            { key: "policy", label: "Policy" },
            { key: "members", label: "Members" },
            { key: "renewal", label: "Renewal Date" },
            { key: "status", label: "Status", render: (value) => <StatusBadge status={value} /> },
            {
              key: "action",
              label: "Action",
              render: (_, row) => (
                <Button variant="outline" size="sm" onClick={() => togglePolicy(row.id)}>
                  {row.status === "Active" ? "Pause" : "Activate"}
                </Button>
              ),
            },
          ]}
          rows={policies}
        />
      </div>
    </DashboardLayout>
  );
}

"use client";

import { useMemo, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import { ROLES } from "@/lib/access-control";
import PageHeader from "@/components/dashboard/PageHeader";
import DataTableCard, { StatusBadge } from "@/components/dashboard/DataTableCard";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";

const leads = [
  { id: 1, lead: "Dawood Textiles", segment: "Corporate", amount: "PKR 2.4M", status: "Pending" },
  { id: 2, lead: "Saad Ahmed", segment: "Retail", amount: "PKR 480K", status: "Contacted" },
  { id: 3, lead: "Nimra Clinic", segment: "SME", amount: "PKR 1.2M", status: "Active" },
  { id: 4, lead: "Naseem Traders", segment: "Corporate", amount: "PKR 900K", status: "Overdue" },
];

export default function AgentLeadsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(
    () =>
      leads.filter((item) => {
        const matchesSearch = item.lead.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = status === "all" || item.status.toLowerCase() === status;
        return matchesSearch && matchesStatus;
      }),
    [search, status]
  );

  return (
    <DashboardLayout allowedRoles={[ROLES.AGENT]}>
      <div className="space-y-6">
        <PageHeader title="Leads" description="Prioritize and track your lead funnel." actionLabel="Add Lead" onAction={() => {}} />

        <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2">
          <Input label="Search Leads" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Company or customer name" />
          <Select
            label="Status"
            value={status}
            onValueChange={setStatus}
            options={[
              { value: "all", label: "All Statuses" },
              { value: "pending", label: "Pending" },
              { value: "contacted", label: "Contacted" },
              { value: "active", label: "Active" },
              { value: "overdue", label: "Overdue" },
            ]}
          />
        </div>

        <DataTableCard
          title="Lead Pipeline"
          description={`${filtered.length} lead(s) in view`}
          columns={[
            { key: "lead", label: "Lead" },
            { key: "segment", label: "Segment" },
            { key: "amount", label: "Potential Value" },
            { key: "status", label: "Status", render: (value) => <StatusBadge status={value} /> },
          ]}
          rows={filtered}
        />
      </div>
    </DashboardLayout>
  );
}

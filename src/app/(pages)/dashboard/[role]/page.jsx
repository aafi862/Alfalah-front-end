"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "../DashboardLayout";
import ModuleWorkspace from "@/src/components/dashboard/ModuleWorkspace";
import AppBadge from "@/src/components/common/AppBadge";
import DataTable from "@/src/components/common/data-table";
import { getStatusVariant } from "@/src/lib/status-map";
import { MODULES, ROLE_LABELS, getRoleFromPathSegment } from "@/src/lib/access-control";

const kpis = [
  { title: "Total Items", value: "128", delta: "+8% vs last period", tone: "success" },
  { title: "Pending", value: "17", delta: "Needs attention", tone: "warning" },
  { title: "Completed", value: "94", delta: "On track", tone: "success" },
  { title: "Escalations", value: "4", delta: "SLA breaches", tone: "danger" },
];

const columns = [
  { id: "item", accessorKey: "item", header: "Item" },
  { id: "owner", accessorKey: "owner", header: "Owner" },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <AppBadge label={row.original.status} variant={getStatusVariant(row.original.status)} />,
  },
  {
    id: "actions",
    header: "Actions",
  },
];

const baseRows = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  item: `Task ${i + 1}`,
  owner: ["Operations", "QA", "Support", "DevOps"][i % 4] + " Team",
  status: ["Active", "Pending", "Overdue", "Completed"][i % 4],
}));

export default function RolePageClient() {
  const params = useParams();
  const roleParam = params?.role;
  const role = useMemo(() => getRoleFromPathSegment(roleParam || ""), [roleParam]);

  if (!role) {
    return <div className="p-6 text-red-500">Role not recognized.</div>;
  }

  return (
    <DashboardLayout allowedRoles={[role]}>
      <ModuleWorkspace
        role={role}
        module={MODULES.DASHBOARD}
        title={`${ROLE_LABELS[role] || "Role"} Overview`}
        description="Enterprise operations visibility and workflow metrics."
        actionLabel="Create"
        kpis={kpis}
      />
      <DataTable
        columns={columns}
        data={baseRows}
        enableEdit
        enableDelete
        enableAdd
        onEdit={(row) => alert("Edit " + row.item)}
        onDelete={(row) => alert("Delete " + row.item)}
        onAdd={(row) => alert("Add " + row.item)}
      />
    </DashboardLayout>
  );
}

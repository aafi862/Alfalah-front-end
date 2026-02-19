"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import ModuleWorkspace from "@/src/components/dashboard/ModuleWorkspace";
import AppBadge from "@/src/components/common/AppBadge";
import { getStatusVariant } from "@/src/lib/status-map";
import { MODULES, ROLE_LABELS, getRoleFromPathSegment } from "@/src/lib/access-control";
import DataTable from "@/src/components/common/data-table";

// KPIs
const kpis = [
  { title: "Total Items", value: "128", delta: "+8% vs last period", tone: "success" },
  { title: "Pending", value: "17", delta: "Needs attention", tone: "warning" },
  { title: "Completed", value: "94", delta: "On track", tone: "success" },
  { title: "Escalations", value: "4", delta: "SLA breaches", tone: "danger" },
];

// Rows
const rows = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  item: `Task ${i + 1}`,
  owner: ["Operations", "QA", "Support", "DevOps"][i % 4] + " Team",
  status: ["Active", "Pending", "Overdue", "Completed"][i % 4],
}));

// Columns
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

export default function RolePageClient() {
  const params = useParams();
  const [role, setRole] = useState(null);
  console.log("Params:", params);
  useEffect(() => {
    if (!params?.role) return;
    const mappedRole = getRoleFromPathSegment(params.role);
    if (!mappedRole) {
      setRole(null); // fallback for invalid role
      return;
    }
    setRole(mappedRole);
  }, [params]);

  // if (!role) return <div className="p-4 text-red-500">Role not found</div>;

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
        data={rows}
        enableEdit
        onEdit={(row) => alert("Edit " + row.item)}
        enableDelete={true}
        onDelete={(row) => alert("Delete " + row.item)}
        enableAdd={true}
        onAdd={(row) => alert("Add " + row.item)}
      />
    </DashboardLayout>
  );
}

"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "../../DashboardLayout";
import ModuleWorkspace from "@/src/components/dashboard/ModuleWorkspace";
import { getNavigationForRole, getRoleFromPathSegment } from "@/src/lib/access-control";
import DataTable from "@/src/components/common/data-table";

const kpis = [
  { title: "Total Items", value: "96", delta: "+5% vs last period", tone: "success" },
  { title: "Pending", value: "14", delta: "Needs attention", tone: "warning" },
  { title: "Completed", value: "76", delta: "Healthy throughput", tone: "success" },
  { title: "Escalations", value: "3", delta: "Close within SLA", tone: "danger" },
];

export default function ModulePage() {
  const params = useParams();

  const roleParam = params?.role;
  const moduleParam = params?.module;

  const role = getRoleFromPathSegment(roleParam);
  const nav = getNavigationForRole(role);
  const selected = nav.find((item) => item.href.endsWith(`/${moduleParam}`));

  const columns = useMemo(
    () => [
      { accessorKey: "item", header: "Item" },
      { accessorKey: "owner", header: "Owner" },
      { accessorKey: "status", header: "Status" }, // DataTable handles badges elsewhere
      { id: "actions", header: "Actions" },
    ],
    []
  );

  const rows = useMemo(() => {
    const label = selected?.label || "Work";
    return [
      { id: 1, item: `${label} Queue`, owner: "Operations Team", status: "Active" },
      { id: 2, item: `${label} Backlog`, owner: "Processing Team", status: "Pending" },
      { id: 3, item: `${label} Escalations`, owner: "Support Team", status: "Overdue" },
      { id: 4, item: `${label} Review`, owner: "QA Team", status: "Pending" },
      { id: 5, item: `${label} Audit`, owner: "Audit Team", status: "Completed" },
    ];
  }, [selected]);

  if (!role) {
    return <div className="p-6 text-red-500">Invalid role.</div>;
  }

  if (!selected) {
    return <div className="p-6 text-red-500">Module not found.</div>;
  }

  return (
    <DashboardLayout allowedRoles={[role]}>
      <ModuleWorkspace
        role={role}
        module={selected.module}
        title={selected.label}
        description="Role-based operations workspace with permission-aware actions."
        actionLabel="Create"
        kpis={kpis}
      />

      <DataTable
        columns={columns}
        data={rows}
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

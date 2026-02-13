import { notFound } from "next/navigation";
import DashboardLayout from "../../DashboardLayout";
import ModuleWorkspace from "@/components/dashboard/ModuleWorkspace";
import { getNavigationForRole, getRoleFromPathSegment } from "@/lib/access-control";

const kpis = [
  { title: "Total Items", value: "96", delta: "+5% vs last period", tone: "success" },
  { title: "Pending", value: "14", delta: "Needs attention", tone: "warning" },
  { title: "Completed", value: "76", delta: "Healthy throughput", tone: "success" },
  { title: "Escalations", value: "3", delta: "Close within SLA", tone: "danger" },
];

const columns = [
  { key: "item", label: "Item" },
  { key: "owner", label: "Owner" },
  { key: "status", label: "Status" },
];

export default async function ModulePage({ params }) {
  const { role: roleParam, module } = await params;
  const role = getRoleFromPathSegment(roleParam);
  if (!role) return notFound();

  const nav = getNavigationForRole(role);
  const selected = nav.find((item) => item.href.endsWith(`/${module}`));

  if (!selected) return notFound();

  const rows = [
    { id: 1, item: `${selected.label} Queue`, owner: "Operations Team", status: "Active" },
    { id: 2, item: `${selected.label} Backlog`, owner: "Processing Team", status: "Pending" },
    { id: 3, item: `${selected.label} Escalations`, owner: "Support Team", status: "Overdue" },
  ];

  return (
    <DashboardLayout allowedRoles={[role]}>
      <ModuleWorkspace
        role={role}
        module={selected.module}
        title={selected.label}
        description="Role-based operations workspace with permission-aware actions."
        actionLabel="Create"
        kpis={kpis}
        columns={columns}
        rows={rows}
      />
    </DashboardLayout>
  );
}

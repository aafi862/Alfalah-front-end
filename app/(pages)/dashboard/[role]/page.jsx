import { notFound } from "next/navigation";
import DashboardLayout from "../DashboardLayout";
import ModuleWorkspace from "@/components/dashboard/ModuleWorkspace";
import { MODULES, ROLE_LABELS, getRoleFromPathSegment } from "@/lib/access-control";

const kpis = [
  { title: "Total Items", value: "128", delta: "+8% vs last period", tone: "success" },
  { title: "Pending", value: "17", delta: "Needs attention", tone: "warning" },
  { title: "Completed", value: "94", delta: "On track", tone: "success" },
  { title: "Escalations", value: "4", delta: "SLA breaches", tone: "danger" },
];

const columns = [
  { key: "item", label: "Item" },
  { key: "owner", label: "Owner" },
  { key: "status", label: "Status" },
];

const rows = [
  { id: 1, item: "Operational Queue", owner: "Operations Team", status: "Active" },
  { id: 2, item: "Review Backlog", owner: "Processing Team", status: "Pending" },
  { id: 3, item: "SLA Escalations", owner: "Support Team", status: "Overdue" },
];

export default async function RolePage({ params }) {
  const { role: roleParam } = await params;
  const role = getRoleFromPathSegment(roleParam);
  if (!role) return notFound();

  return (
    <DashboardLayout allowedRoles={[role]}>
      <ModuleWorkspace
        role={role}
        module={MODULES.DASHBOARD}
        title={`${ROLE_LABELS[role] || "Role"} Overview`}
        description="Enterprise operations visibility and workflow metrics."
        actionLabel="Create"
        kpis={kpis}
        columns={columns}
        rows={rows}
      />
    </DashboardLayout>
  );
}

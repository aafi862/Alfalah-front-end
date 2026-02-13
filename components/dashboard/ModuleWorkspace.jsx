"use client";

import { useMemo } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import KpiCard from "@/components/dashboard/KpiCard";
import DataTableCard, { StatusBadge } from "@/components/dashboard/DataTableCard";
import Button from "@/components/common/Button";
import { ACTIONS, canAccess } from "@/lib/access-control";

const DEFAULT_COLUMNS = [
  { key: "item", label: "Item" },
  { key: "owner", label: "Owner" },
  { key: "status", label: "Status" },
];

export default function ModuleWorkspace({
  role,
  module,
  title,
  description,
  actionLabel = "Create",
  kpis = [],
  columns = [],
  rows = [],
}) {
  const writeAllowed = canAccess(role, module, ACTIONS.WRITE);

  const normalizedRows = useMemo(() => {
    const fallbackRows = [
      { id: 1, item: `${title} Queue`, owner: "Operations Team", status: "Active" },
      { id: 2, item: `${title} Backlog`, owner: "Processing Team", status: "Pending" },
      { id: 3, item: `${title} Escalations`, owner: "Support Team", status: "Overdue" },
    ];
    const baseRows = rows.length ? rows : fallbackRows;
    return baseRows.map((row) => ({ ...row }));
  }, [rows, title]);

  const tableColumns = useMemo(() => {
    const baseColumns = columns.length ? columns : DEFAULT_COLUMNS;
    if (!writeAllowed) return baseColumns;

    return [
      ...baseColumns,
      {
        key: "actions",
        label: "Actions",
        render: () => (
          <Button variant="outline" size="sm">
            Update
          </Button>
        ),
      },
    ];
  }, [columns, writeAllowed]);

  return (
    <div className="space-y-6">
      <PageHeader title={title} description={description} actionLabel={writeAllowed ? actionLabel : undefined} onAction={() => {}} />

      {kpis.length > 0 && (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((item) => (
            <KpiCard key={item.title} title={item.title} value={item.value} delta={item.delta} tone={item.tone} />
          ))}
        </section>
      )}

      <DataTableCard
        title={title}
        description={writeAllowed ? "Write access enabled" : "Read only access"}
        columns={tableColumns}
        rows={normalizedRows.map((row) => ({
          ...row,
          status: row.status ? <StatusBadge status={row.status} /> : row.status,
        }))}
      />
    </div>
  );
}

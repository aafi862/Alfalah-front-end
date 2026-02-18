"use client";

import { useMemo } from "react";
import PageHeader from "./PageHeader";
import KpiCard from "./KpiCard";
import DataTable from "@/src/components/common/data-table";
import { canAccess } from "@/src/lib/access-control";

export default function ModuleWorkspace({
  role,
  module,
  title,
  description,
  actionLabel = "Create",
  kpis = [],
  columns = [],
  rows = [],// callback for action button clicks
  onRowAction, // callback for action button clicks
}) {
  // Normalize rows if none provided
  const normalizedRows = useMemo(() => {
    const fallbackRows = [
      { id: 1, item: `${title} Queue`, owner: "Operations Team", status: "Active" },
      { id: 2, item: `${title} Backlog`, owner: "Processing Team", status: "Pending" },
      { id: 3, item: `${title} Escalations`, owner: "Support Team", status: "Overdue" },
    ];
    const baseRows = rows.length ? rows : fallbackRows;
    return baseRows.map((row) => ({ ...row }));
  }, [rows, title]);




  return (
    <div className="space-y-6">
      {/* {title && description && (
        <PageHeader
          title={title}
          description={description}
          actionLabel={actionLabel}
          onAction={() => { }}
        />
      )} */}

      {kpis.length > 0 && (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((item) => (
            <KpiCard
              key={item.title}
              title={item.title}
              value={item.value}
              delta={item.delta}
              tone={item.tone}
            />
          ))}
        </section>
      )}


    </div>
  );
}

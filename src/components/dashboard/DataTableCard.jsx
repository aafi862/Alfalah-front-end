"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { cn } from "@/src/lib/utils";

const statusStyles = {
  active: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  contacted: "bg-blue-50 text-blue-700",
  overdue: "bg-rose-50 text-rose-700",
  completed: "bg-slate-100 text-slate-700",
  paused: "bg-orange-50 text-orange-700",
};

export function StatusBadge({ status }) {
  const key = String(status || "").toLowerCase();
  const styles = statusStyles[key] || "bg-slate-100 text-slate-700";

  return <span className={cn("inline-flex rounded-full px-2 py-1 text-xs font-medium capitalize", styles)}>{status}</span>;
}

export default function DataTableCard({ title, description, columns, rows }) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-slate-900">{title}</CardTitle>
        {description && <p className="text-sm text-slate-500">{description}</p>}
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-separate border-spacing-y-2">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id || index} className="rounded-lg bg-slate-50">
                {columns.map((column) => {
                  const value = row[column.key];
                  return (
                    <td key={column.key} className="px-3 py-3 text-sm text-slate-700">
                      {column.render ? column.render(value, row) : value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

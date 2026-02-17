"use client";

import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { cn } from "@/src/lib/utils";

export default function KpiCard({ title, value, delta, tone = "neutral" }) {
  const toneStyles = {
    neutral: "text-slate-600",
    success: "text-emerald-600",
    warning: "text-amber-600",
    danger: "text-rose-600",
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-2">
        <p className="text-sm font-medium text-slate-500">{title}</p>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold text-slate-900">{value}</p>
        {delta && <p className={cn("mt-1 text-xs font-medium", toneStyles[tone] || toneStyles.neutral)}>{delta}</p>}
      </CardContent>
    </Card>
  );
}

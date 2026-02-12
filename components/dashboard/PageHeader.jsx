"use client";

import Button from "@/components/common/Button";

export default function PageHeader({ title, description, actionLabel, onAction }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {actionLabel && (
        <Button onClick={onAction} className="md:w-auto">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

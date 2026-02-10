"use client";

import { Checkbox } from "@/components/ui/checkbox";

export default function AppCheckbox({ label, ...props }) {
  return (
    <label className="flex items-center space-x-2 text-sm">
      <Checkbox {...props} />
      <span>{label}</span>
    </label>
  );
}

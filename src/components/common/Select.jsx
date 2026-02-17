"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

export default function AppSelect({ label, options = [], error, ...props }) {
  return (
    <div className="space-y-1 w-full">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Select {...props}>
        <SelectTrigger className={error ? "border-red-500" : ""}>
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

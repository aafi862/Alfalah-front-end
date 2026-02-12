"use client";

import { useMemo, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import { ROLES } from "@/lib/access-control";
import PageHeader from "@/components/dashboard/PageHeader";
import DataTableCard, { StatusBadge } from "@/components/dashboard/DataTableCard";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";

const employees = [
  { id: 1, name: "Areeba Noor", department: "Finance", policy: "Health Plus", status: "Active" },
  { id: 2, name: "Hamza Rehman", department: "Operations", policy: "Life Care", status: "Pending" },
  { id: 3, name: "Nadia Sami", department: "HR", policy: "Health Plus", status: "Active" },
  { id: 4, name: "Waleed Aslam", department: "Sales", policy: "Motor Shield", status: "Paused" },
];

export default function CompanyEmployeesPage() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");

  const filtered = useMemo(
    () =>
      employees.filter((employee) => {
        const matchesQuery = employee.name.toLowerCase().includes(query.toLowerCase());
        const matchesDepartment = department === "all" || employee.department === department;
        return matchesQuery && matchesDepartment;
      }),
    [department, query]
  );

  return (
    <DashboardLayout allowedRoles={[ROLES.COMPANY]}>
      <div className="space-y-6">
        <PageHeader title="Employees" description="Manage covered employees and policy assignment." actionLabel="Add Employee" onAction={() => {}} />

        <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2">
          <Input label="Search Employee" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Employee name" />
          <Select
            label="Department"
            value={department}
            onValueChange={setDepartment}
            options={[
              { value: "all", label: "All Departments" },
              { value: "Finance", label: "Finance" },
              { value: "Operations", label: "Operations" },
              { value: "HR", label: "HR" },
              { value: "Sales", label: "Sales" },
            ]}
          />
        </div>

        <DataTableCard
          title="Employee Directory"
          description={`${filtered.length} employee(s) displayed`}
          columns={[
            { key: "name", label: "Name" },
            { key: "department", label: "Department" },
            { key: "policy", label: "Assigned Policy" },
            { key: "status", label: "Status", render: (value) => <StatusBadge status={value} /> },
          ]}
          rows={filtered}
        />
      </div>
    </DashboardLayout>
  );
}

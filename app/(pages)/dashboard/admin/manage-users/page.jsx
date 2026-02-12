"use client";

import { useMemo, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import { ROLES } from "@/lib/access-control";
import PageHeader from "@/components/dashboard/PageHeader";
import DataTableCard, { StatusBadge } from "@/components/dashboard/DataTableCard";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Button from "@/components/common/Button";

const seedUsers = [
  { id: 1, name: "Ayesha Khan", email: "ayesha@admin.com", role: "admin", status: "Active" },
  { id: 2, name: "Mubashir Ali", email: "mubashir@agent.com", role: "agent", status: "Pending" },
  { id: 3, name: "Iqra Faisal", email: "iqra@company.com", role: "company", status: "Active" },
  { id: 4, name: "Sana Tariq", email: "sana@user.com", role: "user", status: "Paused" },
];

export default function ManageUsersPage() {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [users, setUsers] = useState(seedUsers);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesQuery =
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      return matchesQuery && matchesRole;
    });
  }, [query, roleFilter, users]);

  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id !== id) return user;
        return {
          ...user,
          status: user.status === "Active" ? "Paused" : "Active",
        };
      })
    );
  };

  return (
    <DashboardLayout allowedRoles={[ROLES.ADMIN]}>
      <div className="space-y-6">
        <PageHeader
          title="Manage Users"
          description="Filter and manage user access across all roles."
          actionLabel="Invite User"
          onAction={() => {}}
        />

        <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
          <Input label="Search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name or email" />
          <Select
            label="Role"
            value={roleFilter}
            onValueChange={setRoleFilter}
            options={[
              { value: "all", label: "All Roles" },
              { value: "admin", label: "Admin" },
              { value: "agent", label: "Agent" },
              { value: "company", label: "Company" },
              { value: "user", label: "User" },
            ]}
          />
          <div className="flex items-end">
            <Button variant="outline" className="w-full" onClick={() => { setQuery(""); setRoleFilter("all"); }}>
              Reset Filters
            </Button>
          </div>
        </div>

        <DataTableCard
          title="Users"
          description={`${filteredUsers.length} record(s) found`}
          columns={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "role", label: "Role" },
            { key: "status", label: "Status", render: (value) => <StatusBadge status={value} /> },
            {
              key: "actions",
              label: "Actions",
              render: (_, row) => (
                <Button variant="outline" size="sm" onClick={() => handleToggleStatus(row.id)}>
                  {row.status === "Active" ? "Pause" : "Activate"}
                </Button>
              ),
            },
          ]}
          rows={filteredUsers}
        />
      </div>
    </DashboardLayout>
  );
}

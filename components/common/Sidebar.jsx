"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import Button from "./Button";

const menus = {
    user: [
        { label: "Overview", href: "/dashboard/user" },
        { label: "Settings", href: "/dashboard/user/settings" },
    ],
    admin: [
        { label: "Dashboard", href: "/dashboard/admin" },
        { label: "Manage Users", href: "/dashboard/admin/manage-users" },
    ],
    company: [
        { label: "Policies", href: "/dashboard/company/policies" },
        { label: "Employees", href: "/dashboard/company/employees" },
    ],
    agent: [
        { label: "Leads", href: "/dashboard/agent/leads" },
        { label: "Tasks", href: "/dashboard/agent/tasks" },
    ],
};

export default function Sidebar({ role, onLogout }) {
    return (
        <aside className="w-64 bg-white border-r p-4 flex flex-col min-h-screen">
            <h2 className="text-lg font-semibold mb-6">Dashboard</h2>

            <ul className="flex-1 space-y-2">
                {(menus[role] || []).map((menu) => (
                    <li key={menu.href}>
                        <Link
                            href={menu.href}
                            className="block px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
                        >
                            {menu.label}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="mt-auto pt-4 border-t">
                <Button onClick={onLogout} className="w-full flex items-center justify-center gap-2">
                    <LogOut className="h-4 w-4" /> Logoutt
                </Button>
            </div>
        </aside>
    );
}

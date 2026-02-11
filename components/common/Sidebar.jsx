"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import Button from "@/components/common/Button";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/app/Redux-store/slices/authSlice";

export default function Sidebar({ role }) {

    const dispatch = useDispatch();

    const menus = {
        user: [
            { label: "Overview", href: "/dashboard/user" },
            { label: "Settings", href: "/dashboard/user/settings" },
        ],
        admin: [
            { label: "Dashboard", href: "/dashboard/admin" },
            { label: "Manage Users", href: "/dashboard/admin/manage-users" },
        ],
        agent: [
            { label: "Leads", href: "/dashboard/agent" },
            { label: "Tasks", href: "/dashboard/agent/tasks" },
        ],
        company: [
            { label: "Policies", href: "/dashboard/company" },
            { label: "Employees", href: "/dashboard/company/employees" },
        ],
    };

    const handleLogout = () => {
        // 1) Clear redux state
        dispatch(logout());


    };

    return (
        <aside className="w-64 bg-white dark:bg-gray-900 p-4 min-h-screen flex flex-col border-r">
            <div>
                <h2 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-100">
                    Dashboard
                </h2>

                <ul className="space-y-2">
                    {(menus[role] || []).map((menu) => (
                        <li key={menu.href}>
                            <Link
                                href={menu.href}
                                className={cn(
                                    "block px-3 py-2 rounded-md text-sm transition-colors",
                                    "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                                )}
                            >
                                {menu.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Logout button at bottom */}
            <div className="mt-auto pt-6 border-t">
                <Button
                    variant="destructive"
                    className="w-full flex text-white items-center gap-2 justify-center"
                    onClick={handleLogout}
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </div>
        </aside>
    );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Button from "./Button";
import { NAVIGATION_BY_ROLE } from "@/lib/access-control";

export default function Sidebar({ role, onLogout }) {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white border-r p-4 flex flex-col min-h-screen">
            <h2 className="text-lg font-semibold mb-6">Dashboard</h2>

            <ul className="flex-1 space-y-2">
                {(NAVIGATION_BY_ROLE[role] || []).map((menu) => (
                    <li key={menu.href}>
                        <Link
                            href={menu.href}
                            className={`block px-3 py-2 rounded-md text-gray-700 transition-colors ${pathname === menu.href ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
                                }`}
                        >
                            {menu.label}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="mt-auto pt-4 border-t">
                <Button onClick={onLogout} className="w-full flex items-center justify-center gap-2">
                    <LogOut className="h-4 w-4" /> Logout
                </Button>
            </div>
        </aside>
    );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, LogOut, PanelLeftClose, X } from "lucide-react";
import Button from "./Button";
import { NAVIGATION_BY_ROLE } from "@/lib/access-control";
import { cn } from "@/lib/utils";

export default function Sidebar({
  role,
  onLogout,
  userName,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) {
  const pathname = usePathname();
  const links = NAVIGATION_BY_ROLE[role] || [];

  return (
    <>
      {isMobileOpen && (
        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-30 bg-slate-950/40 md:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-slate-200 bg-white shadow-sm transition-all duration-300",
          isCollapsed ? "w-20" : "w-72",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">A</div>

          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">Alfalah Portal</p>
              <p className="truncate text-xs text-slate-500">{userName || "Dashboard User"}</p>
            </div>
          )}

          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100 md:hidden"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1.5">
            {links.map((menu) => {
              const isActive = pathname === menu.href;

              return (
                <li key={menu.href}>
                  <Link
                    href={menu.href}
                    title={isCollapsed ? menu.label : undefined}
                    onClick={onCloseMobile}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-semibold",
                        isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                      )}
                    >
                      {menu.label.charAt(0)}
                    </span>
                    {!isCollapsed && <span className="truncate">{menu.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t border-slate-200 p-3">
          <Button
            variant="outline"
            onClick={onLogout}
            className={cn("w-full justify-center gap-2", isCollapsed && "px-2")}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && "Logout"}
          </Button>
        </div>

        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute -right-3 top-24 hidden h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-100 md:flex"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>
    </>
  );
}

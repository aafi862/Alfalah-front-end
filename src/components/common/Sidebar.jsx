"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, LogOut, X } from "lucide-react";
import Button from "./Button";
import { ROLE_LABELS, getNavigationForRole } from "@/src/lib/access-control";
import { cn } from "@/src/lib/utils";

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
  const links = getNavigationForRole(role);

  return (
    <>
      {isMobileOpen && (
        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-30 bg-slate-950/45 md:hidden"
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
          <Image
            src="/branding/bank-alfalah-logo.webp"
            alt="Bank Alfalah"
            width={124}
            height={32}
            className={cn("h-8 w-auto", isCollapsed && "hidden")}
            priority
          />

          {isCollapsed && <div className="h-8 w-8 rounded-md bg-[#cf2027]" />}

          <button
            type="button"
            onClick={onCloseMobile}
            className="ml-auto rounded-md p-1 text-slate-500 hover:bg-slate-100 md:hidden"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        {!isCollapsed && (
          <div className="border-b border-slate-200 px-4 py-3">
            <p className="truncate text-sm font-semibold text-slate-900">{userName || "Alfalah User"}</p>
            <p className="text-xs text-slate-500">{ROLE_LABELS[role] || "User"}</p>
          </div>
        )}

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
                      isActive ? "bg-[#cf2027] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
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

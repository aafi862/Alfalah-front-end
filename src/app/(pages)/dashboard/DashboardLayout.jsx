"use client";

import { useSelector, useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/src/components/common/Sidebar";
import FullPageLoader from "@/src/components/common/Loader";
import Button from "@/src/components/common/Button";
import { logout } from "@/src/app/Redux-store/slices/authSlice";
import {
  ACTIONS,
  ROLE_LABELS,
  canAccess,
  getDashboardPathByRole,
  isValidRole,
  resolveRouteAccess,
} from "@/src/lib/access-control";
import { cn } from "@/src/lib/utils";

export default function DashboardLayout({ children, allowedRoles = [] }) {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { isAuthenticated, role, isHydrated, user } = auth;

  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isAllowedRole = useMemo(() => {
    if (!isAuthenticated) return false;
    if (!isValidRole(role)) return false;
    if (!allowedRoles.length) return true;
    return allowedRoles.includes(role);
  }, [isAuthenticated, role, allowedRoles]);

  const hasRouteAccess = useMemo(() => {
    const routePolicy = resolveRouteAccess(pathname);
    if (!routePolicy) return true;
    return canAccess(role, routePolicy.module, routePolicy.action || ACTIONS.READ);
  }, [pathname, role]);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated || !isValidRole(role)) {
      dispatch(logout());
      router.replace("/login");
      return;
    }

    if (!isAllowedRole || !hasRouteAccess) {
      router.replace(getDashboardPathByRole(role));
    }
  }, [dispatch, hasRouteAccess, isAuthenticated, isAllowedRole, isHydrated, role, router]);

  const handleLogout = () => {
    dispatch(logout());
    setMobileSidebarOpen(false);
    router.replace("/login");
  };

  if (!isHydrated || !isAuthenticated || !isAllowedRole || !hasRouteAccess) {
    return <FullPageLoader title="Checking access" subtitle="Redirecting..." />;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar
        role={role}
        userName={user?.name}
        onLogout={handleLogout}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className={cn("min-h-screen transition-[margin-left] duration-300", isSidebarCollapsed ? "md:ml-20" : "md:ml-72")}>
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:px-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-slate-500">Insurance Portal</p>
              <p className="text-sm font-semibold text-slate-800">Role: {ROLE_LABELS[role] || role}</p>
            </div>

            <Button
              variant="outline"
              onClick={() => setMobileSidebarOpen(true)}
              className="inline-flex items-center gap-2 md:hidden"
            >
              <Menu className="h-4 w-4" /> Menu
            </Button>
          </div>
        </header>

        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

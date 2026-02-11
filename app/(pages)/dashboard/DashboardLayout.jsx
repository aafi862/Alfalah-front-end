"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import Sidebar from "@/components/common/Sidebar";
import FullPageLoader from "@/components/common/Loader";
import { logout } from "@/app/Redux-store/slices/authSlice";
import { getDashboardPathByRole, isValidRole } from "@/lib/access-control";

export default function DashboardLayout({ children, allowedRoles = [] }) {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, role, isHydrated } = auth;

  const isAllowedRole = useMemo(() => {
    if (!isAuthenticated) return false;
    if (!isValidRole(role)) return false;
    if (!allowedRoles.length) return true;
    return allowedRoles.includes(role);
  }, [isAuthenticated, role, allowedRoles]);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated || !isValidRole(role)) {
      dispatch(logout());
      router.replace("/login");
      return;
    }

    if (!isAllowedRole) {
      router.replace(getDashboardPathByRole(role));
    }
  }, [dispatch, isAuthenticated, isAllowedRole, isHydrated, role, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  if (!isHydrated || !isAuthenticated || !isAllowedRole) {
    return <FullPageLoader title="Checking access" subtitle="Redirecting..." />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role={auth.role} onLogout={handleLogout} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

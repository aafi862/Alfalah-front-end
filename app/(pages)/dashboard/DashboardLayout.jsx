"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import Sidebar from "@/components/common/Sidebar";
import FullPageLoader from "@/components/common/Loader";
import { logout } from "@/app/Redux-store/slices/authSlice";

export default function DashboardLayout({ children, allowedRoles = [] }) {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const isAllowedRole = useMemo(() => {
    if (!auth.isAuthenticated) return false;
    if (!allowedRoles.length) return true;
    return allowedRoles.includes(auth.role);
  }, [auth.isAuthenticated, auth.role, allowedRoles]);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (!isAllowedRole) {
      router.replace(`/dashboard/${auth.role}`);
    }
  }, [auth.isAuthenticated, auth.role, isAllowedRole, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  if (!auth.isAuthenticated || !isAllowedRole) {
    return <FullPageLoader title="Checking access" subtitle="Redirecting..." />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role={auth.role} onLogout={handleLogout} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import FullPageLoader from "@/components/common/Loader";
import { logout } from "@/app/Redux-store/slices/authSlice";

export default function DashboardLayout({ children, allowedRoles = [] }) {
    const auth = useSelector((state) => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();

    // Instead of blinking, we render loader until auth is checked
    const [authChecked, setAuthChecked] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    // Check auth immediately
    useEffect(() => {
        // If localStorage is ready, we can check auth
        setAuthChecked(true);
    }, []);

    useEffect(() => {
        if (!authChecked) return;

        // If not authenticated → redirect to login
        if (!auth.isAuthenticated) {
            router.replace("/");
        }

        // If authenticated but role is not allowed → redirect to their dashboard
        if (auth.isAuthenticated && allowedRoles.length && !allowedRoles.includes(auth.role)) {
            router.replace(`/dashboard/${auth.role}`);
        }
    }, [auth, authChecked, allowedRoles, router]);

    const handleLogout = () => {
        dispatch(logout());
        router.replace("/");
    };

    // **Render loader until auth is checked or logging out**
    if (!authChecked || loggingOut) return <FullPageLoader />;

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar role={auth.role} onLogout={handleLogout} />
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}

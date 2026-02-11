"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import Sidebar from "@/components/common/Sidebar";

export default function DashboardLayout({ children }) {
    const auth = useSelector((state) => state.auth);
    const router = useRouter();
    const [checkingAuth, setCheckingAuth] = useState(true);
    console.log("auth guard page called")

    useEffect(() => {
        if (!auth.isAuthenticated) {
            router.replace("/");
        } else {
            setTimeout(() => {
                setCheckingAuth(false);
            }, 2000);
        }
    }, [auth.isAuthenticated, router]);

    if (checkingAuth) return <Loader />;

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar role={auth.role} />
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}

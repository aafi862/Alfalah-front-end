"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import Sidebar from "@/components/common/Sidebar";

export default function DashboardLayout({ children }) {
    const auth = useSelector((state) => state.auth);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    console.log("auth guard page called")
    // Auth guard
    useEffect(() => {
        if (!auth.isAuthenticated) {
            router.replace("/");

        } else {
            console.log("loading ture :")
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }
    }, [auth]);

    if (loading) return <Loader />;

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar role={auth.role} />
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}

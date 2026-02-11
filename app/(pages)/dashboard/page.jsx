"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";

export default function DashboardRoot() {
    const auth = useSelector((state) => state.auth);
    const router = useRouter();
    console.log("dashboard page called")
    useEffect(() => {
        if (!auth.isAuthenticated) {
            // Not logged in → redirect to login
            router.replace("/");
        } else {
            // Redirect based on role
            switch (auth.role) {
                case "user":
                    router.replace("/dashboard/user");
                    break;
                case "admin":
                    router.replace("/dashboard/admin");
                    break;
                case "company":
                    router.replace("/dashboard/company");
                    break;
                case "agent":
                    router.replace("/dashboard/agent");
                    break;
                default:
                    router.replace("/auth/login");
                    break;
            }
        }
    }, [auth, router]);

    // Show loader while redirecting
    return <Loader />;
}

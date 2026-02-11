"use client";

import Card from "@/components/common/Card";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import DashboardLayout from "../DashboardLayout";

export default function UserDashboard() {
    const auth = useSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!auth.isAuthenticated || auth.role !== "user") {
            router.replace(`/dashboard/${auth.role || "user"}`);
        }
    }, [auth, router]);


    return (
        <DashboardLayout allowedRoles={["user"]}>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">User Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <Card title="Profile" description="View and edit your profile">
                        <p>Name: John Doe</p>
                        <p>Email: john@user.com</p>
                    </Card>

                    <Card title="Active Policies" description="Your current insurance policies">
                        <ul className="list-disc pl-4">
                            <li>Health Insurance - Active</li>
                            <li>Car Insurance - Active</li>
                        </ul>
                    </Card>

                    <Card title="Notifications" description="Recent updates and alerts">
                        <ul className="list-disc pl-4">
                            <li>Policy renewal due in 5 days</li>
                            <li>New message from support</li>
                        </ul>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}

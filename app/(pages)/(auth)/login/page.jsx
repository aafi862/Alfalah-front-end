// app/(auth)/login/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setAuth } from "@/app/Redux-store/slices/authSlice"

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Loader from "@/components/common/Loader";

export default function LoginPage() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        if (!email || !password) {
            toast.error("Email and Password required");
            return;
        }

        setLoading(true);

        try {
            // Simulate API login
            await new Promise((res) => setTimeout(res, 1000));

            // Hardcoded role detection
            let role = "";
            if (email.endsWith("@user.com")) role = "user";
            else if (email.endsWith("@agent.com")) role = "agent";
            else if (email.endsWith("@company.com")) role = "company";
            else if (email.endsWith("@admin.com")) role = "admin";
            else throw new Error("Invalid role");

            // Fake token for now
            const accessToken = "fake-access-token";
            const refreshToken = "fake-refresh-token";

            // Save to Redux
            dispatch(setAuth({ user: { email }, accessToken, refreshToken, role }));

            toast.success("Login successful");

            // Redirect to role dashboard
            router.replace(`/dashboard/${role}`);
        } catch (err) {
            toast.error(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-950 dark:to-slate-900 p-4">
            {loading && <Loader />}
            <Card className="w-full max-w-md p-6 shadow-xl">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <div className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button className="w-full" onClick={handleLogin}>
                        Login
                    </Button>
                </div>
                <p className="text-sm text-center text-muted-foreground mt-4">
                    Use: <br />
                    @user.com → User <br />
                    @agent.com → Agent <br />
                    @company.com → Company <br />
                    @admin.com → Admin
                </p>
            </Card>
        </div>
    );
}

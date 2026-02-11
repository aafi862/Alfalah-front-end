"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { toast } from "sonner";
import { Lock, Mail } from "lucide-react";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "@/app/Redux-store/slices/authSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const auth = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Redirect if already logged in
    console.log("Login page called ", auth)

    useEffect(() => {
        if (auth.isAuthenticated) {
            router.replace(`/dashboard/${auth.role}`);
            return;
        }
    }, [auth.isAuthenticated, router])

    const handleLogin = async () => {
        if (!email || !password) return toast.error("Email & Password required");
        setLoading(true);

        try {
            const data = await fetch("/api/login", { method: "POST" }).then(() => {
                // using hardcoded service
                return {
                    user: { name: email.split("@")[0], email },
                    accessToken: "fake-access-token",
                    refreshToken: "fake-refresh-token",
                    role: email.includes("@admin.com") ? "admin" : email.includes("@company.com") ? "company" : "user",
                    isAuthenticated: true
                };
            });
            console.log("a pi data :", data)
            dispatch(setAuth(data));
            toast.success("Login successful");
            router.push(`/dashboard/${data.role}`);
        } catch (err) {
            toast.error("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-950 dark:to-slate-900">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                    <CardDescription>Login to your Alfalah Insurance account</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        prefix={<Mail className="h-4 w-4 text-muted-foreground" />}
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        prefix={<Lock className="h-4 w-4 text-muted-foreground" />}
                    />
                    <Button loading={loading} onClick={handleLogin} className="w-full">
                        Login
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { setAuth } from "@/app/Redux-store/slices/authSlice";
import { loginApi } from "@/app/services/authService";
import { toast } from "sonner";
import { Lock, Mail } from "lucide-react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useState } from "react";

export default function LoginPage() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        if (!email || !password) {
            toast.error("Email and password are required");
            return;
        }

        try {
            setLoading(true);
            const data = await loginApi({ email, password });
            dispatch(setAuth(data));
            toast.success("Login successful");
        } catch (err) {
            toast.error("Invalid credentials");
        } finally {
            setLoading(false);
        }
    }

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
                        prefix={<Mail className="h-4 w-4 text-muted-foreground" />}
                        placeholder="you@example.com"
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        prefix={<Lock className="h-4 w-4 text-muted-foreground" />}
                        placeholder="••••••••"
                    />

                    <Button loading={loading} onClick={handleLogin} className="w-full">
                        Login
                    </Button>

                    <p className="text-center text-sm text-muted-foreground cursor-pointer hover:underline">
                        Forgot password?
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

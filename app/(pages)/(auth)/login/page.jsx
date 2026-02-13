"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { toast } from "sonner";
import { Lock, Mail } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "@/app/Redux-store/slices/authSlice";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/app/Redux-store/services/authApi";
import FullPageLoader from "@/components/common/Loader";
import { getDashboardPathByRole, isValidRole } from "@/lib/access-control";

const getApiErrorMessage = (error) => {
  if (!error) return "Login failed";
  if (typeof error.data === "string") return error.data;
  if (error.data?.message) return error.data.message;
  if (error.error) return error.error;
  return "Unable to login. Please try again.";
};

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();
  const { isAuthenticated, role, isHydrated } = auth;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!isHydrated) return;
    if (isAuthenticated && isValidRole(role)) {
      router.replace(getDashboardPathByRole(role));
    }
  }, [isAuthenticated, isHydrated, role, router]);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email & Password required");
      return;
    }

    try {
      const data = await login({ email, password }).unwrap();
      dispatch(setAuth(data));
      toast.success("Login successful");
      router.push(getDashboardPathByRole(data.role));
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  if (!isHydrated) {
    return <FullPageLoader title="Initializing session" subtitle="Please wait..." />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center pb-2">
            <Image src="/branding/bank-alfalah-logo.webp" alt="Bank Alfalah" width={156} height={40} className="h-9 w-auto" priority />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Login to your Alfalah Insurance account</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            prefix={<Mail className="h-4 w-4 text-muted-foreground" />}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="********"
            prefix={<Lock className="h-4 w-4 text-muted-foreground" />}
          />
          <Button loading={isLoading} onClick={handleLogin} className="w-full">
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

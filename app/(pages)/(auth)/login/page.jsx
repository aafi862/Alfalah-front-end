"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { toast } from "sonner";
import { Lock, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "@/app/Redux-store/slices/authSlice";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/app/Redux-store/services/authApi";

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.replace(`/dashboard/${auth.role}`);
    }
  }, [auth.isAuthenticated, auth.role, router]);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email & Password required");
      return;
    }

    try {
      const data = await login({ email, password }).unwrap();
      dispatch(setAuth(data));
      toast.success("Login successful");
      router.push(`/dashboard/${data.role}`);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
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

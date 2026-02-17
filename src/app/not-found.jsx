"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-5xl font-bold tracking-tight">404</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-xl font-semibold">Page not found</p>
          <p className="text-sm text-muted-foreground">
            Sorry, the page you are looking for does not exist or has been moved.
          </p>
        </CardContent>

        <CardFooter className="flex justify-center gap-3">
          <Button asChild variant="default">
            <Link href="/">Go to Home</Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/dashboard">Go to Dashboard</Link>

          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

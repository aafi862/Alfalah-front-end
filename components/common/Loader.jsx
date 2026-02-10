"use client";

import { Loader2 } from "lucide-react";

export default function AppSpinner({ size = 24 }) {
  return <Loader2 className="animate-spin" style={{ width: size, height: size }} />;
}

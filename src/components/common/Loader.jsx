"use client";

import { LoaderIcon } from "lucide-react";

export default function FullPageLoader({
  title = "Loading",
  subtitle = "Please wait ...",
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="flex flex-col items-center gap-1 rounded-2xl  bg-card p-8 ">
        {/* Spinner */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full ">
          <LoaderIcon role="status"
            aria-label="Loading"
            className="size-10 animate-spin h-10 w-10 animate-spin text-primary" />
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-base font-semibold">{title}</p>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

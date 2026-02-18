"use client";

import { Button } from "@/src/components/ui/button";
import { Loader2 } from "lucide-react";
import clsx from "clsx";

export default function AppButton({
  children,
  variant = "default",
  size = "default",
  loading = false,
  fullWidth = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className,
  ...props
}) {
  return (
    <Button
      variant={variant}
      size={size}
      disabled={loading || props.disabled}
      aria-busy={loading}
      className={clsx(
        fullWidth && "w-full",
        loading || props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        "flex items-center justify-center gap-2", // ensures loader and icons aligned
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {!loading && LeftIcon && <LeftIcon className="h-4 w-4" />}
      {children}
      {RightIcon && <RightIcon className="h-4 w-4" />}
    </Button>
  );
}

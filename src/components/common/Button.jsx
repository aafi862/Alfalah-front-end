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
      className={clsx(fullWidth && "w-full", className)}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {LeftIcon && !loading && <LeftIcon className="mr-2 h-4 w-4" />}
      {children}
      {RightIcon && <RightIcon className="ml-2 h-4 w-4" />}
    </Button>
  );
}

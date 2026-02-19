"use client";

import { Input as ShadInput } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/lib/utils";
import { Label } from "@/src/components/ui/label";

export default function Input({
  label,
  error,
  type = "text",
  textarea = false,
  numericOnly = false,
  className,
  prefix,
  suffix,
  ...props
}) {
  const [show, setShow] = useState(false);
  const Comp = textarea ? Textarea : ShadInput;

  return (
    <div className={cn("space-y-1", className)}>
      {label && <Label className="text-sm font-medium mb-3">{label}</Label>}

      <div className="relative ">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{prefix}</span>}

        <Comp
          type={type === "password" ? (show ? "text" : "password") : type}
          className={cn(prefix && "pl-10", suffix && "pr-10")}
          onKeyDown={(e) => {
            if (numericOnly && !/[0-9]/.test(e.key) && e.key !== "Backspace") {
              e.preventDefault();
            }
          }}
          {...props}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

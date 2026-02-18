import { Badge } from "@/src/components/ui/badge"
import { cn } from "@/src/lib/utils"

const VARIANT_MAP = {
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-rose-100 text-rose-700",
    info: "bg-blue-100 text-blue-700",
    neutral: "bg-slate-100 text-slate-700",
}

export default function AppBadge({ label, variant = "neutral" }) {
    return (
        <Badge
            className={cn(
                "capitalize font-medium cursor-pointer hover:bg-opacity-80 transition-colors duration-200",
                VARIANT_MAP[variant] || VARIANT_MAP.neutral
            )}
        >
            {label}
        </Badge>
    )
}

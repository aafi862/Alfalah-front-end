export function getStatusVariant(status) {
    const value = String(status || "").toLowerCase()

    if (["active", "approved", "completed"].includes(value))
        return "success"

    if (["pending", "in review"].includes(value))
        return "warning"

    if (["rejected", "overdue", "cancelled"].includes(value))
        return "danger"

    if (["processing", "assigned"].includes(value))
        return "info"

    return "neutral"
}

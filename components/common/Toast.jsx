// app/components/common/useToast.js
"use client";

import { toast } from "sonner";

export function useToast() {
    return {
        success: (title, description) => toast.success(title, { description }),
        error: (title, description) => toast.error(title, { description }),
        info: (title, description) => toast(title, { description }),
        warning: (title, description) => toast.warning(title, { description }),
        loading: (title) => toast.loading(title),
    };
}

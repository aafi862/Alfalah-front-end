"use client";

import { Switch } from "@/components/ui/switch";

export default function AppSwitch({ label, ...props }) {
    return (
        <div className="flex items-center space-x-2">
            <Switch {...props} />
            {label && <span className="text-sm">{label}</span>}
        </div>
    );
}

"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AppCard({ title, description, children }) {
    return (
        <Card>
            {(title || description) && (
                <CardHeader>
                    {title && <h3 className="text-lg font-semibold">{title}</h3>}
                    {description && <p className="text-sm text-muted-foreground">{description}</p>}
                </CardHeader>
            )}
            <CardContent>{children}</CardContent>
        </Card>
    );
}

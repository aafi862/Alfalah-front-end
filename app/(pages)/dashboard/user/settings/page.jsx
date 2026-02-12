"use client";

import { useState } from "react";
import { toast } from "sonner";
import DashboardLayout from "../../DashboardLayout";
import { ROLES } from "@/lib/access-control";
import PageHeader from "@/components/dashboard/PageHeader";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import Switch from "@/components/common/Switch";

export default function UserSettingsPage() {
  const [form, setForm] = useState({
    name: "John Doe",
    phone: "03001234567",
    city: "Karachi",
    notifications: true,
  });

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    toast.success("Settings updated successfully");
  };

  return (
    <DashboardLayout allowedRoles={[ROLES.USER]}>
      <div className="space-y-6">
        <PageHeader title="User Settings" description="Update profile and communication preferences." actionLabel="Save Changes" onAction={handleSave} />

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input label="Full Name" value={form.name} onChange={(event) => setField("name", event.target.value)} />
            <Input label="Phone" numericOnly value={form.phone} onChange={(event) => setField("phone", event.target.value)} />
            <Input label="City" value={form.city} onChange={(event) => setField("city", event.target.value)} />
            <div className="flex items-end pb-2">
              <Switch
                checked={form.notifications}
                onCheckedChange={(value) => setField("notifications", value)}
                label="Enable email and SMS alerts"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave}>Update Profile</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

"use client";

import { ACTIONS, canAccess } from "@/lib/access-control";

export default function PermissionGate({ role, module, action = ACTIONS.READ, fallback = null, children }) {
  if (!canAccess(role, module, action)) {
    return fallback;
  }

  return children;
}

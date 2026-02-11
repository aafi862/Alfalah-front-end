export const ROLES = Object.freeze({
  ADMIN: "admin",
  AGENT: "agent",
  COMPANY: "company",
  USER: "user",
});

export const ROLE_DASHBOARD_PATH = Object.freeze({
  [ROLES.ADMIN]: "/dashboard/admin",
  [ROLES.AGENT]: "/dashboard/agent",
  [ROLES.COMPANY]: "/dashboard/company",
  [ROLES.USER]: "/dashboard/user",
});

export const NAVIGATION_BY_ROLE = Object.freeze({
  [ROLES.USER]: [
    { label: "Overview", href: "/dashboard/user" },
    { label: "Settings", href: "/dashboard/user/settings" },
  ],
  [ROLES.ADMIN]: [
    { label: "Dashboard", href: "/dashboard/admin" },
    { label: "Manage Users", href: "/dashboard/admin/manage-users" },
  ],
  [ROLES.COMPANY]: [
    { label: "Policies", href: "/dashboard/company/policies" },
    { label: "Employees", href: "/dashboard/company/employees" },
  ],
  [ROLES.AGENT]: [
    { label: "Leads", href: "/dashboard/agent/leads" },
    { label: "Tasks", href: "/dashboard/agent/tasks" },
  ],
});

export const isValidRole = (role) => Boolean(role && ROLE_DASHBOARD_PATH[role]);

export const getDashboardPathByRole = (role) => ROLE_DASHBOARD_PATH[role] || "/login";

export const getRoleFromEmail = (email = "") => {
  const normalized = email.trim().toLowerCase();
  if (normalized.endsWith("@admin.com")) return ROLES.ADMIN;
  if (normalized.endsWith("@agent.com")) return ROLES.AGENT;
  if (normalized.endsWith("@company.com")) return ROLES.COMPANY;
  if (normalized.endsWith("@user.com")) return ROLES.USER;
  return null;
};

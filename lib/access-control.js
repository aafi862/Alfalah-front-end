export const ACTIONS = Object.freeze({
  READ: "read",
  WRITE: "write",
});

export const ROLES = Object.freeze({
  CUSTOMER: "customer",
  USER: "user",
  AGENT: "agent",
  SURVEYOR: "surveyor",
  UNDERWRITING: "underwriting",
  ENDORSEMENT: "endorsement",
  COMPLIANCE: "compliance",
  FINANCE: "finance",
  COMPANY: "company",
  DEPARTMENT_HEAD: "department_head",
  ADMIN: "admin",
});

export const ROLE_LABELS = Object.freeze({
  [ROLES.CUSTOMER]: "Customer",
  [ROLES.USER]: "Customer (Legacy)",
  [ROLES.AGENT]: "Agent",
  [ROLES.SURVEYOR]: "Surveyor",
  [ROLES.UNDERWRITING]: "Underwriting",
  [ROLES.ENDORSEMENT]: "Endorsement",
  [ROLES.COMPLIANCE]: "Compliance",
  [ROLES.FINANCE]: "Finance",
  [ROLES.COMPANY]: "Finance (Legacy)",
  [ROLES.DEPARTMENT_HEAD]: "Department Head",
  [ROLES.ADMIN]: "Admin",
});

export const MODULES = Object.freeze({
  DASHBOARD: "dashboard",
  POLICY_INITIATION: "policy_initiation",
  CLAIMS: "claims",
  ENDORSEMENT_REQUESTS: "endorsement_requests",
  RENEWALS: "renewals",
  CAMPAIGNS: "campaigns",
  SALES: "sales",
  FOLLOW_UP: "follow_up",
  UPSELL: "upsell",
  SURVEY_TASKS: "survey_tasks",
  SURVEY_REPORTS: "survey_reports",
  PRODUCT_ENGINE: "product_engine",
  POLICY_ISSUANCE: "policy_issuance",
  APPROVALS: "approvals",
  POST_SALE_MODS: "post_sale_modifications",
  RISK_ASSESSMENT: "risk_assessment",
  REGULATORY_CHECKS: "regulatory_checks",
  VOUCHERS: "vouchers",
  PAYMENTS: "payments",
  REPORTING: "reporting",
  WORKFLOWS: "workflows",
  ROLE_MANAGEMENT: "role_management",
  USER_MANAGEMENT: "user_management",
  LOOKUPS: "lookups",
  ATTRIBUTE_STUDIO: "attribute_studio",
});

const rw = [ACTIONS.READ, ACTIONS.WRITE];
const ro = [ACTIONS.READ];

export const ROLE_PERMISSIONS = Object.freeze({
  [ROLES.CUSTOMER]: {
    [MODULES.DASHBOARD]: ro,
    [MODULES.POLICY_INITIATION]: rw,
    [MODULES.CLAIMS]: rw,
    [MODULES.ENDORSEMENT_REQUESTS]: rw,
    [MODULES.RENEWALS]: rw,
    [MODULES.CAMPAIGNS]: ro,
  },
  [ROLES.USER]: {
    [MODULES.DASHBOARD]: ro,
    [MODULES.POLICY_INITIATION]: rw,
    [MODULES.CLAIMS]: rw,
    [MODULES.ENDORSEMENT_REQUESTS]: rw,
    [MODULES.RENEWALS]: rw,
    [MODULES.CAMPAIGNS]: ro,
  },
  [ROLES.AGENT]: {
    [MODULES.DASHBOARD]: ro,
    [MODULES.SALES]: rw,
    [MODULES.ENDORSEMENT_REQUESTS]: rw,
    [MODULES.RENEWALS]: rw,
    [MODULES.FOLLOW_UP]: rw,
    [MODULES.UPSELL]: rw,
  },
  [ROLES.SURVEYOR]: {
    [MODULES.DASHBOARD]: ro,
    [MODULES.SURVEY_TASKS]: rw,
    [MODULES.SURVEY_REPORTS]: rw,
  },
  [ROLES.UNDERWRITING]: {
    [MODULES.DASHBOARD]: ro,
    [MODULES.PRODUCT_ENGINE]: rw,
    [MODULES.POLICY_ISSUANCE]: rw,
    [MODULES.APPROVALS]: rw,
  },
  [ROLES.ENDORSEMENT]: {
    [MODULES.DASHBOARD]: ro,
    [MODULES.POST_SALE_MODS]: rw,
    [MODULES.ENDORSEMENT_REQUESTS]: rw,
  },
  [ROLES.COMPLIANCE]: {
    [MODULES.DASHBOARD]: ro,
    [MODULES.RISK_ASSESSMENT]: rw,
    [MODULES.REGULATORY_CHECKS]: rw,
  },
  [ROLES.FINANCE]: {
    [MODULES.DASHBOARD]: ro,
    [MODULES.VOUCHERS]: rw,
    [MODULES.PAYMENTS]: rw,
    [MODULES.POST_SALE_MODS]: ro,
  },
  [ROLES.COMPANY]: {
    [MODULES.DASHBOARD]: ro,
    [MODULES.VOUCHERS]: rw,
    [MODULES.PAYMENTS]: rw,
    [MODULES.POST_SALE_MODS]: ro,
  },
  [ROLES.DEPARTMENT_HEAD]: {
    [MODULES.DASHBOARD]: ro,
    [MODULES.REPORTING]: ro,
    [MODULES.APPROVALS]: rw,
  },
  [ROLES.ADMIN]: {
    [MODULES.DASHBOARD]: ro,
    [MODULES.WORKFLOWS]: rw,
    [MODULES.ROLE_MANAGEMENT]: rw,
    [MODULES.USER_MANAGEMENT]: rw,
    [MODULES.LOOKUPS]: rw,
    [MODULES.ATTRIBUTE_STUDIO]: rw,
    [MODULES.REPORTING]: ro,
  },
});

const NAVIGATION_CATALOG = Object.freeze({
  [ROLES.CUSTOMER]: [
    { label: "Overview", href: "/dashboard/customer", module: MODULES.DASHBOARD },
    { label: "Policies", href: "/dashboard/customer/policies", module: MODULES.POLICY_INITIATION },
    { label: "Claims", href: "/dashboard/customer/claims", module: MODULES.CLAIMS },
    { label: "Renewals", href: "/dashboard/customer/renewals", module: MODULES.RENEWALS },
    { label: "Campaigns", href: "/dashboard/customer/campaigns", module: MODULES.CAMPAIGNS },
  ],
  [ROLES.USER]: [
    { label: "Overview", href: "/dashboard/user", module: MODULES.DASHBOARD },
    { label: "Settings", href: "/dashboard/user/settings", module: MODULES.DASHBOARD },
  ],
  [ROLES.AGENT]: [
    { label: "Overview", href: "/dashboard/agent", module: MODULES.DASHBOARD },
    { label: "Sales", href: "/dashboard/agent/sales", module: MODULES.SALES },
    { label: "Renewals", href: "/dashboard/agent/renewals", module: MODULES.RENEWALS },
    { label: "Follow Ups", href: "/dashboard/agent/follow-ups", module: MODULES.FOLLOW_UP },
    { label: "Upsell", href: "/dashboard/agent/upsell", module: MODULES.UPSELL },
  ],
  [ROLES.SURVEYOR]: [
    { label: "Overview", href: "/dashboard/surveyor", module: MODULES.DASHBOARD },
    { label: "Survey Tasks", href: "/dashboard/surveyor/tasks", module: MODULES.SURVEY_TASKS },
    { label: "Survey Reports", href: "/dashboard/surveyor/reports", module: MODULES.SURVEY_REPORTS },
  ],
  [ROLES.UNDERWRITING]: [
    { label: "Overview", href: "/dashboard/underwriting", module: MODULES.DASHBOARD },
    { label: "Product Engine", href: "/dashboard/underwriting/products", module: MODULES.PRODUCT_ENGINE },
    { label: "Issuance", href: "/dashboard/underwriting/issuance", module: MODULES.POLICY_ISSUANCE },
    { label: "Approvals", href: "/dashboard/underwriting/approvals", module: MODULES.APPROVALS },
  ],
  [ROLES.ENDORSEMENT]: [
    { label: "Overview", href: "/dashboard/endorsement", module: MODULES.DASHBOARD },
    { label: "Modifications", href: "/dashboard/endorsement/modifications", module: MODULES.POST_SALE_MODS },
    { label: "Requests", href: "/dashboard/endorsement/requests", module: MODULES.ENDORSEMENT_REQUESTS },
  ],
  [ROLES.COMPLIANCE]: [
    { label: "Overview", href: "/dashboard/compliance", module: MODULES.DASHBOARD },
    { label: "Risk", href: "/dashboard/compliance/risk", module: MODULES.RISK_ASSESSMENT },
    { label: "Regulatory", href: "/dashboard/compliance/regulatory", module: MODULES.REGULATORY_CHECKS },
  ],
  [ROLES.FINANCE]: [
    { label: "Overview", href: "/dashboard/finance", module: MODULES.DASHBOARD },
    { label: "Vouchers", href: "/dashboard/finance/vouchers", module: MODULES.VOUCHERS },
    { label: "Payments", href: "/dashboard/finance/payments", module: MODULES.PAYMENTS },
  ],
  [ROLES.COMPANY]: [
    { label: "Overview", href: "/dashboard/company", module: MODULES.DASHBOARD },
    { label: "Policies", href: "/dashboard/company/policies", module: MODULES.POST_SALE_MODS },
    { label: "Employees", href: "/dashboard/company/employees", module: MODULES.PAYMENTS },
  ],
  [ROLES.DEPARTMENT_HEAD]: [
    { label: "Overview", href: "/dashboard/department-head", module: MODULES.DASHBOARD },
    { label: "Reports", href: "/dashboard/department-head/reports", module: MODULES.REPORTING },
    { label: "Approvals", href: "/dashboard/department-head/approvals", module: MODULES.APPROVALS },
  ],
  [ROLES.ADMIN]: [
    { label: "Overview", href: "/dashboard/admin", module: MODULES.DASHBOARD },
    { label: "Workflows", href: "/dashboard/admin/workflows", module: MODULES.WORKFLOWS },
    { label: "Roles", href: "/dashboard/admin/roles", module: MODULES.ROLE_MANAGEMENT },
    { label: "Users", href: "/dashboard/admin/users", module: MODULES.USER_MANAGEMENT },
    { label: "Lookups", href: "/dashboard/admin/lookups", module: MODULES.LOOKUPS },
  ],
});

export const ROLE_DASHBOARD_PATH = Object.freeze(
  Object.fromEntries(Object.values(ROLES).map((role) => [role, `/dashboard/${role.replace("_", "-")}`]))
);

export const isValidRole = (role) => Boolean(role && ROLE_PERMISSIONS[role]);

export const normalizeRoleParam = (roleParam = "") => roleParam.replace(/-/g, "_");

export const canAccess = (role, module, action = ACTIONS.READ) => {
  if (!isValidRole(role)) return false;
  const allowedActions = ROLE_PERMISSIONS[role]?.[module] || [];
  return allowedActions.includes(action);
};

export const getDashboardPathByRole = (role) => ROLE_DASHBOARD_PATH[role] || "/login";

export const getRoleFromPathSegment = (segment = "") => {
  const normalized = normalizeRoleParam(segment);
  return isValidRole(normalized) ? normalized : null;
};

export const getNavigationForRole = (role) => {
  const catalog = NAVIGATION_CATALOG[role] || [];
  return catalog.filter((item) => canAccess(role, item.module, ACTIONS.READ));
};

export const resolveRouteAccess = (pathname = "") => {
  const routes = [
    ["/dashboard/customer/policies", MODULES.POLICY_INITIATION],
    ["/dashboard/customer/claims", MODULES.CLAIMS],
    ["/dashboard/customer/renewals", MODULES.RENEWALS],
    ["/dashboard/customer/campaigns", MODULES.CAMPAIGNS],
    ["/dashboard/user/settings", MODULES.DASHBOARD],
    ["/dashboard/agent/sales", MODULES.SALES],
    ["/dashboard/agent/renewals", MODULES.RENEWALS],
    ["/dashboard/agent/follow-ups", MODULES.FOLLOW_UP],
    ["/dashboard/agent/upsell", MODULES.UPSELL],
    ["/dashboard/surveyor/tasks", MODULES.SURVEY_TASKS],
    ["/dashboard/surveyor/reports", MODULES.SURVEY_REPORTS],
    ["/dashboard/underwriting/products", MODULES.PRODUCT_ENGINE],
    ["/dashboard/underwriting/issuance", MODULES.POLICY_ISSUANCE],
    ["/dashboard/underwriting/approvals", MODULES.APPROVALS],
    ["/dashboard/endorsement/modifications", MODULES.POST_SALE_MODS],
    ["/dashboard/endorsement/requests", MODULES.ENDORSEMENT_REQUESTS],
    ["/dashboard/compliance/risk", MODULES.RISK_ASSESSMENT],
    ["/dashboard/compliance/regulatory", MODULES.REGULATORY_CHECKS],
    ["/dashboard/finance/vouchers", MODULES.VOUCHERS],
    ["/dashboard/finance/payments", MODULES.PAYMENTS],
    ["/dashboard/company/policies", MODULES.POST_SALE_MODS],
    ["/dashboard/company/employees", MODULES.PAYMENTS],
    ["/dashboard/department-head/reports", MODULES.REPORTING],
    ["/dashboard/department-head/approvals", MODULES.APPROVALS],
    ["/dashboard/admin/workflows", MODULES.WORKFLOWS],
    ["/dashboard/admin/roles", MODULES.ROLE_MANAGEMENT],
    ["/dashboard/admin/users", MODULES.USER_MANAGEMENT],
    ["/dashboard/admin/lookups", MODULES.LOOKUPS],
    ["/dashboard/admin/manage-users", MODULES.USER_MANAGEMENT],
  ];

  const exact = routes.find(([route]) => pathname === route);
  if (exact) return { module: exact[1], action: ACTIONS.READ };

  if (pathname.startsWith("/dashboard/")) {
    return { module: MODULES.DASHBOARD, action: ACTIONS.READ };
  }

  return null;
};

export const getRoleFromEmail = (email = "") => {
  const normalized = email.trim().toLowerCase();
  if (normalized.endsWith("@customer.com") || normalized.endsWith("@user.com")) return ROLES.CUSTOMER;
  if (normalized.endsWith("@agent.com")) return ROLES.AGENT;
  if (normalized.endsWith("@surveyor.com")) return ROLES.SURVEYOR;
  if (normalized.endsWith("@underwriting.com")) return ROLES.UNDERWRITING;
  if (normalized.endsWith("@endorsement.com")) return ROLES.ENDORSEMENT;
  if (normalized.endsWith("@compliance.com")) return ROLES.COMPLIANCE;
  if (normalized.endsWith("@finance.com") || normalized.endsWith("@company.com")) return ROLES.FINANCE;
  if (normalized.endsWith("@head.com")) return ROLES.DEPARTMENT_HEAD;
  if (normalized.endsWith("@admin.com")) return ROLES.ADMIN;
  return null;
};

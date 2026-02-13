# Alfalah Front-End

Enterprise-ready Next.js portal for Alfalah Insurance with RBAC (role + module + action), RTK Query API layer, and permission-aware dashboards.

## Stack

- Next.js 16 App Router
- React 19
- Redux Toolkit + RTK Query
- Tailwind CSS + shadcn/ui primitives

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Use `.env`:

```bash
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_ENABLE_API_MOCK=true
```

- `NEXT_PUBLIC_ENABLE_API_MOCK=true` uses mock API responses.
- Set `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_ENABLE_API_MOCK=false` when backend is available.

## Mock Role Emails

Use any password with these domains:

- `@customer.com` -> Customer
- `@agent.com` -> Agent
- `@surveyor.com` -> Surveyor
- `@underwriting.com` -> Underwriting
- `@endorsement.com` -> Endorsement
- `@compliance.com` -> Compliance
- `@finance.com` -> Finance
- `@head.com` -> Department Head
- `@admin.com` -> Admin

Legacy support:

- `@user.com` -> Customer (legacy)
- `@company.com` -> Finance (legacy)

## RBAC Design

Defined in `lib/access-control.js`:

- `ROLES`
- `MODULES`
- `ACTIONS` (`read`, `write`)
- `ROLE_PERMISSIONS`
- `getNavigationForRole(role)`
- `resolveRouteAccess(pathname)`
- `canAccess(role, module, action)`

## API Architecture

- `app/Redux-store/services/baseApi.js`
  - Central RTK Query base API
  - Auth header injection
  - 401 refresh flow
  - Mock-first fallback
- `app/Redux-store/services/authApi.js`
  - Auth mutation (`login`)

## UI Notes

- Sidebar and auth pages use Bank Alfalah-inspired branding.
- Official logo asset integrated at `public/branding/bank-alfalah-logo.webp`.
- Dynamic role routes:
  - `/dashboard/[role]`
  - `/dashboard/[role]/[module]`

Static legacy dashboards are still available for backward compatibility.

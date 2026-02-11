# Alfalah Front-End

Next.js App Router project for Alfalah Insurance portal with role-based dashboards and Redux Toolkit + RTK Query.

## Stack

- Next.js 16 (App Router)
- React 19
- Redux Toolkit
- RTK Query
- Tailwind CSS + shadcn/ui primitives

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Create `.env` from `.env.example`:

```bash
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_ENABLE_API_MOCK=true
```

- Keep `NEXT_PUBLIC_ENABLE_API_MOCK=true` to use mocked API responses.
- Set `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_ENABLE_API_MOCK=false` when backend is ready.

## Auth Mock Accounts

Use any password with these email domains:

- `@admin.com` -> Admin dashboard
- `@company.com` -> Company dashboard
- `@agent.com` -> Agent dashboard
- `@user.com` -> User dashboard

Example: `john@admin.com`

## API Architecture

- `app/Redux-store/services/baseApi.js`
  - Central RTK Query `baseApi`
  - Auth header injection
  - 401 refresh token retry flow
  - Mock-first fallback for local development
- `app/Redux-store/services/authApi.js`
  - Auth endpoints (`login` mutation)

## Route Structure

- `/login`
- `/dashboard/admin`
- `/dashboard/admin/manage-users`
- `/dashboard/agent`
- `/dashboard/agent/leads`
- `/dashboard/agent/tasks`
- `/dashboard/company`
- `/dashboard/company/policies`
- `/dashboard/company/employees`
- `/dashboard/user`
- `/dashboard/user/settings`

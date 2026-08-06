# ARCHITECTURE.md — Mingalar Bangkok

> **Version:** 0.1.0  
> **Owner:** Siam On Cloud Co., Ltd.  
> **Last Updated:** 2025  
> **Status:** Early Development — Core infrastructure established; feature modules Planned

---

## Table of Contents

1. [Project Vision](#1-project-vision)
2. [High-Level Architecture](#2-high-level-architecture)
3. [Application Layers](#3-application-layers)
4. [Folder Responsibilities](#4-folder-responsibilities)
5. [Routing Architecture](#5-routing-architecture)
6. [Rendering Strategy](#6-rendering-strategy)
7. [Database Architecture](#7-database-architecture)
8. [Authentication Architecture](#8-authentication-architecture)
9. [Storage Architecture](#9-storage-architecture)
10. [AI Architecture](#10-ai-architecture)
11. [Email Architecture](#11-email-architecture)
12. [Payment Architecture](#12-payment-architecture)
13. [API Architecture](#13-api-architecture)
14. [State Management](#14-state-management)
15. [Security Architecture](#15-security-architecture)
16. [Environment Architecture](#16-environment-architecture)
17. [Performance Strategy](#17-performance-strategy)
18. [Scalability Strategy](#18-scalability-strategy)
19. [Development Workflow](#19-development-workflow)
20. [Technology Decisions](#20-technology-decisions)
21. [Future Architecture](#21-future-architecture)

---

## 1. Project Vision

### What Is Mingalar Bangkok?

**Mingalar Bangkok** (`မင်္ဂလာဘန်ကောက်`) is an **AI-First Super App** built as a comprehensive digital platform serving the Myanmar community in Thailand. The platform aggregates services essential to daily life — AI assistance, business discovery, employment, housing, community, visa & legal guidance, financial services, and travel — into a single, unified web application.

### Business Goal

- Become the primary digital destination for Myanmar nationals living, working, studying, and operating businesses in Thailand.
- Provide verified, localised information and services that are otherwise fragmented across disparate Thai-language sources.
- Enable Myanmar-owned businesses to reach a targeted community audience through a dedicated Business Directory.
- Create a sustainable SaaS revenue model through tiered membership plans (FREE → PLUS → PRO → BUSINESS).

### Technical Goal

- Deliver a **production-grade, type-safe full-stack web application** on Next.js App Router with no runtime type errors.
- Establish a **dual-identity data model** — Supabase Auth handles credentials and session lifecycle; Prisma + MySQL owns all application data — giving the team full control of the data layer while offloading auth infrastructure.
- Build a foundation where AI (OpenAI GPT-4.1) and transactional email (Resend) can be layered in as first-class features without architectural rework.
- Deploy to **Hostinger Cloud** (Node.js hosting + MySQL 8.x) as a cost-optimised, single-region production environment.

### Target Users

| Segment | Description |
|---|---|
| 👷 Labour | Myanmar workers in Thailand seeking jobs, housing, and essential services |
| 🎓 Students | Myanmar students enrolled in Thai educational institutions |
| ✈️ Tourists | Visitors from Myanmar requiring travel information and local guides |
| 🏪 Entrepreneurs | Myanmar business owners seeking marketing reach in Thailand |
| 🏢 Thai Businesses | Thai companies targeting Myanmar consumer and labour markets |
| 🤝 Organisations / NGOs | Institutions providing support and services to the Myanmar diaspora |

### Platform Scope

- **Web Application** (current): Next.js 16 + React 19, deployed on Hostinger Cloud.
- **Mobile App**: Not Implemented. Planned as a future expansion phase.
- **Admin Dashboard**: Not Implemented. Planned.

---

## 2. High-Level Architecture

### System Diagram

```text
┌─────────────────────────────────────────────────────┐
│                   Client (Browser)                  │
│         React 19 · Tailwind CSS v4 · Framer Motion  │
└───────────────────────┬─────────────────────────────┘
                        │ HTTP Request
                        ▼
┌─────────────────────────────────────────────────────┐
│          Next.js Middleware  (proxy.ts)              │
│  ┌──────────────────────────────────────────────┐   │
│  │ createServerClient (@supabase/ssr)            │   │
│  │ • Reads session from cookies                 │   │
│  │ • No session + protected route → /login      │   │
│  │ • Has session + /login or /register → /dash  │   │
│  └──────────────────────────────────────────────┘   │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│           Next.js 16 App Router                     │
│                                                     │
│   ┌──────────────┐  ┌──────────────┐               │
│   │   Server     │  │   Client     │               │
│   │  Components  │  │  Components  │               │
│   │  (RSC)       │  │  (RCC)       │               │
│   └──────┬───────┘  └──────┬───────┘               │
│          │                  │                       │
│   ┌──────▼──────────────────▼───────┐              │
│   │         API Routes (/api/*)     │              │
│   └──┬──────────┬──────────┬────────┘              │
└──────┼──────────┼──────────┼────────────────────────┘
       │          │          │
       ▼          ▼          ▼
┌──────────┐ ┌────────┐ ┌─────────┐
│  Prisma  │ │Supabase│ │ OpenAI  │   ← External Services
│   ORM    │ │  Auth  │ │ GPT-4.1 │     (Planned for AI)
└────┬─────┘ └────────┘ └─────────┘
     │
     ▼
┌──────────────────────┐    ┌───────────┐
│  MySQL 8.x           │    │  Resend   │
│  (Hostinger Cloud)   │    │  Email    │
│                      │    │  (Planned)│
│  · users             │    └───────────┘
│  · profiles          │
│  · memberships       │    ┌───────────────────┐
│  · user_preferences  │    │  Vercel Analytics  │
└──────────────────────┘    │  (Planned)         │
                            └───────────────────┘
```

### Request Lifecycle

```text
Browser
  │
  ├─[1]─▶ Middleware (proxy.ts)
  │           │
  │           ├── Read cookies → createServerClient
  │           ├── supabase.auth.getSession()
  │           ├── Public route?  YES → pass through
  │           └── Protected route? NO session → redirect /login
  │
  ├─[2]─▶ Next.js App Router
  │           │
  │           ├── Layout.tsx (Root Layout)
  │           ├── Page.tsx (Server Component by default)
  │           │       └── Direct Prisma queries in RSC
  │           │
  │           └── Client Components (use client)
  │                   └── React Hook Form + Zod validation
  │
  └─[3]─▶ API Routes (/api/*)
              │
              ├── Validate input (Zod)
              ├── Verify Supabase session (server-side)
              ├── Execute Prisma query → MySQL
              └── Return JSON response
```

---

## 3. Application Layers

### Layer Overview

```text
┌──────────────────────────────────────────────┐
│           PRESENTATION LAYER                  │
│  React 19 · Tailwind CSS v4 · Base UI         │
│  Framer Motion · Lucide React · Sonner        │
│  next-themes · React Hook Form                │
├──────────────────────────────────────────────┤
│           BUSINESS LAYER                      │
│  Next.js Server Components (RSC)              │
│  API Routes (/api/*)                          │
│  Zod Validation Schemas                       │
│  Supabase Auth Session Verification           │
├──────────────────────────────────────────────┤
│           DATA LAYER                          │
│  Prisma ORM 6.x                               │
│  MySQL 8.x (Hostinger)                        │
│  Models: User, Profile, Membership,           │
│          UserPreference                       │
├──────────────────────────────────────────────┤
│           INFRASTRUCTURE LAYER                │
│  Next.js Middleware (proxy.ts)                │
│  Environment Variables (.env.local)           │
│  TypeScript 5.7 strict mode                   │
│  Hostinger Cloud Node.js runtime              │
├──────────────────────────────────────────────┤
│           EXTERNAL SERVICES                   │
│  Supabase Auth (session, JWT, OAuth)          │
│  OpenAI GPT-4.1 [Planned]                     │
│  Resend (transactional email) [Planned]       │
│  Vercel Analytics [Planned — dep installed]   │
└──────────────────────────────────────────────┘
```

### Layer Responsibilities

| Layer | Responsibility |
|---|---|
| **Presentation** | Render UI, handle user interactions, form validation client-side, animations, theming |
| **Business** | Enforce access control, orchestrate service calls, validate inputs server-side |
| **Data** | Persist and query application data; enforce relational constraints and migrations |
| **Infrastructure** | Route protection, environment configuration, TypeScript type safety, server runtime |
| **External Services** | Auth identity, AI generation, email delivery, analytics |

---

## 4. Folder Responsibilities

The following folder structure is inferred from the confirmed project files. Directories not verified in source are marked accordingly.

```text
mingalar-bangkok/
│
├── app/                        ← Next.js App Router root
│   ├── (public)/               ← Route group: public pages (no auth required) [Inferred]
│   │   ├── page.tsx            ← Landing page (/)
│   │   ├── login/page.tsx      ← Login page (/login)
│   │   ├── register/page.tsx   ← Register page (/register)
│   │   ├── forgot-password/    ← Password reset request
│   │   └── reset-password/     ← Password reset completion
│   │
│   ├── (protected)/            ← Route group: authenticated pages [Inferred]
│   │   └── dashboard/          ← User dashboard (/dashboard)
│   │
│   ├── api/                    ← API Route handlers [Inferred — Planned]
│   │
│   ├── layout.tsx              ← Root layout (fonts, theme provider) [Inferred]
│   └── globals.css             ← Global styles, Tailwind CSS v4 base [Inferred]
│
├── components/                 ← Reusable UI components [Inferred]
│   ├── ui/                     ← Base UI primitives (Base UI + shadcn) [Inferred]
│   └── shared/                 ← Shared feature-agnostic components [Inferred]
│
├── lib/                        ← Core utilities and service clients
│   ├── generated/prisma/       ← Prisma Client (auto-generated, gitignored)
│   └── supabase/               ← Supabase client utilities [Inferred]
│
├── hooks/                      ← Custom React hooks [Inferred]
│
├── types/                      ← Shared TypeScript types and interfaces [Inferred]
│
├── prisma/
│   └── schema.prisma           ← Database schema (confirmed)
│
├── public/                     ← Static assets served at root [Inferred]
│
├── proxy.ts                    ← Next.js Middleware (confirmed — route protection)
├── package.json                ← Dependencies and npm scripts (confirmed)
├── tsconfig.json               ← TypeScript configuration (confirmed)
├── next-env.d.ts               ← Next.js auto-generated type reference (confirmed)
└── .env.example                ← Environment variable template (confirmed)
```

### Key Folder Notes

**`app/`** — The entire application lives under the App Router. All pages, layouts, loading states, and API routes are co-located here following Next.js 13+ conventions. Route groups (folders in parentheses) allow sharing layouts without affecting the URL path.

**`lib/generated/prisma/`** — Prisma Client is generated to a custom output path (`/lib/generated/prisma`) rather than the default `node_modules/.prisma/client`. This is a deliberate decision to make the generated client visible and importable under `@/lib/generated/prisma`. This directory is gitignored and must be regenerated on each deployment via `npx prisma generate`.

**`proxy.ts`** — Despite being named `proxy.ts`, this file is the **Next.js Middleware** file. It must be referenced in `middleware.ts` at the project root (or directly as `middleware.ts`) for Next.js to recognise it. It contains both the middleware function (`proxy`) and the `config.matcher` export.

**`prisma/schema.prisma`** — The single source of truth for the database schema. All model changes must go through this file followed by a migration.

---

## 5. Routing Architecture

### App Router Structure

Mingalar Bangkok uses **Next.js 16 App Router** exclusively. There is no Pages Router in this project.

### Public Routes (No Authentication Required)

Defined explicitly in `proxy.ts`:

```typescript
const PUBLIC_ROUTES = [
  "/",              // Landing page
  "/login",         // Login
  "/register",      // Registration
  "/forgot-password", // Password reset request
  "/reset-password",  // Password reset completion
];
```

The matcher logic supports both exact match and sub-path match:
```typescript
pathname === route || pathname.startsWith(`${route}/`)
```

### Protected Routes

All routes **not** in `PUBLIC_ROUTES` require an active Supabase session. Unauthenticated requests are redirected to `/login`.

### Known Confirmed Route Behaviour

| Route | Behaviour |
|---|---|
| `/` | Public landing page |
| `/login` | Public; redirects to `/dashboard` if already authenticated |
| `/register` | Public; redirects to `/dashboard` if already authenticated |
| `/forgot-password` | Public |
| `/reset-password` | Public |
| `/dashboard` | Protected (inferred from redirect target in middleware) |
| All others | Protected — require session |

### Middleware Matcher

```typescript
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

This matcher runs the middleware on **every route** except Next.js internal paths and static image/asset files. API routes under `/api/` are therefore also subject to session checking via the middleware.

### Layouts, Loading, and Error Handling

- **Root Layout**: Not Implemented in confirmed files. Inferred to exist at `app/layout.tsx` wrapping all pages.
- **Loading UI** (`loading.tsx`): Not confirmed in source.
- **Error Handling** (`error.tsx`): Not confirmed in source.
- **Not Found** (`not-found.tsx`): Not confirmed in source.
- **Parallel Routes / Intercepting Routes**: Not Implemented.

---

## 6. Rendering Strategy

### Rendering Model

| Pattern | Status | Notes |
|---|---|---|
| **Server Components (RSC)** | Implemented | Default for all `page.tsx` and non-interactive components; enables direct Prisma calls without an API layer |
| **Client Components (RCC)** | Implemented | Required for React Hook Form, Framer Motion animations, `useState`, event handlers; marked with `"use client"` |
| **Server Actions** | Not confirmed | Not found in source files |
| **SSR (per-request)** | Implemented | Default App Router behaviour; all dynamic pages render on the server per request |
| **SSG / ISR** | Not confirmed | No `generateStaticParams` or `revalidate` exports detected in confirmed source |
| **Streaming / Suspense** | Not confirmed | No `<Suspense>` boundaries confirmed in source |
| **Next.js Cache / Revalidation** | Not confirmed | No `fetch` cache options or `revalidatePath` confirmed |

### Image Optimisation

Next.js Image Optimisation is **disabled** (`images: { unoptimized: true }` in `next.config.mjs`). All images are served as-is without automatic resizing or format conversion. This is appropriate for Hostinger Cloud deployment where the Next.js image optimisation server is not guaranteed to be available.

### TypeScript at Build Time

`typescript: { ignoreBuildErrors: true }` is set in `next.config.mjs`. This means TypeScript errors do not block production builds. This is a temporary trade-off during early development and should be removed before the first public release.

---

## 7. Database Architecture

### Overview

```text
Application Code
     │
     ▼
Prisma Client 6.x
(generated at /lib/generated/prisma)
     │
     ▼
Prisma Query Engine
     │
     │ TCP/TLS  mysql://
     ▼
MySQL 8.x
(Hostinger Cloud — DATABASE_URL)
```

### Schema Configuration

```prisma
generator client {
  provider = "prisma-client-js"
  // output defaults to /lib/generated/prisma (set via prisma.config or schema comment)
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

The Prisma Client custom output path (`/lib/generated/prisma`) means:
- The client is **not** in `node_modules`.
- It **must** be gitignored (confirmed — present in `.gitignore`).
- It **must** be regenerated on every deployment before `npm run build`.

### Entity-Relationship Diagram

```text
┌──────────────────────────────────┐
│              users               │
│──────────────────────────────────│
│ id            UUID (PK)          │
│ supabaseId    VARCHAR UNIQUE      │  ←── Links to Supabase Auth identity
│ email         VARCHAR UNIQUE      │
│ emailVerified BOOLEAN             │
│ status        ENUM (UserStatus)   │
│ lastLoginAt   DATETIME?           │
│ createdAt     DATETIME            │
│ updatedAt     DATETIME            │
│ deletedAt     DATETIME?           │  ←── Soft Delete
└───────────┬──────────────────────┘
            │ 1
     ┌──────┼───────────────────────┐
     │      │                       │
     ▼ 1    ▼ 1                     ▼ 1
┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐
│   profiles   │  │ memberships  │  │  user_preferences    │
│──────────────│  │──────────────│  │──────────────────────│
│ id    UUID   │  │ id    UUID   │  │ id         UUID      │
│ userId FK    │  │ userId FK    │  │ userId     FK        │
│ displayName  │  │ plan   ENUM  │  │ language   ENUM      │
│ username     │  │ status ENUM  │  │ theme      ENUM      │
│ firstName    │  │ startedAt    │  │ currency   VARCHAR   │
│ lastName     │  │ expiresAt    │  │ emailNotif BOOLEAN   │
│ myanmarName  │  └──────────────┘  │ pushNotif  BOOLEAN   │
│ bio   TEXT   │                    │ marketingEmail BOOL  │
│ avatar       │                    └──────────────────────┘
│ coverImage   │
│ phone        │
│ country      │
│ province     │
│ city         │
│ language ENUM│
└──────────────┘
```

### Enum Definitions

| Enum | Values |
|---|---|
| `UserStatus` | `ACTIVE` · `INACTIVE` · `PENDING` · `SUSPENDED` |
| `MembershipPlan` | `FREE` · `PLUS` · `PRO` · `BUSINESS` |
| `MembershipStatus` | `ACTIVE` · `EXPIRED` · `CANCELLED` · `TRIAL` |
| `Language` | `EN` · `TH` · `MY` |
| `Theme` | `LIGHT` · `DARK` · `SYSTEM` |

### Relationship Rules

All child models (`Profile`, `Membership`, `UserPreference`) use `onDelete: Cascade` — deleting a `User` record automatically removes all associated records.

### Soft Delete Pattern

The `User` model includes `deletedAt DateTime?`. Records with a non-null `deletedAt` are considered logically deleted. **Application code must filter these out** with a `WHERE deletedAt IS NULL` clause. Prisma does not enforce this automatically — it must be added to every query or encapsulated in a service layer.

### Migration Workflow

```bash
# Development: create and apply migration
npx prisma migrate dev --name <descriptive-name>

# Production: apply pending migrations only (no schema drift)
npx prisma migrate deploy

# Regenerate client after schema changes
npx prisma generate

# Inspect DB via GUI
npx prisma studio

# DANGER: wipe and re-seed (development only)
npx prisma migrate reset
```

### Connection Strategy

Prisma connects to MySQL via the `DATABASE_URL` connection string. In a serverless or edge environment, connection pooling (PgBouncer / Prisma Accelerate) would be required. On Hostinger Cloud Node.js (long-running process), a single Prisma Client instance should be instantiated as a singleton to prevent connection exhaustion.

**Recommended singleton pattern (inferred best practice):**
```typescript
// lib/prisma.ts
import { PrismaClient } from "@/lib/generated/prisma";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

---

## 8. Authentication Architecture

### Overview

Authentication is handled exclusively by **Supabase Auth** via the `@supabase/ssr` package. This package is designed for server-side rendering environments and manages session state through **HTTP cookies** (not `localStorage`), making it compatible with Next.js Middleware.

### Dual-Identity Model

```text
Supabase Auth                       Prisma / MySQL
─────────────                       ──────────────
supabase_user.id  ──────────────▶  users.supabaseId (UNIQUE)
supabase_user.email ────────────▶  users.email      (UNIQUE)
```

Supabase Auth is the **authority for identity** (credentials, sessions, OAuth tokens, password resets). Prisma MySQL is the **authority for application data** (profiles, memberships, preferences). The two systems are linked by `supabaseId`.

### Session Flow

```text
User submits credentials
        │
        ▼
Supabase Auth (hosted service)
        │
        ▼
Issues JWT + sets HTTP-only session cookie
        │
        ▼
Next.js Middleware (proxy.ts)
        │
  createServerClient (@supabase/ssr)
        │
  reads cookies from NextRequest
        │
  supabase.auth.getSession()
        │
        ├── session present  → pass request through
        └── no session       → redirect /login
```

### Middleware Implementation

```typescript
// proxy.ts (confirmed source)
const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      getAll() {
        return request.cookies.getAll();   // read from incoming request
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);  // write to outgoing response
        });
      },
    },
  }
);
```

The `setAll` implementation ensures that **refreshed session tokens** are propagated back to the browser on every request, keeping sessions alive without requiring a separate refresh endpoint.

### Route Protection Matrix

| Route | Auth Required | Behaviour if Unauthenticated | Behaviour if Authenticated |
|---|---|---|---|
| `/` | No | Pass through | Pass through |
| `/login` | No | Pass through | Redirect `/dashboard` |
| `/register` | No | Pass through | Redirect `/dashboard` |
| `/forgot-password` | No | Pass through | Pass through |
| `/reset-password` | No | Pass through | Pass through |
| `/dashboard` (and all others) | **Yes** | Redirect `/login` | Pass through |

### Role-Based Access Control (RBAC)

Not Implemented at the middleware layer. The `UserStatus` enum (`ACTIVE`, `INACTIVE`, `PENDING`, `SUSPENDED`) provides the data foundation for status-based access control, but enforcement logic at the route or API layer is not confirmed in source. Planned.

### Supabase Auth Configuration (Required)

| Setting | Value |
|---|---|
| Site URL | `https://your-domain.com` (production) |
| Redirect URL | `http://localhost:3000/auth/callback` (development) |
| Auth Callback Route | `/auth/callback` (Planned — not confirmed in source) |

---

## 9. Storage Architecture

**Status: Not Implemented.**

`@supabase/supabase-js` is present in `dependencies`, which provides access to Supabase Storage. The `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables are also present, which are required for storage access.

However, no Supabase Storage bucket configuration, upload logic, or file management code has been confirmed in the source files provided.

### Planned Design (based on schema fields)

The `Profile` model contains:
- `avatar String?` — user profile photo URL
- `coverImage String?` — user profile cover/banner URL

These fields are designed to store URLs pointing to files hosted in Supabase Storage (or another CDN). The upload and URL-persistence flow is Planned.

```text
[Planned Flow]
Client → Upload file → Supabase Storage Bucket
                            │
                            └── Returns public URL
                                      │
                                      ▼
                            API Route → Prisma
                            UPDATE profiles SET avatar = <url>
```

---

## 10. AI Architecture

**Status: Planned (credentials configured, implementation not confirmed).**

### Environment

```env
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_MODEL=gpt-4.1
```

`OPENAI_MODEL` defaults to `gpt-4.1`. The model variable is externalised to allow model upgrades without code changes.

### Planned Design

Based on the README, the AI feature is described as an **AI Assistant** — a core feature of the Super App positioning. The infrastructure (API key, model choice) is in place. Implementation is Planned.

```text
[Planned Flow]
User Query (Client Component)
        │
        ▼
API Route: /api/ai/chat (Planned)
        │
        ├── Verify Supabase session
        ├── Check membership plan (rate limiting by tier)
        │
        ▼
OpenAI API (gpt-4.1)
        │
        ▼
Streamed response → Client
```

Key architectural decisions will be required for:
- Prompt engineering and system message design (Burmese/Thai/English multilingual)
- Context window management for multi-turn conversations
- Rate limiting by membership tier (FREE vs PLUS vs PRO vs BUSINESS)
- Streaming vs. batch response strategy

---

## 11. Email Architecture

**Status: Planned (credentials configured, implementation not confirmed).**

### Environment

```env
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM="Mingalar Bangkok <noreply@mingalarbangkok.com>"
```

`resend` is **not** in `package.json` dependencies. The API key and `EMAIL_FROM` are configured as environment variables, but the `resend` npm package must be installed before implementation can proceed.

### Planned Email Types

Based on the application's auth and membership model, the following transactional emails are anticipated:

| Email Type | Trigger | Status |
|---|---|---|
| Email Verification | User registers | Planned |
| Welcome Email | Email verified | Planned |
| Password Reset | Forgot password requested | Planned |
| Membership Confirmation | Plan upgraded | Planned |
| Membership Expiry Notice | `expiresAt` approaching | Planned |

### Planned Flow

```text
[Planned Flow]
Trigger Event (e.g. user registers)
        │
        ▼
API Route / Server Action
        │
        ▼
Resend API (POST /emails)
        │
        ├── From: noreply@mingalarbangkok.com
        ├── To: user.email
        ├── Template: React Email component (Planned)
        └── Language: based on user.preference.language (EN/TH/MY)
```

---

## 12. Payment Architecture

**Status: Not Implemented.**

No payment provider (`stripe`, `omise`, or other) is present in `package.json` dependencies. No payment-related environment variables appear in `.env.example`. The `MembershipPlan` and `MembershipStatus` enums in the database schema (`FREE`, `PLUS`, `PRO`, `BUSINESS` / `ACTIVE`, `EXPIRED`, `CANCELLED`, `TRIAL`) confirm that a paid membership system is planned, but the payment integration layer does not yet exist.

### Schema Readiness

The `Membership` model supports:
- Plan tiers: `FREE · PLUS · PRO · BUSINESS`
- Status lifecycle: `TRIAL → ACTIVE → EXPIRED / CANCELLED`
- Date tracking: `startedAt`, `expiresAt`

This schema is ready to receive payment provider data (e.g. Stripe `customerId`, `subscriptionId`) once payment integration is implemented.

---

## 13. API Architecture

### Status

API Routes (`/api/*`) are inferred from the architecture but no specific route files have been confirmed in the provided source. The structure below reflects the confirmed application design and intent.

### Route Conventions (Planned)

```text
/api/
  auth/
    callback/       ← Supabase OAuth callback handler (Planned)
  user/
    profile/        ← GET/PATCH user profile (Planned)
    preferences/    ← GET/PATCH user preferences (Planned)
  membership/       ← GET membership status (Planned)
  ai/
    chat/           ← POST AI assistant query (Planned)
```

### Request Validation (Confirmed — Zod in dependencies)

```typescript
// Confirmed pattern from package.json + README
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Server-side validation (API routes)
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const result = schema.safeParse(await request.json());
if (!result.success) {
  return Response.json({ error: result.error.flatten() }, { status: 400 });
}
```

### Standard Response Format (Recommended)

```typescript
// Success
{ data: T, error: null }

// Error
{ data: null, error: { message: string, code?: string } }
```

### Error Handling

Not confirmed in source. Standard Next.js API Route error handling (try/catch + `Response.json`) is the expected pattern.

---

## 14. State Management

### Confirmed Patterns

| State Type | Solution | Status |
|---|---|---|
| **Form State** | React Hook Form (`useForm`, `Controller`) | Confirmed — in dependencies |
| **Server State / Auth** | Supabase session in cookies (managed by `@supabase/ssr`) | Confirmed — in middleware |
| **UI State** | React `useState` / `useReducer` in Client Components | Standard Next.js pattern |
| **Theme** | `next-themes` (`ThemeProvider`) | Confirmed — in dependencies |
| **Toast / Notification** | `sonner` (`toast()`) | Confirmed — in dependencies |

### Not Used

- No Redux / Zustand / Jotai / Recoil detected in `package.json`.
- No global client-side state management library is present.
- No `localStorage` or `sessionStorage` usage confirmed (auth state is cookie-based).

### User Preferences Persistence

User preferences (`language`, `theme`, `currency`, notification settings) are persisted to the `user_preferences` table via Prisma. `next-themes` handles the client-side theme switching; the persisted `Theme` value from the database syncs the preference on page load.

---

## 15. Security Architecture

### Authentication Security

| Concern | Implementation |
|---|---|
| **Session storage** | HTTP-only cookies (managed by `@supabase/ssr`) — not accessible to JavaScript |
| **Session refresh** | Automatic via `setAll` cookies callback in Middleware on every request |
| **Service Role Key** | `SUPABASE_SERVICE_ROLE_KEY` — server-side only, never exposed to client. NEXT_PUBLIC_ prefix intentionally absent |
| **Anonymous Key** | `NEXT_PUBLIC_SUPABASE_ANON_KEY` — client-safe, constrained by Supabase Row Level Security |

### Route Security

The Middleware matcher pattern explicitly excludes static assets to prevent unnecessary auth checks:
```typescript
"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
```
API routes (`/api/*`) are included in the matcher — all API routes are subject to the session check.

### Input Validation

**Zod** schemas are the validation layer. All user-supplied input should pass through a Zod schema before reaching business logic or Prisma queries. This prevents:
- Malformed data reaching the database.
- Type coercion attacks.
- Missing required fields causing runtime errors.

### SQL Injection

Prisma ORM uses **parameterised queries exclusively**. Raw SQL is not used in confirmed source. Prisma's query engine prevents SQL injection by design.

### XSS

React's JSX escapes output by default. No `dangerouslySetInnerHTML` usage is confirmed. Tailwind CSS class-based styling eliminates inline style injection vectors.

### Environment Variable Security

| Variable | Exposure | Security |
|---|---|---|
| `DATABASE_URL` | Server-only | Never prefixed with `NEXT_PUBLIC_` |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only | Never prefixed with `NEXT_PUBLIC_`. Grants bypass of Row Level Security |
| `OPENAI_API_KEY` | Server-only | Never prefixed with `NEXT_PUBLIC_` |
| `RESEND_API_KEY` | Server-only | Never prefixed with `NEXT_PUBLIC_` |
| `NEXTAUTH_SECRET` | Server-only | Must be a long, random, unique string per environment |
| `NEXT_PUBLIC_SUPABASE_URL` | Client-safe | Public URL, safe to expose |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client-safe | Public key, constrained by Supabase RLS |
| `NEXT_PUBLIC_APP_URL` | Client-safe | Application base URL |
| `NEXT_PUBLIC_APP_NAME` | Client-safe | Display name |

### CSRF Protection

Supabase Auth uses cookie-based sessions with SameSite protections. Explicit CSRF token implementation is not confirmed in source.

### Rate Limiting

Not Implemented in confirmed source. Planned as a layer on AI API routes to enforce membership-tier usage limits.

### Soft Delete Security

`deletedAt`-based soft delete means user records are never physically removed from the database. All queries **must** include `WHERE deletedAt IS NULL` to avoid exposing logically deleted user data.

---

## 16. Environment Architecture

### Environment Files

| File | Purpose | Committed? |
|---|---|---|
| `.env.example` | Template with placeholder values | ✅ Yes — safe to commit |
| `.env.local` | Actual secrets (development) | ❌ No — gitignored |
| `.env.production` | Production secrets | ❌ Not confirmed in source |

### Complete Environment Variable Reference

```env
# ── Application ──────────────────────────────────────────
NODE_ENV=development                            # development | production
NEXT_PUBLIC_APP_NAME=Mingalar Bangkok           # Display name (client-safe)
NEXT_PUBLIC_APP_URL=http://localhost:3000       # Base URL (client-safe)

# ── Database (Hostinger MySQL 8.x) ───────────────────────
DATABASE_URL="mysql://username:password@host:3306/mingalar_bangkok"

# ── Supabase Authentication ───────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co   # Client-safe
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...               # Client-safe
SUPABASE_SERVICE_ROLE_KEY=eyJ...                   # SERVER ONLY — never expose

# ── OpenAI ───────────────────────────────────────────────
OPENAI_API_KEY=sk-...                          # SERVER ONLY
OPENAI_MODEL=gpt-4.1                           # Optional — defaults to gpt-4.1

# ── Resend Email ─────────────────────────────────────────
RESEND_API_KEY=re_...                          # SERVER ONLY
EMAIL_FROM="Mingalar Bangkok <noreply@mingalarbangkok.com>"

# ── Security ─────────────────────────────────────────────
NEXTAUTH_SECRET=<long-random-string>           # SERVER ONLY
NEXTAUTH_URL=http://localhost:3000             # Matches deployment URL
```

### Development vs. Production

| Aspect | Development | Production (Hostinger) |
|---|---|---|
| `NODE_ENV` | `development` | `production` |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | `https://mingalarbangkok.com` |
| `DATABASE_URL` | Local MySQL or Hostinger remote | Hostinger MySQL (same DB) |
| `NEXTAUTH_URL` | `http://localhost:3000` | Production domain |
| Supabase Redirect URL | `http://localhost:3000/auth/callback` | `https://domain.com/auth/callback` |
| TypeScript build errors | Ignored (current setting) | Should be enforced before GA |

### Hostinger Cloud Deployment Variables

All environment variables from `.env.example` must be set in the **Hostinger Cloud Panel → Environment Variables** section before deployment. There is no `.env.production` file committed to the repository.

---

## 17. Performance Strategy

### Image Optimisation

Next.js image optimisation is **disabled** (`unoptimized: true`). Images are served as static files. This is a current trade-off for Hostinger deployment compatibility.

**Impact**: No automatic WebP conversion, no responsive `srcset` generation. Avatar and cover images stored in Supabase Storage will benefit from Supabase's CDN for delivery performance once storage is implemented.

### Animation Performance

**Framer Motion 12.x** is used for UI animations. Framer Motion uses hardware-accelerated CSS transforms where possible. Animations must be defined in Client Components (`"use client"`).

### Bundle Optimisation

- **Tailwind CSS v4**: Generates only the CSS classes used in source — minimal CSS bundle.
- **`clsx` + `tailwind-merge`**: Conditional class composition without runtime overhead.
- **`class-variance-authority`**: Component variant generation at build time.
- **Lucide React 1.x**: Tree-shakeable icon library — only imported icons are bundled.
- **Dynamic Imports**: Not confirmed in source. Planned for heavy feature modules (AI chat, rich editors).

### Code Splitting

Next.js App Router performs **automatic code splitting** per route segment. Each `page.tsx` is a separate chunk. Client Components introduce additional JavaScript bundles.

### Database Performance

- **Prisma query optimisation**: All model IDs use `UUID` (`@default(uuid())`). UUID v4 is random, which can cause B-Tree index fragmentation in MySQL at scale. Mitigation with ordered UUIDs (ULID) or integer IDs is Planned.
- **Indexes**: Confirmed unique indexes on `users.supabaseId`, `users.email`, `profiles.userId`, `profiles.username`, `memberships.userId`, `user_preferences.userId`. Additional query indexes are Not Implemented.
- **Soft delete performance**: `WHERE deletedAt IS NULL` filters on an un-indexed nullable column will degrade at scale. A partial index on `deletedAt` should be added.

---

## 18. Scalability Strategy

### Current Architecture Constraints

The current architecture targets a **single-region, single-instance** deployment on Hostinger Cloud:
- One Node.js process running Next.js.
- One MySQL 8.x database on Hostinger.
- No load balancer or horizontal scaling layer.

This is appropriate for the early-stage launch with a focused community audience.

### Database Scaling Path

| Stage | Strategy |
|---|---|
| Current | Single Hostinger MySQL instance |
| Read Scale | MySQL read replicas (Hostinger or external) via Prisma `datasource` replica configuration |
| Connection Scale | Prisma Accelerate (connection pooling) if serverless/edge deployment is adopted |
| Data Scale | Database partitioning on large future tables (job listings, business directory) |

### Application Scaling Path

| Stage | Strategy |
|---|---|
| Current | Single Hostinger Node.js instance |
| Traffic Scale | Horizontal scaling (multiple Node.js instances behind a load balancer) |
| Global Scale | Migration to Vercel (edge network) or multi-region deployment |

### Storage Scaling

Supabase Storage scales independently of the application. No application-layer changes are required to handle storage growth. CDN delivery is included in Supabase Storage.

### AI Scaling

OpenAI API rate limits are the primary constraint. Per-user and per-plan rate limiting must be implemented at the API route layer before the AI assistant feature is launched publicly.

### Multi-language Scalability

The `Language` enum (`EN` · `TH` · `MY`) and the `currency` field in `UserPreference` provide the data foundation for a multilingual, multi-currency platform. Frontend internationalisation (i18n) via `next-intl` or similar is Not Implemented.

### Future Mobile App

Not Implemented. The API Routes layer (`/api/*`) is designed as a REST API that could serve a future React Native or Flutter mobile application with minimal backend changes.

### Microservices Readiness

The current architecture is a **monolith** (Next.js full-stack). The codebase is structured to allow extraction of services (AI, email, business directory) into separate microservices in the future, with the Next.js API Routes acting as a BFF (Backend for Frontend). This is Planned, not Implemented.

---

## 19. Development Workflow

### Confirmed NPM Scripts

From `package.json`:

```json
{
  "scripts": {
    "dev":   "next dev",
    "build": "next build",
    "start": "next start",
    "lint":  "eslint ."
  }
}
```

| Command | Purpose |
|---|---|
| `npm run dev` | Start local development server with Hot Module Replacement |
| `npm run build` | Compile and optimise for production |
| `npm start` | Start the production Next.js server (post-build) |
| `npm run lint` | Run ESLint across the project |

### Package Manager

**npm** is the confirmed package manager (`package-lock.json` present). yarn, pnpm, and bun are not used.

### TypeScript Configuration

`tsconfig.json` enforces:
- `strict: true` — no implicit any, strict null checks, strict function types
- `moduleResolution: "bundler"` — Vite/webpack-style imports (no `.js` extension required)
- `paths: { "@/*": ["./*"] }` — Root-relative imports via `@/` alias

### Commit Convention

Conventional Commits format is specified in the README:

```
feat: <description>       ← New feature
fix: <description>        ← Bug fix
docs: <description>       ← Documentation only
refactor: <description>   ← Refactoring without behaviour change
chore: <description>      ← Tooling, dependencies, config
```

### CI/CD

**Not Implemented.** No GitHub Actions workflows, no CI/CD pipeline files, and no Docker configuration have been confirmed in the provided source files. Deployment is manual via Hostinger Cloud Panel.

### GitHub Actions / Automated Testing

**Not Implemented.** No test runner (`jest`, `vitest`, `playwright`) is present in `package.json`. No `.github/workflows/` directory is confirmed.

---

## 20. Technology Decisions

### Next.js 16 (App Router)

**Why chosen**: App Router provides Server Components by default, enabling direct Prisma database calls within page components without a separate API layer for read operations. This reduces code volume and latency for data-fetching pages. The file-based routing system, built-in layout nesting, and Middleware API make it a complete full-stack framework.

**Trade-offs**: App Router has a steeper learning curve than the Pages Router. React Server Components require careful separation of server/client code. `"use client"` boundaries must be managed deliberately.

### MySQL 8.x (Hostinger)

**Why chosen**: Hostinger Cloud is the selected deployment environment, and MySQL is Hostinger's primary managed database offering. Running the database on the same hosting provider reduces latency and simplifies the infrastructure footprint.

**Trade-offs**: MySQL lacks some PostgreSQL features (e.g. native JSON operators, full-text search depth, array types). Prisma supports both equally well, so migration to PostgreSQL is possible if needed.

### Prisma ORM 6.x

**Why chosen**: Prisma provides a type-safe database client generated from the schema, eliminating an entire class of runtime database errors. The migration system, Prisma Studio GUI, and schema-as-code approach accelerate development. The custom output path (`/lib/generated/prisma`) keeps the generated client under TypeScript path aliases.

**Trade-offs**: Prisma Client bundle size is non-trivial. Generated client must be re-run on every deployment. N+1 query problems must be managed with `include` / `select` or `findMany` batching.

### Supabase Auth

**Why chosen**: Supabase Auth provides a complete, hosted authentication service including email/password, OAuth providers, JWT issuance, and session management. `@supabase/ssr` integrates cleanly with Next.js Middleware via cookie-based sessions. This removes the need to build and maintain a custom auth system.

**Trade-offs**: Application data lives in Prisma MySQL, not Supabase PostgreSQL. This creates a **dual-database reality** — Supabase holds auth identity; Prisma holds application data. The `supabaseId` foreign key on `User` is the bridge. Teams must maintain awareness of which system owns which data.

### Tailwind CSS v4

**Why chosen**: Tailwind CSS v4 introduces a CSS-first configuration model, eliminating `tailwind.config.js`. The `@tailwindcss/postcss` plugin enables direct PostCSS integration. JIT compilation produces minimal CSS bundles. The utility-first approach accelerates UI development.

**Trade-offs**: v4 is a major version with breaking changes from v3. Some community resources and shadcn/ui components assume v3 APIs.

### Base UI (`@base-ui/react`)

**Why chosen**: Base UI provides unstyled, accessible primitive components (Modal, Popover, Select, etc.) that can be styled entirely with Tailwind CSS. This avoids the style conflicts common with pre-styled component libraries.

**Trade-offs**: Less out-of-the-box visual design compared to Chakra UI or Material UI. More manual styling work required.

### OpenAI (GPT-4.1)

**Why chosen**: GPT-4.1 is the specified model in the environment template. OpenAI provides the most capable multilingual models available, which is critical for a platform serving users in Burmese, Thai, and English.

**Trade-offs**: API cost scales with usage. Rate limits require tier-based access control. Latency on complex prompts can be noticeable without streaming.

### Resend

**Why chosen**: Resend is a developer-first transactional email API with React Email template support. It provides high deliverability, a clean API, and is straightforward to integrate in a Next.js environment.

**Trade-offs**: The npm package is not yet installed (only the API key is configured). Integration is Planned.

### Hostinger Cloud

**Why chosen**: Cost-effective hosting with included MySQL database, suitable for the initial launch phase targeting a community audience. No Vercel/AWS overhead at early scale.

**Trade-offs**: Not a serverless environment. Scaling requires manual intervention. No built-in CDN for application assets (relies on Next.js static export or Supabase CDN for media). CI/CD integration is more manual than Vercel.

### Vercel Analytics

**Why chosen**: `@vercel/analytics` is present in dependencies, indicating Vercel Analytics is planned or available. It provides zero-configuration page view and Web Vitals tracking.

**Trade-offs**: The `@vercel/analytics` package is designed primarily for Vercel-hosted deployments. On Hostinger, it may require the `inject` function to be called manually. Full Web Vitals reporting may not function as expected outside Vercel infrastructure.

---

## 21. Future Architecture

The following planned features are evidenced by the README and confirmed environment configuration. Nothing in this section has been invented.

### Business Directory

Referenced explicitly in README as a planned feature. Will require new Prisma models (Business, Category, BusinessImage, Review) and associated API routes. No schema models exist yet.

### Job Board

Referenced in README as planned. Will require Job, JobApplication, and Employer models.

### Housing Listings

Referenced in README as planned. Will require Listing, ListingImage, and Location models.

### Community Forum

Referenced in README as planned. Will require Post, Comment, and Category models.

### Visa & Legal Services

Referenced in README as planned. Content or directory model.

### Money / Financial Services

Referenced in README as planned. Scope undefined.

### Travel Services

Referenced in README as planned. Scope undefined.

### AI Assistant (OpenAI)

Environment variables are configured (`OPENAI_API_KEY`, `OPENAI_MODEL=gpt-4.1`). Implementation Planned. Core infrastructure ready.

### Email Notifications (Resend)

Environment variables are configured (`RESEND_API_KEY`, `EMAIL_FROM`). `resend` npm package not yet installed. Implementation Planned.

### Vercel Analytics

`@vercel/analytics@1.6.1` is in `dependencies`. Implementation (adding `<Analytics />` component to Root Layout) is Planned.

### Mobile App

Referenced in README target user context. No technical foundation exists yet. Planned as a future phase.

### Admin Dashboard

No evidence in source. Not mentioned in README. Not Planned based on available evidence.

---

## Appendix: Architecture Decision Log

| Decision | Choice | Rationale |
|---|---|---|
| ORM | Prisma 6.x | Type-safe queries, migration system, Prisma Studio |
| Auth Provider | Supabase Auth | Hosted, SSR-compatible via `@supabase/ssr`, reduces auth complexity |
| Database | MySQL 8.x | Hostinger Cloud native offering; reduces infrastructure complexity |
| Prisma Client Output | `/lib/generated/prisma` | Enables `@/` path alias imports; makes generated code explicit |
| Session Strategy | HTTP-only cookies | XSS-safe; compatible with Next.js Middleware |
| Form Validation | React Hook Form + Zod | Type-safe schema-driven validation; minimal re-renders |
| CSS Framework | Tailwind CSS v4 | CSS-first config; JIT; minimal bundle |
| UI Primitives | Base UI | Headless, accessible, fully styleable with Tailwind |
| Image Optimisation | Disabled | Hostinger Cloud compatibility; Supabase CDN handles media |
| Build TypeScript Errors | Ignored (temporary) | Accelerates early development; must be removed pre-GA |
| Package Manager | npm | Standard; `package-lock.json` confirmed |
| Deployment | Hostinger Cloud | Cost-effective for community-scale launch |

---

<div align="center">

**ARCHITECTURE.md** — Mingalar Bangkok  
Built for the Myanmar Community in Thailand  
© 2025 Siam On Cloud Co., Ltd. · All rights reserved  
*Document generated from confirmed source files only. Sections marked "Planned" or "Not Implemented" reflect the project's actual state.*

</div>

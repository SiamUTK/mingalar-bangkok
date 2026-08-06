# 📋 Mingalar Bangkok — Complete Project Engineering Assessment Report

**Assessed by:** Principal Software Architect / Staff Engineer Review Panel  
**Date:** August 6, 2026  
**Project Version:** 0.1.0  
**Assessment Scope:** Full-stack codebase, documentation, schema, API contracts, ESLint report, config files  

---

## 1. What Has Already Been Implemented Well

The project demonstrates a disciplined architectural foundation for an early-stage product. The following areas are genuinely strong:

**Architecture & Toolchain**
The technology selection is coherent and defensible. Next.js 16 App Router, TypeScript 5.7 strict mode, Prisma 6.x ORM, Supabase Auth with `@supabase/ssr`, and Tailwind CSS v4 form a modern, well-integrated stack. The decision to use cookie-based sessions through Middleware rather than localStorage-based auth is the correct security approach for an SSR application.

**Middleware Route Guard (`proxy.ts`)**
The middleware is clean, minimal, and correct. Session validation through `createServerClient`, public/protected route discrimination, and redirect logic on both unauthenticated access and already-authenticated users attempting `/login` are all implemented properly.

**Database Schema**
The four-table user-centric schema (`users`, `profiles`, `memberships`, `user_preferences`) is well-normalized for the current scope. Soft delete via `deletedAt`, cascade-on-delete relationships, UUID primary keys, and careful use of unique constraints are all best practices followed correctly. The dual-identity bridge (`supabaseId`) between Supabase Auth and MySQL is an architectural decision made cleanly.

**Documentation Culture**
The project has an unusually comprehensive documentation suite for its stage — `ARCHITECTURE.md`, `DATABASE.md`, `PROJECT_RULES.md`, `API_DOCUMENTATION.md`, and `TODO.md` together form a self-consistent reference. The `PROJECT_RULES.md` is enterprise-grade, clearly defining allowed technologies, naming conventions, and AI coding rules. This is a significant asset.

**UI Component Organization**
The component folder structure (`ai-assistant/`, `business-detail/`, `directory/`, `foundation/`, `navigation/`, `search/`, `sections/`, `ui-kit/`) shows deliberate domain-driven decomposition. The `ui-kit/` folder covering empty states, error banners, skeletons, alerts, and toasts demonstrates that the developer is thinking about UI completeness beyond just happy-path screens.

**Response Envelope Standardization**
The API contract defines a consistent JSON envelope (`{ success, data, message }` / `{ success, error: { code, message, details } }`) and applies it across all documented endpoints. This is an enterprise pattern executed early and correctly.

---

## 2. What Features Are Missing

The following product features described in the architecture vision have zero implementation:

- **AI Chat (`/api/ai/chat`)** — The `ChatWindow` component exists in the component tree but the OpenAI API integration is entirely absent. There is no streaming, no prompt engineering, no context management, and no conversation history.
- **Transactional Email** — The Resend SDK is not installed. No email verification, welcome email, password reset email, or notification email flows exist anywhere.
- **Business Directory** — Extensively referenced in the README and vision. No Prisma model, no API routes, no real data layer. The directory UI components (`components/directory/`) appear to be built with hardcoded mock data only.
- **Job Board** — No schema, no API, no real data. The `latest-jobs.tsx` section component exists on the homepage but feeds only mock data.
- **Housing Listings** — No schema, no API, no real data.
- **Community Events** — Referenced in the saved-items page (`saved/page.tsx`) with mock data but no backend at all.
- **Visa & Legal Services** — UI navigation links exist but no content, data model, or API.
- **Money / Financial Services** — Exists in nav links only.
- **Travel Services** — Exists in nav links only.
- **User Avatar / File Upload** — The `avatar` field exists in the Profile model, but no Supabase Storage integration is implemented. There is no file upload flow anywhere.
- **Search** — A `components/search/` directory with a full set of UI components exists, but there is no backend search API, no Prisma full-text query, and no search results data source.
- **Membership / Subscription Gating** — The `memberships` table and `MembershipPlan` enum exist, but no feature is gated by plan, no upgrade flow exists, and no payment provider is connected.
- **Notifications System** — Referenced in `user_preferences` (`emailNotification`, `pushNotification`) but nothing dispatches notifications.
- **Admin Dashboard** — Completely absent. No route, no model, no access control beyond normal user auth.

---

## 3. What Important Business Modules Are Still Missing

Beyond individual features, entire business domains are unbuilt:

| Domain | Status | Risk |
|---|---|---|
| Business Directory (core revenue) | UI mock only | Critical |
| Job Board | UI mock only | Critical |
| Housing Listings | UI mock only | Critical |
| AI Assistant (core differentiator) | Frontend shell only | Critical |
| Email Notifications | Not started | High |
| Payments / Membership Upgrade | Not started | High |
| Admin Dashboard | Not started | High |
| Community Forum / Events | Nav links only | Medium |
| Legal / Visa Content Management | Nav links only | Medium |
| Analytics Dashboard | Package added, not wired | Low |

The project currently has all of its core business value sitting at zero. The app can register users, log them in, and show them a dashboard. That is the entirety of functional business coverage today.

---

## 4. What Pages or Routes Should Exist but Do Not

**Public Routes**
- `/directory` — Business listing page (UI components exist; real route and data missing)
- `/directory/[slug]` — Business detail page (UI components exist; route missing)
- `/jobs` — Job listings page (UI shell only)
- `/jobs/[id]` — Job detail page (missing entirely)
- `/housing` — Housing listings (UI shell only)
- `/housing/[id]` — Housing detail page (missing entirely)
- `/ai` — Public AI assistant landing (linked in nav but no route confirmed)
- `/visa` — Visa & legal hub (linked in nav; missing)
- `/money` — Financial services page (linked in nav; missing)
- `/travel` — Travel services page (linked in nav; missing)
- `/events` — Community events page (linked in nav; referenced in saved-items; missing)
- `/about` — About page (missing entirely)
- `/contact` — Contact page (missing)
- `/terms` — Terms of service (missing; legally required)
- `/privacy` — Privacy policy (missing; legally required given user data collection)

**Protected Routes**
- `/dashboard` — Exists but appears to be a shell with no real data
- `/profile` — Exists but edit functionality likely backed by mock data
- `/settings` — Exists per nav; depth unknown
- `/applications` — Listed in nav; ESLint fatal parse error detected
- `/saved` — Exists; backed entirely by hardcoded mock data with no persistence
- `/upgrade` — Membership upgrade flow (completely absent)
- `/notifications` — No route or UI

**Missing Critical Routes**
- `/admin/*` — No admin control panel
- `/api/admin/*` — No admin API

---

## 5. What APIs Are Missing

**Authentication**
- `POST /api/auth/login` — Not documented; the current flow relies on the Supabase client-side UI component, but a proper server-side login endpoint is absent
- `POST /api/auth/forgot-password` — Missing despite `/forgot-password` being listed as a public route
- `POST /api/auth/reset-password` — Missing despite `/reset-password` being listed as a public route
- `POST /api/auth/verify-email` — Missing

**User Management**
- `DELETE /api/user/account` — No account deletion endpoint
- `PATCH /api/user/password` — No password change endpoint
- `POST /api/user/avatar` — No avatar upload endpoint
- `GET/PATCH /api/user/preferences` — Not documented; exists as data model but no endpoint confirmed
- `GET/PATCH /api/user/membership` — Not implemented

**Business Directory**
- `GET /api/directory/businesses` — Planned but not built
- `POST /api/directory/businesses` — Create business listing (missing)
- `GET /api/directory/businesses/[id]` — Business detail (missing)
- `GET /api/directory/categories` — Categories list (missing)
- `POST /api/directory/businesses/[id]/reviews` — Review submission (missing)

**Jobs**
- All CRUD endpoints for job listings (none exist)
- `POST /api/jobs/[id]/apply` — Job application endpoint (missing)

**Housing**
- All CRUD endpoints for housing listings (none exist)

**AI**
- `POST /api/ai/chat` — Core AI endpoint; environment variable set but implementation absent
- No streaming support, no conversation persistence

**Email**
- `POST /api/email/send-verification` — Planned but not built
- `POST /api/email/send-welcome` — Missing
- `POST /api/email/send-password-reset` — Missing

**Search**
- `GET /api/search` — Global search endpoint entirely absent despite a full search UI component tree being built

**Admin**
- All admin management endpoints missing

---

## 6. What Database Models or Relationships Are Missing

The current schema of four tables covers only user identity. Every business feature requires new models that do not exist:

**Business Directory**
- `Business` — name, slug, description, phone, email, website, address, lat, lng, verified, status, ownerId
- `BusinessCategory` — name, slug, parentId (for nested categories)
- `BusinessImage` — url, caption, businessId, isPrimary
- `BusinessReview` — rating, body, userId, businessId
- `BusinessHour` — dayOfWeek, openTime, closeTime, businessId

**Job Board**
- `Job` — title, description, salary range, type (FULL_TIME, PART_TIME, CONTRACT), location, status, expiresAt, employerId
- `JobApplication` — userId, jobId, status, coverLetterUrl, appliedAt
- `Employer` — companyName, logo, description, website, userId

**Housing**
- `HousingListing` — title, description, price, priceType (MONTHLY, DAILY), bedrooms, bathrooms, area, address, lat, lng, status, ownerId
- `HousingImage` — url, listingId, isPrimary
- `HousingInquiry` — userId, listingId, message, status

**Community Events**
- `Event` — title, description, startAt, endAt, location, organizer, coverImage
- `EventRegistration` — userId, eventId, status

**Content Management (Visa, Legal, Travel, Money)**
- `ContentPage` or `Article` — A CMS-like model for informational content

**Search**
- No full-text search indexes exist on any model
- No `SearchLog` model for analytics and trending

**Payments**
- `PaymentTransaction` — amount, currency, status, provider, referenceId, userId, plan
- `Invoice` — No invoice or billing history model

**Notifications**
- `Notification` — type, title, body, userId, readAt, link

**Saved / Bookmarks**
- `SavedItem` — userId, itemType (JOB, HOUSING, BUSINESS, EVENT), itemId — The `saved/page.tsx` page exists with mock data but has no persistent model

**Missing Relationships**
- User → Business (owner relationship)
- User → Job (applicant relationship through JobApplication)
- User → Notification (one-to-many)
- User → SavedItem (one-to-many)
- Business → Category (many-to-many)

---

## 7. Security Issues and Risks

**Critical**

1. **TypeScript errors suppressed at build time.** `ignoreBuildErrors: true` in `next.config.mjs` means type-unsafe code ships to production silently. This is explicitly called out as temporary in the docs but presents a real security and runtime risk right now. A type assertion failure on user session data, for example, could expose protected routes.

2. **`NEXTAUTH_SECRET` and `NEXTAUTH_URL` in `.env.example` but NextAuth is not installed.** These variables suggest a vestigial or confused configuration. If they are used anywhere in code for signing tokens or checking URLs without the actual NextAuth library, the behavior is undefined. These must be audited and removed if they have no purpose.

3. **No rate limiting anywhere.** The `POST /api/auth/register` endpoint is completely open to brute-force registration attacks, email enumeration, and spam account creation. There is no rate limiter (`upstash/ratelimit`, `express-rate-limit` equivalent, or edge-level limiting) anywhere in the codebase or middleware.

4. **Fatal parse errors in production-path files.** The ESLint report reveals `Parsing error: Identifier expected` in `app/(protected)/applications/page.tsx` and `app/(protected)/saved/page.tsx`. These are broken imports of Lucide icons — empty destructured identifiers like `{ ..., , }`. If `ignoreBuildErrors: true` is allowing these to pass the build, broken runtime components are shipping.

5. **No CSRF protection beyond SameSite cookie.** API routes that perform mutations (logout, profile update) rely entirely on cookie SameSite policy. For a production app handling Myanmar community personal data, a CSRF token or origin verification on mutation endpoints is advisable.

6. **Soft delete not enforced at query layer.** The `deletedAt` field exists on `users` but there is no Prisma middleware or global `where: { deletedAt: null }` clause enforced automatically. Any developer writing a `findMany` or `findUnique` query without manually including this filter will silently return deleted users.

**High**

7. **No RBAC / permission system.** There is no role model (`ADMIN`, `MODERATOR`, `USER`, `BUSINESS_OWNER`). The `User` model has no `role` field. When an admin dashboard is built, it would have no authorization boundary distinct from regular users.

8. **File upload surface not defined.** When Supabase Storage is integrated for avatars, there is no policy for file type validation, size limits, or malicious file detection.

9. **No audit log.** For a platform handling employment and housing data for a vulnerable migrant community, there is no mechanism to track who accessed or changed what.

---

## 8. Performance Improvements Recommended

1. **Re-enable Next.js Image Optimization.** `unoptimized: true` is a significant performance regression. Images are served at full resolution without format conversion (WebP/AVIF), resizing, or lazy loading optimization. The documented rationale is Hostinger compatibility — this should be resolved by configuring a custom loader (e.g., Supabase Storage CDN URL pattern) rather than disabling optimization entirely.

2. **No caching strategy exists.** There is no `unstable_cache`, `revalidate`, or SWR/React Query pattern defined anywhere. Every page load that fetches data makes a fresh database query. For high-read data like business listings and job postings, this will not scale.

3. **Prisma Client instantiation.** There is no evidence of a singleton Prisma Client pattern (`lib/prisma/client.ts` is referenced in the rules but not confirmed in the source). In a Next.js dev environment, each hot-reload without a singleton creates excess database connections.

4. **No database connection pooling.** Hostinger MySQL + Prisma without a connection pooler (PgBouncer equivalent or Prisma Accelerate) will hit connection limits under moderate load.

5. **No Prisma `select` discipline.** The documented queries in `DATABASE.md` use `include: { profile: true, membership: true, preference: true }` without field selection. The full rows of joined tables are always fetched, which is wasteful when only a few fields are needed.

6. **Framer Motion bundle.** `framer-motion@12` is a large client-side dependency. Without `dynamic(() => import('framer-motion'))` lazy loading for animation-heavy components, it inflates the initial JS bundle for all users.

7. **No CDN or Edge configuration.** There is no `next.config.mjs` header configuration, no Edge Runtime for the middleware beyond default behavior, and no CDN caching for static assets beyond what Hostinger provides.

---

## 9. UI/UX Improvements for a Premium Product

1. **Skeleton loading states exist but are not wired.** The `loading-cards.tsx`, `loading-lists.tsx`, and `loading-tables.tsx` components in `ui-kit/` are built but there are no `loading.tsx` files in any route group to trigger them automatically via Next.js Suspense.

2. **No `error.tsx` boundary pages.** Next.js App Router uses `error.tsx` files for graceful error recovery per-route. None appear to exist, meaning any unhandled server error delivers a raw Next.js error page.

3. **No `not-found.tsx` page.** A custom 404 page is absent.

4. **The dashboard contains no real data.** A first-time user logging in sees a member dashboard shell with no personalization, no real stats, and no onboarding flow. There is no "complete your profile" prompt, no empty state guidance, and no next-action suggestions.

5. **Mobile sidebar overlay lacks backdrop.** The sidebar in the protected layout slides in but has no backdrop/overlay to close it by tapping outside, which is a standard mobile navigation UX expectation.

6. **No onboarding flow.** New users completing registration land on a dashboard with no guided setup — no profile completion wizard, no language selection prompt, and no introduction to the platform's services.

7. **Dark mode is configured (`SYSTEM` default in preferences) but not tested.** Dark mode color tokens must be verified across all UI components built with Tailwind CSS v4 CSS variables.

8. **No breadcrumb system.** Deep content pages (business detail, job detail) have breadcrumb components in `components/business-detail/breadcrumb.tsx` but no consistent breadcrumb implementation across routes.

---

## 10. Accessibility Issues

1. **No ARIA landmark roles confirmed** on the main layout structure. The sidebar, main content, and mobile header use `div` and `aside` elements, but landmark roles (`role="navigation"`, `role="main"`, `aria-label`) are not confirmed to be present.

2. **Mobile sidebar lacks focus management.** When the sidebar opens, focus should move to the first interactive element. When it closes, focus should return to the trigger button. This is missing.

3. **No skip-to-main-content link.** For keyboard and screen reader users, there is no mechanism to skip the repeated sidebar navigation on every page.

4. **Color contrast not audited.** Text colors like `text-muted-foreground` on `bg-muted/20` backgrounds are at risk of failing WCAG AA 4.5:1 contrast ratio. The Myanmar community includes users accessing the platform on budget Android devices with poor displays.

5. **Icon-only buttons lack `aria-label`.** Buttons with only Lucide icon children (e.g., the trash icon in the saved items page, the mobile menu toggle) need `aria-label` attributes for screen reader identification.

6. **No `lang` attribute specified** for Burmese content sections. When the interface switches to Myanmar script (Zawgyi or Unicode), browser text-to-speech and font rendering depend on the correct `lang="my"` attribute being present.

7. **Form inputs not confirmed to have associated `<label>` elements.** React Hook Form is used, but whether every input has a properly associated label (not just placeholder) needs audit.

---

## 11. Internationalization (i18n) Improvements Needed

1. **No i18n framework is installed.** The platform targets Myanmar (Burmese), Thai, and English speakers. Three `Language` enum values (`EN`, `TH`, `MY`) exist in the database, but there is no `next-intl`, `i18next`, `react-i18next`, or similar library in `package.json`. All UI text is hardcoded in English.

2. **No translation key system.** There is no `messages/en.json`, `messages/th.json`, or `messages/my.json` file structure defined anywhere.

3. **No locale-aware routing.** Next.js App Router supports `i18n` routing via the `next.config.mjs` `i18n` configuration or `next-intl` route groups. Neither is implemented. A user who sets their language preference to Thai sees no difference.

4. **Burmese font not confirmed.** Rendering the Myanmar script (Unicode Burmese, not Zawgyi) requires a specific web font (e.g., Noto Sans Myanmar). No font configuration for Myanmar script is confirmed in `globals.css` or any layout file.

5. **Currency formatting is hardcoded as THB.** The `user_preferences` table stores `currency`, but there is no formatting utility that applies locale-aware number formatting (Thai Baht symbol, Burmese Kyat for MY locale).

6. **Date and time formatting is not locale-aware.** Dates shown in the UI appear to be ISO strings or hardcoded formats. A `Thingyan Water Festival - Sun, 12 Apr 2026` format in the saved events mock data will not adapt to Thai or Burmese date display conventions.

7. **Right-to-left text is not a concern for Burmese (it is left-to-right), but line-breaking and text wrapping** for long Burmese words (which don't use spaces between words) needs explicit CSS `word-break: break-word` or `overflow-wrap: anywhere` testing.

---

## 12. AI Features to Add or Improve

The AI module is the platform's stated core differentiator and is currently at 0% functional implementation. The following is the minimum viable and recommended AI feature set:

**Immediate (Core)**
- `POST /api/ai/chat` with OpenAI streaming (`stream: true`) — streaming is critical for perceived responsiveness
- Conversation history management (pass prior messages in the API call context window)
- System prompt engineering in Burmese/Thai/English that defines "Mingalar AI" as a Myanmar-community assistant
- Error handling with fallback messages in all three languages

**Short-term**
- AI-assisted job search: "Find me warehouse jobs in Samut Sakhon paying over 15,000 THB"
- AI-assisted housing search: natural language query to structured filter translation
- AI translation service: Burmese ↔ Thai ↔ English for listings and documents
- Visa guidance assistant: structured Q&A about work permit requirements

**Medium-term**
- Conversation persistence: store chat history in a new `ChatSession` + `ChatMessage` model
- Context injection: inject user's profile language, location, and membership plan into the system prompt for personalization
- AI content moderation: moderate business reviews and job listings before publication
- Document understanding: allow users to upload a document (work permit, contract) and ask questions about it

**Architectural concerns**
- No token budget or usage metering exists. A single PRO user could exhaust the OpenAI API quota.
- Membership-based AI access gating (FREE gets 10 queries/day, PLUS gets unlimited) requires both middleware and a usage tracking model.

---

## 13. Documentation Missing

1. **No `CONTRIBUTING.md`** — No guide for how to add a new route, a new API, or a new database model following project conventions.
2. **No `DEPLOYMENT.md`** — No documented steps for deploying to Hostinger Cloud, running Prisma migrations in production, or setting environment variables on the server.
3. **No `TESTING.md`** — No testing strategy is defined. There is no test runner, no test files, and no documented approach.
4. **No `DESIGN_SYSTEM.md`** at the root level (referenced in the project-structure under `docs/DESIGN_SYSTEM.md` but not provided) — if it exists, it is not part of the accessible docs set.
5. **No `SITEMAP.md` at root** — Referenced in the docs folder (`docs/SITEMAP.md`) but not provided. Critical for ensuring all routes are defined and tracked.
6. **No `CHANGELOG.md` at root** — Only exists inside `contract/` subfolder. Project-level changelog is absent.
7. **No API error code registry** — The `API_DOCUMENTATION.md` defines the envelope format and HTTP codes but does not enumerate all possible application-level `error.code` strings (e.g., `VALIDATION_ERROR`, `USER_NOT_FOUND`, `DUPLICATE_EMAIL`). This makes consistent client-side error handling impossible.
8. **No database seed documentation or seed file** — `DATABASE.md` explicitly notes "Seed: ยังไม่มีการกำหนด" (no seed defined). Without seed data, onboarding new developers requires manually inserting test records.
9. **No Git Flow / branching strategy documented** — `PROJECT_RULES.md` Section 20 acknowledges this gap explicitly.
10. **Contract documents (`contract/`) are not developer documentation** — These are client-facing SOW/payment documents kept inside the repository, which is an unusual practice and a potential confidentiality risk.

---

## 14. Technical Debt

**Immediate Debt**

1. **`typescript.ignoreBuildErrors: true`** is the single most dangerous piece of technical debt in the project. It will mask real runtime errors as the codebase grows.
2. **Fatal ESLint parse errors** in `app/(protected)/applications/page.tsx` and `app/(protected)/saved/page.tsx` — broken Lucide icon imports with empty destructuring slots are broken code that has been committed. These are not warnings; they are parse failures.
3. **`pnpm-lock.yaml` present in `project-structure.txt`** despite the project having migrated to `npm`. A lockfile from a different package manager left in the repository creates confusion and potential installation inconsistencies on CI.
4. **Mock data in production routes.** The `saved/page.tsx` page uses hardcoded `mockSavedJobs`, `mockSavedHousing`, and `mockSavedEvents` arrays. These are in the protected route group that real authenticated users will access. This is not a prototype — it is the shipped product.
5. **`AnimatedPage` component imported from `@/components/ui/AnimatedPage`** (PascalCase, non-kebab-case filename) in multiple protected pages. This violates the project's own naming convention rule (`component files must be kebab-case`).
6. **`NEXTAUTH_SECRET` and `NEXTAUTH_URL` in `.env.example`** but NextAuth is not a dependency. This is dead configuration that will confuse new developers.
7. **`@vercel/analytics`** is in dependencies and `ARCHITECTURE.md` notes it may not work correctly on Hostinger (non-Vercel) hosting. It is wired for Vercel infrastructure specifically.

**Medium-term Debt**

8. No singleton Prisma Client pattern confirmed — risk of connection pool exhaustion in development.
9. No custom React hooks (`useAuth`, `useUser`) to abstract Supabase session access — this logic is likely duplicated across components.
10. `components/` folder has no `auth/` directory despite auth UI components being needed (login form, register form). These may be inline in page files rather than isolated components.

---

## 15. Architecture and Coding Rule Violations

Comparing the actual code and ESLint report against `PROJECT_RULES.md`:

| Rule | Violation | Location |
|---|---|---|
| "Strict Type Safety / no build errors" | `ignoreBuildErrors: true` disables TypeScript checking | `next.config.mjs` |
| "kebab-case component file names" | `AnimatedPage` imported with PascalCase filename | `saved/page.tsx`, `applications/page.tsx` |
| No fatal parse errors | Two fatal ESLint parse errors in protected routes | `applications/page.tsx`, `saved/page.tsx` |
| All protected data must come from real API/DB | Saved items page uses `mockSavedJobs`, `mockSavedHousing`, `mockSavedEvents` | `saved/page.tsx` |
| Explicit Return Types on API routes | Cannot confirm compliance without full API route source |  |
| `pnpm` is banned | `pnpm-lock.yaml` present in project directory | `project-structure.txt` line 6 |
| Soft Delete filter enforced in all queries | No evidence of global Prisma middleware enforcing `deletedAt: null` | Schema / ORM layer |
| No state management libraries | Complied with correctly | — |
| Pages Router banned | Complied with correctly | — |

---

## 16. What Should Be Refactored Before Continuing Development

In priority order:

1. **Fix the fatal ESLint parse errors** in `applications/page.tsx` and `saved/page.tsx` before any other feature development. Broken imports block the build.
2. **Remove `ignoreBuildErrors: true`** from `next.config.mjs`. Fix all TypeScript errors that surface. This must be done before the codebase grows further.
3. **Create a singleton Prisma Client** at `lib/prisma/client.ts` following the standard Next.js pattern to prevent connection exhaustion.
4. **Create a Prisma middleware** (or use Prisma Client Extensions) to automatically filter `deletedAt: null` on the `User` model globally.
5. **Create a `useCurrentUser` hook** that encapsulates Supabase session retrieval, preventing duplicated auth logic across components.
6. **Delete or rename `pnpm-lock.yaml`** from the repository root.
7. **Remove `NEXTAUTH_SECRET`/`NEXTAUTH_URL`** from `.env.example` since NextAuth is not used.
8. **Rename `AnimatedPage` component file** to `animated-page.tsx` to comply with kebab-case naming rules.
9. **Implement `loading.tsx` and `error.tsx`** for all major route groups, wiring the existing skeleton and error components.
10. **Implement a `not-found.tsx`** page.

---

## 17. What Would Prevent Production Readiness Today

The project is **not production-ready** and cannot be shipped to real users today for the following blockers:

1. **Zero business features are functional.** No job listings, no housing, no business directory, no AI — the platform has no value proposition deliverable to users beyond account creation.
2. **Email verification is not implemented.** Users can register but cannot verify their email, making account security and trust impossible.
3. **Password reset does not exist.** Users who forget their password have no recovery mechanism.
4. **Legal pages are absent.** A platform collecting personal data from Myanmar migrants must have a Privacy Policy and Terms of Service. Deploying without these violates PDPA (Thailand's Personal Data Protection Act).
5. **Fatal parse errors in committed code** mean two pages in the protected area are broken.
6. **No rate limiting** on auth endpoints means the registration and login endpoints are open to abuse from day one.
7. **TypeScript build errors are suppressed** — the true runtime stability of the application is unknown.
8. **Mock data in user-facing protected routes** — users will see hardcoded Thai companies' job listings and fake apartment listings that link nowhere.
9. **No error recovery UI** — any server error produces a raw Next.js error page rather than a graceful product experience.
10. **No backup or recovery plan** for the MySQL database is documented or implemented.

---

## 18. What Would Prevent Scaling to 100,000+ Users

1. **Single-region Hostinger deployment with no horizontal scaling plan.** Hostinger Cloud is not a Kubernetes or auto-scaling environment. At 100,000 users, manual scaling becomes a deployment-time bottleneck.
2. **No connection pooling.** Prisma + MySQL without a pooler (PgBouncer, RDS Proxy, or Prisma Accelerate) will exhaust MySQL's default connection limit at a few hundred concurrent users.
3. **No caching layer.** Business directories, job listings, and housing data are high-read, low-write. Without Redis or edge caching, every user request hits the MySQL database.
4. **No CDN for media.** `images.unoptimized: true` means no image CDN, no WebP conversion, and no responsive image delivery. At scale, raw image bandwidth becomes a serious cost and performance problem.
5. **No background job system.** Email sending, AI response generation, and notification dispatch need to be asynchronous. There is no queue (BullMQ, Redis Queue) defined. Doing these synchronously in API routes will cause request timeouts under load.
6. **No full-text search infrastructure.** MySQL LIKE queries on unindexed text columns will degrade catastrophically with 100,000 business listings.
7. **No database read replica.** All reads and writes go to the same MySQL instance. Read-heavy workloads (directory searches, job listings) will contend with write-heavy workloads (new registrations, applications).
8. **OpenAI API has rate limits.** At scale, GPT-4.1 requests need queuing, rate limiting, and per-user token budgets. None of this exists.
9. **No observability stack.** No logging (structured), no APM (Sentry, DataDog), no alerting. Operating a 100,000-user platform blind to errors and latency spikes is not feasible.
10. **Session management at scale.** Supabase free tier has limits. A pro/enterprise Supabase plan or a self-hosted Supabase instance needs to be evaluated for the expected session volume.

---

## 19. Top 20 Highest-Priority Tasks Remaining

| # | Task | Why |
|---|---|---|
| 1 | Fix fatal ESLint parse errors in `applications/page.tsx` and `saved/page.tsx` | Broken committed code; blocks users from accessing those pages |
| 2 | Remove `ignoreBuildErrors: true`; fix all TypeScript errors | Hidden type errors are a runtime reliability risk |
| 3 | Implement email verification via Resend API | Required for account security and trust; legally expected |
| 4 | Implement password reset flow (forgot + reset endpoints + UI) | Users will get locked out with no recovery |
| 5 | Add Privacy Policy and Terms of Service pages | PDPA compliance; legally required before accepting real user data |
| 6 | Add rate limiting to auth endpoints | Open to brute-force and spam from day one |
| 7 | Create singleton Prisma Client + Prisma soft-delete middleware | Prevent connection exhaustion; enforce data integrity |
| 8 | Implement `POST /api/ai/chat` with OpenAI streaming | Core product differentiator; currently zero functionality |
| 9 | Design and migrate Business Directory Prisma schema | Foundation for core revenue feature |
| 10 | Build Business Directory API (`GET`, `POST /api/directory/businesses`) | Business Directory is the primary revenue module |
| 11 | Build Job Board Prisma schema + API | Second core module; currently all mock data |
| 12 | Install and configure `next-intl` (or equivalent) for EN/TH/MY | Platform's entire user base is non-English-primary |
| 13 | Implement `loading.tsx` and `error.tsx` for all route groups | Users currently get blank or error pages during data fetch |
| 14 | Add RBAC `role` field to `User` model; build Admin Dashboard | No admin access to manage listings, users, or content |
| 15 | Wire `@vercel/analytics` or replace with a Hostinger-compatible analytics solution | Currently installed but non-functional |
| 16 | Build Housing Listings schema + API | Third core module |
| 17 | Implement Supabase Storage integration for avatar uploads | Profile completion requires it; currently database field exists with no upload |
| 18 | Add global Prisma `select` discipline and query optimization | Foundation for performance at scale |
| 19 | Write `DEPLOYMENT.md` and seed file | New developers and CI/CD cannot onboard without these |
| 20 | Implement `SavedItem` model and connect `/saved` page to real data | Protected page currently serves hardcoded mock data to real users |

---

## 20. Completion Percentage Estimate

| Domain | Completion | Notes |
|---|---|---|
| **Architecture** | 65% | Strong documented architecture; implementation gaps remain significant |
| **Backend** | 15% | Only 4 API endpoints exist; all business feature APIs are missing |
| **Frontend** | 30% | UI shells and components are well-built; most are backed by mock data |
| **Database** | 20% | User schema is solid; all business feature models are missing |
| **Authentication** | 55% | Login/register/middleware work; password reset, email verification, and RBAC are missing |
| **AI** | 5% | Environment configured, frontend shell exists; backend is 0% |
| **Business Features** | 5% | Navigation links and UI components exist; zero real functionality |
| **Documentation** | 60% | Architecture and rules docs are high quality; deployment, testing, and contribution guides missing |
| **Testing** | 0% | No test runner, no test files, no test strategy |
| **Deployment** | 10% | Manual deployment confirmed to work; no CI/CD, no backup, no monitoring |
| **Overall Project** | **22%** | Foundation is solid; product is pre-alpha |

---

## Recommended Development Roadmap

---

### 🔴 Phase 1 — Critical (Weeks 1–4)
*The platform cannot go live or be used by real users without completing every item in this phase.*

**1.1 Fix Fatal Broken Code**
- Why: Two committed pages have parse errors that crash on load.
- Difficulty: Low
- Time: 2 hours
- Dependencies: None
- Files: `app/(protected)/applications/page.tsx`, `app/(protected)/saved/page.tsx`

**1.2 Remove `ignoreBuildErrors: true`**
- Why: Silent TypeScript failures are a runtime disaster waiting to happen.
- Difficulty: Medium (requires fixing all surfaced errors)
- Time: 1–2 days
- Dependencies: All source files
- Files: `next.config.mjs`, all `.tsx/.ts` files with type errors

**1.3 Singleton Prisma Client + Soft Delete Middleware**
- Why: Connection pool exhaustion and missing soft delete filters are live bugs.
- Difficulty: Low
- Time: 3 hours
- Files: `lib/prisma/client.ts` (new), `lib/prisma/middleware.ts` (new)

**1.4 Rate Limiting on Auth Endpoints**
- Why: Auth endpoints are exposed to abuse with zero protection.
- Difficulty: Low–Medium
- Time: 4 hours
- Dependencies: None (use `@upstash/ratelimit` + Upstash Redis, or edge middleware)
- Files: `proxy.ts`, `app/api/auth/register/route.ts`, `app/api/auth/login/route.ts`

**1.5 Email Verification + Password Reset**
- Why: Fundamental auth completeness. Without it, accounts cannot be secured.
- Difficulty: Medium
- Time: 3–4 days
- Dependencies: Install `resend` npm package; `.env.local` RESEND_API_KEY
- Files: `app/api/auth/forgot-password/route.ts`, `app/api/auth/reset-password/route.ts`, `app/api/email/*`, `app/(public)/forgot-password/page.tsx`, `app/(public)/reset-password/page.tsx`

**1.6 Legal Pages (Privacy Policy + Terms of Service)**
- Why: PDPA compliance. Required before collecting personal data from any real users.
- Difficulty: Low (content + routing only)
- Time: 1 day
- Files: `app/(public)/privacy/page.tsx`, `app/(public)/terms/page.tsx`

**1.7 `loading.tsx` + `error.tsx` + `not-found.tsx` for All Route Groups**
- Why: Users currently see blank or crash pages on data fetch delays or errors.
- Difficulty: Low
- Time: 1 day
- Files: `app/(protected)/loading.tsx`, `app/(protected)/error.tsx`, `app/not-found.tsx`

---

### 🟡 Phase 2 — High Priority (Weeks 5–12)
*Core business value. Without these, the platform has no reason for users to return.*

**2.1 AI Chat Implementation (`/api/ai/chat`)**
- Why: The primary differentiator of the platform. Currently 0% functional.
- Difficulty: Medium
- Time: 1 week
- Dependencies: OpenAI SDK install, streaming response infrastructure, system prompt engineering in EN/TH/MY
- Files: `app/api/ai/chat/route.ts`, `components/ai-assistant/chat-window.tsx` (connect to real API)

**2.2 Business Directory — Schema + API + Pages**
- Why: Primary revenue module and community utility.
- Difficulty: High
- Time: 3 weeks
- Dependencies: Phase 1 complete; new Prisma models (`Business`, `BusinessCategory`, `BusinessReview`, `BusinessImage`)
- Files: `prisma/schema.prisma`, `app/api/directory/**`, `app/(public)/directory/page.tsx`, `app/(public)/directory/[slug]/page.tsx`

**2.3 Job Board — Schema + API + Pages**
- Why: Core utility for the primary target user segment (Myanmar labour in Thailand).
- Difficulty: High
- Time: 2–3 weeks
- Dependencies: Business Directory schema patterns established
- Files: `prisma/schema.prisma`, `app/api/jobs/**`, `app/(public)/jobs/page.tsx`, `app/(public)/jobs/[id]/page.tsx`

**2.4 Internationalization (EN/TH/MY)**
- Why: The platform's stated audience is primarily Burmese and Thai-speaking. English-only UI excludes the core user base.
- Difficulty: High
- Time: 2 weeks initial setup + ongoing translation effort
- Dependencies: Install `next-intl`; create `messages/en.json`, `messages/th.json`, `messages/my.json`
- Files: `next.config.mjs`, `app/i18n.ts` (new), all page and component text strings

**2.5 RBAC + Admin Dashboard**
- Why: Business listings and job postings require moderation. Without admin tools, content quality and safety cannot be managed.
- Difficulty: High
- Time: 2 weeks
- Dependencies: Business Directory, Job Board schemas; add `role` field to `User` model
- Files: `prisma/schema.prisma`, `app/(admin)/**` (new route group), `app/api/admin/**`

**2.6 SavedItem Model + Connect `/saved` Page**
- Why: The saved items page is live and visible to users but backed by fake data.
- Difficulty: Low–Medium
- Time: 3 days
- Dependencies: Business Directory and Job Board models
- Files: `prisma/schema.prisma`, `app/api/user/saved/**`, `app/(protected)/saved/page.tsx`

**2.7 Avatar Upload via Supabase Storage**
- Why: Profile completion is gated on avatar; users cannot personalize their presence.
- Difficulty: Medium
- Time: 3 days
- Dependencies: Supabase Storage bucket configuration
- Files: `app/api/user/avatar/route.ts`, `app/(protected)/profile/page.tsx`, `lib/supabase/storage.ts`

---

### 🔵 Phase 3 — Medium Priority (Weeks 13–20)
*Fills out the full product experience and enables growth.*

**3.1 Housing Listings — Schema + API + Pages**
- Why: Third core module in the MVP vision.
- Difficulty: High
- Time: 2–3 weeks
- Files: `prisma/schema.prisma`, `app/api/housing/**`, `app/(public)/housing/**`

**3.2 Global Search API + Integration**
- Why: The search UI component tree is fully built but backed by nothing. Search is a primary discovery mechanism.
- Difficulty: High
- Time: 2 weeks
- Dependencies: Business Directory, Job Board, Housing schemas; consider MySQL FULLTEXT indexes
- Files: `app/api/search/route.ts`, `components/search/unified-search-results.tsx`

**3.3 Membership Payment Integration**
- Why: The revenue model requires a payment gateway. The `memberships` table is designed for it.
- Difficulty: High
- Time: 3 weeks
- Dependencies: Select payment provider (Omise for Thailand, Stripe as alternative); RBAC from Phase 2
- Files: `prisma/schema.prisma` (PaymentTransaction model), `app/api/payment/**`, `app/(protected)/upgrade/page.tsx`

**3.4 Notifications System**
- Why: Email and push notification preferences exist in the database but nothing dispatches them.
- Difficulty: Medium
- Time: 1 week
- Dependencies: Resend (email), a push notification provider, `Notification` Prisma model
- Files: `prisma/schema.prisma`, `app/api/notifications/**`, `lib/notifications/**`

**3.5 Vercel Analytics Replace / Fix**
- Why: `@vercel/analytics` will not function correctly on Hostinger. Replace with Plausible, PostHog, or a self-hosted solution.
- Difficulty: Low
- Time: 2 days
- Files: `app/layout.tsx`, `package.json`

**3.6 Observability Stack (Logging + APM)**
- Why: Operating without error tracking is not acceptable in a production system.
- Difficulty: Medium
- Time: 1 week
- Dependencies: Select Sentry or similar
- Files: `lib/monitoring/**`, `next.config.mjs`, all `error.tsx` boundaries

**3.7 Burmese / Thai Font Configuration**
- Why: Myanmar script requires Noto Sans Myanmar web font for correct rendering.
- Difficulty: Low
- Time: 4 hours
- Files: `app/globals.css`, `app/layout.tsx`

**3.8 AI Conversation Persistence**
- Why: Users expect chat history to persist between sessions.
- Difficulty: Medium
- Time: 1 week
- Dependencies: AI Chat from Phase 2; `ChatSession` and `ChatMessage` Prisma models
- Files: `prisma/schema.prisma`, `app/api/ai/history/route.ts`

---

### ⚪ Phase 4 — Nice to Have (Post-Launch)
*Competitive differentiation and platform maturity.*

**4.1 Community Forum / Events Module**
- Why: Community engagement and retention; builds network effects.
- Time: 3–4 weeks
- Files: `prisma/schema.prisma`, `app/(public)/events/**`, `app/(public)/forum/**`

**4.2 AI Document Translation Service**
- Why: Myanmar migrants frequently need to translate Thai contracts and government documents.
- Time: 2 weeks
- Dependencies: AI Chat infrastructure (Phase 2), file upload

**4.3 Visa & Legal Content Hub**
- Why: High-value, differentiated content for the target demographic.
- Time: 2 weeks (content + CMS)

**4.4 Mobile App (React Native / Expo)**
- Why: Referenced in the vision; significant reach in a mobile-first demographic.
- Time: 3+ months
- Dependencies: All backend APIs completed

**4.5 CI/CD Pipeline (GitHub Actions)**
- Why: Manual deployment to Hostinger does not scale with team growth.
- Time: 3 days
- Files: `.github/workflows/deploy.yml` (new)

**4.6 Database Read Replica + Connection Pooling**
- Why: Required for scale beyond a few thousand concurrent users.
- Time: 1 week (infrastructure configuration)

**4.7 Full-text Search with Elasticsearch or Meilisearch**
- Why: MySQL FULLTEXT is insufficient for multilingual search at scale.
- Time: 2 weeks

**4.8 Automated Testing Suite (Vitest + Playwright)**
- Why: Zero test coverage is a long-term quality and velocity risk.
- Time: 3 weeks to establish foundation
- Files: `vitest.config.ts`, `playwright.config.ts`, `tests/**`

---

*End of Assessment Report — Mingalar Bangkok v0.1.0*  
*Review Panel: Principal Software Architect, Staff Engineer, Security Engineer, Product Manager*
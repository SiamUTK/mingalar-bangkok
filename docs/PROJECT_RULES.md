
# PROJECT_RULES.md

# Mingalar Bangkok

**Version:** 2.0 Enterprise

> **AI-First Super App for the Myanmar Community in Thailand**

---

# Project Vision

Mingalar Bangkok is an AI-first super app designed to become the digital home for Myanmar people living, working, studying, and traveling in Thailand.

The platform combines AI, community, local services, travel, jobs, housing, and business tools into one unified ecosystem.

---

# Core Principles

- AI First
- Community First
- Mobile First
- Performance First
- SEO First
- Accessibility First
- Security First
- API First
- Data Driven
- Scalable by Design
- Production Ready
- Clean Architecture

---

# Technology Stack

## Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Framer Motion
- Lucide React
- next-intl

## Backend

- Next.js Route Handlers
- Prisma ORM
- MySQL
- Supabase Authentication
- Supabase Storage

## AI

- OpenAI API

## Services

- Resend
- Stripe
- Cloudflare
- GitHub
- Hostinger Cloud

---

# Core Product Modules

- AI Assistant
- Directory
- Jobs
- Housing
- Community
- Travel
- Visa & Legal
- Money Services
- News
- Events
- Learn Thai

---

# Engineering Rules

Always use:

- TypeScript
- Functional Components
- Async/Await
- Server Components by default
- Client Components only when necessary
- Zod Validation
- React Hook Form

Never use:

- JavaScript
- jQuery
- Bootstrap
- Material UI
- Chakra UI
- Firebase
- Inline CSS
- Duplicate Components
- Mock APIs in production

---

# Folder Structure

- app/
- components/
- features/
- services/
- actions/
- providers/
- lib/
- prisma/
- types/
- config/
- public/
- docs/

---

# UI / UX Principles

The interface must be:

- Friendly
- Premium
- Modern
- Clean
- Fast
- Accessible
- Mobile First
- Trustworthy

Every screen should immediately answer:

1. Where am I?
2. What can I do?
3. What should I do next?

---

# AI Rules

- AI must prioritize structured data.
- Never fabricate business information.
- Support Thai, Myanmar and English.
- Prefer directory data over generated text.
- AI features must be modular and reusable.

---

# API Standards

- RESTful APIs
- Input validation
- Authentication
- Authorization
- Rate Limiting
- Error Handling
- Logging
- Version-ready

---

# Database Standards

- MySQL only
- Prisma ORM
- UUID Primary Keys
- Soft Delete
- Foreign Keys
- Indexed Search
- Audit-ready
- Translation-ready

---

# Security

Always protect against:

- SQL Injection
- XSS
- CSRF
- Broken Authentication

Never expose:

- API Keys
- Secrets
- Database Credentials

---

# Performance

Optimize:

- Images
- Fonts
- Metadata
- Bundle Size
- Lazy Loading
- Dynamic Imports
- Server Rendering

---

# Accessibility

Follow WCAG 2.2 AA

Include:

- Semantic HTML
- Keyboard Navigation
- Focus States
- ARIA Labels
- Alt Text

---

# Internationalization

Supported Languages

- English
- Thai
- Myanmar

Use next-intl.

---

# SEO

Every page should include:

- Metadata
- Open Graph
- Canonical URL
- Structured Data
- Sitemap
- Robots.txt

---

# Code Quality

- Reuse existing components.
- Keep components modular.
- Avoid duplicate logic.
- Keep code production-ready.
- Prefer composition over duplication.

---

# Git

- Small commits
- Meaningful commit messages
- Feature branches
- Pull Requests

---

# Monetization

Support:

- Premium Membership
- Featured Listings
- Sponsored Content
- Advertising
- Travel Affiliates
- Visa Leads
- Job Posting
- eSIM
- Insurance

---

# Future Ready

Architecture must support:

- Mobile Apps
- Wallet
- Marketplace
- Messaging
- Notifications
- Rewards
- Referral Program
- Business CRM
- Public API

---

# AI Code Generation Rules

When generating code:

- Follow Next.js App Router best practices.
- Use Tailwind CSS v4.
- Reuse existing components.
- Keep code scalable.
- Prefer Server Components.
- Avoid unnecessary dependencies.
- Never generate duplicate files.
- Explain major architectural decisions only when necessary.

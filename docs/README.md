<div align="center">

# 🏙️ Mingalar Bangkok

**AI-First Super App for the Myanmar Community in Thailand**

ศูนย์กลางการใช้ชีวิต การทำงาน การเดินทาง และบริการสำคัญสำหรับชาวเมียนมาร์ในประเทศไทย

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](./LICENSE)

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Technology Stack](#%EF%B8%8F-technology-stack)
- [Project Architecture](#%EF%B8%8F-project-architecture)
- [Database Schema](#%EF%B8%8F-database-schema)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Database Setup](#%EF%B8%8F-database-setup)
- [Authentication](#-authentication)
- [Running the Project](#%EF%B8%8F-running-the-project)
- [Build & Deployment](#-build--deployment)
- [Configuration Files](#-configuration-files)
- [Coding Standards](#-coding-standards)
- [Features](#-features)
- [License](#-license)

---

## 📌 Project Overview

**Mingalar Bangkok** (`မင်္ဂလာဘန်ကောက်`) เป็นแพลตฟอร์มดิจิทัล AI-First ที่ออกแบบมาเพื่อเป็น **Super App** สำหรับชาวเมียนมาร์ที่อาศัย ทำงาน ศึกษา ท่องเที่ยว หรือดำเนินธุรกิจในประเทศไทย

แพลตฟอร์มรวบรวมบริการที่จำเป็นต่อการใช้ชีวิตประจำวันทั้งหมดไว้ในที่เดียว ตั้งแต่ AI Assistant, Business Directory, Job Board, Housing, Community ไปจนถึงบริการด้านวีซ่า การเงิน และการเดินทาง

### กลุ่มผู้ใช้งาน

| กลุ่ม | คำอธิบาย |
|---|---|
| 👷 แรงงาน | ชาวเมียนมาร์ที่ทำงานในไทย ต้องการงาน ที่พัก และบริการพื้นฐาน |
| 🎓 นักศึกษา | นักศึกษาชาวเมียนมาร์ที่ศึกษาในสถาบันการศึกษาไทย |
| ✈️ นักท่องเที่ยว | นักท่องเที่ยวจากเมียนมาร์ที่ต้องการข้อมูลการเดินทาง |
| 🏪 ผู้ประกอบการ | เจ้าของธุรกิจชาวเมียนมาร์ที่ต้องการเพิ่มช่องทางการตลาด |
| 🏢 ธุรกิจไทย | ธุรกิจที่ต้องการเข้าถึงกลุ่มลูกค้าชาวเมียนมาร์ |
| 🤝 องค์กร/NGO | หน่วยงานที่ให้บริการและช่วยเหลือชาวเมียนมาร์ |

---

## 🛠️ Technology Stack

| Category | Technology | Version |
|---|---|---|
| **Frontend Framework** | Next.js | 16.2.6 |
| **UI Library** | React | 19 |
| **Language** | TypeScript | 5.7.3 |
| **Styling** | Tailwind CSS | v4 |
| **UI Components** | Base UI (`@base-ui/react`) | 1.5.x |
| **Form Management** | React Hook Form + Zod | 7.x / 4.x |
| **Animation** | Framer Motion | 12.x |
| **Icons** | Lucide React | 1.x |
| **ORM** | Prisma | 6.x |
| **Database** | MySQL | 8.x (Hostinger) |
| **Authentication** | Supabase Auth (`@supabase/ssr`) | 0.12.x |
| **Email** | Resend | — |
| **AI** | OpenAI API | GPT-4.1 |
| **Analytics** | Vercel Analytics | 1.6.1 |
| **Theming** | next-themes | 0.4.x |
| **Toast / Notifications** | Sonner | 2.x |
| **Hosting** | Hostinger Cloud | — |

---

## 🏗️ Project Architecture

โปรเจกต์ใช้สถาปัตยกรรม **Next.js App Router** พร้อม Middleware-based authentication โดยแบ่งความรับผิดชอบดังนี้

```
Client (Browser)
    │
    ▼
Next.js Middleware (proxy.ts)
    │  ── ตรวจสอบ Session จาก Supabase Auth
    │  ── Route Guard: redirect ไปยัง /login หากยังไม่ได้ login
    ▼
Next.js App Router (Frontend + API Routes)
    │
    ├── Server Components  ── ดึงข้อมูลจาก Database โดยตรงผ่าน Prisma
    ├── Client Components  ── Interactivity, Form handling (React Hook Form + Zod)
    └── API Routes (/api/*)
            │
            ├── Prisma ORM ──────────→ MySQL (Hostinger)
            │                          /lib/generated/prisma
            ├── Supabase Auth ────────→ User Sessions & JWT
            ├── OpenAI API ───────────→ AI Assistant
            └── Resend ───────────────→ Transactional Email
```

### Middleware (Route Protection)

ไฟล์ `proxy.ts` ทำหน้าที่เป็น Next.js Middleware ตรวจสอบ Supabase session ทุก Request:

```typescript
// Public routes ที่ไม่ต้อง login
const PUBLIC_ROUTES = ["/", "/login", "/register", "/forgot-password", "/reset-password"];

// Logic:
// - ยังไม่ได้ login + เข้า protected route → redirect /login
// - login แล้ว + เข้า /login หรือ /register → redirect /dashboard
```

**Matcher pattern** ครอบคลุมทุก route ยกเว้น static assets (`_next/static`, `_next/image`, favicon, และไฟล์ภาพ)

---

## 🗄️ Database Schema

โปรเจกต์ใช้ **MySQL 8.x** ผ่าน **Prisma ORM** โดย Prisma Client ถูก generate ไปที่ `/lib/generated/prisma`

### Models

```
users                    ← ข้อมูลบัญชีผู้ใช้ (เชื่อมกับ Supabase via supabaseId)
  └── profiles           ← ข้อมูลโปรไฟล์ (ชื่อ, bio, avatar, ที่อยู่, ภาษา)
  └── memberships        ← แผนสมาชิก (FREE / PLUS / PRO / BUSINESS)
  └── user_preferences   ← การตั้งค่าส่วนตัว (ภาษา, theme, การแจ้งเตือน)
```

### Enums

| Enum | ค่า |
|---|---|
| `UserStatus` | `ACTIVE`, `INACTIVE`, `PENDING`, `SUSPENDED` |
| `MembershipPlan` | `FREE`, `PLUS`, `PRO`, `BUSINESS` |
| `MembershipStatus` | `ACTIVE`, `EXPIRED`, `CANCELLED`, `TRIAL` |
| `Language` | `EN`, `TH`, `MY` |
| `Theme` | `LIGHT`, `DARK`, `SYSTEM` |

### Schema ปัจจุบัน (Implemented)

```prisma
model User {
  id            String         @id @default(uuid())
  supabaseId    String?        @unique
  email         String         @unique
  emailVerified Boolean        @default(false)
  status        UserStatus     @default(PENDING)
  lastLoginAt   DateTime?
  profile       Profile?
  membership    Membership?
  preference    UserPreference?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  deletedAt     DateTime?
  @@map("users")
}
```

> หมายเหตุ: `deletedAt` รองรับ Soft Delete pattern

---

## ✅ Prerequisites

| เครื่องมือ | Version | หมายเหตุ |
|---|---|---|
| **Node.js** | >= 20.x | [nodejs.org](https://nodejs.org/) |
| **npm** | >= 10.x | มาพร้อม Node.js |
| **Git** | ล่าสุด | — |
| **MySQL** | 8.x | Local หรือ Hostinger Remote |
| **Supabase Account** | — | [supabase.com](https://supabase.com) |
| **OpenAI API Key** | — | [platform.openai.com](https://platform.openai.com) |
| **Resend Account** | — | [resend.com](https://resend.com) |

> โปรเจกต์นี้ใช้ **npm** เป็น Package Manager (ตรวจพบ `package-lock.json`)

---

## 🚀 Installation

### 1. Clone Repository

```bash
git clone https://github.com/your-org/mingalar-bangkok.git
cd mingalar-bangkok
```

### 2. ติดตั้ง Dependencies

```bash
npm install
```

### 3. ตั้งค่า Environment Variables

```bash
cp .env.example .env.local
```

แก้ไขไฟล์ `.env.local` ตามหัวข้อ [Environment Variables](#-environment-variables) ด้านล่าง

### 4. ตั้งค่าฐานข้อมูล

```bash
# สร้าง Database schema และ run migrations
npm run prisma migrate dev

# Generate Prisma Client
npm run prisma generate
```

### 5. รันโปรเจกต์

```bash
npm run dev
```

เปิดเบราว์เซอร์ที่ [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

สร้างไฟล์ `.env.local` ที่ root ของโปรเจกต์ โดยอ้างอิงจาก `.env.example`:

```env
# ─── Application ────────────────────────────────────────────
NODE_ENV=development
NEXT_PUBLIC_APP_NAME=Mingalar Bangkok
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ─── Database (Hostinger MySQL) ──────────────────────────────
DATABASE_URL="mysql://username:password@localhost:3306/mingalar_bangkok"

# ─── Supabase Authentication ─────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# ─── OpenAI ──────────────────────────────────────────────────
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_MODEL=gpt-4.1

# ─── Resend Email ────────────────────────────────────────────
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM="Mingalar Bangkok <noreply@mingalarbangkok.com>"

# ─── Security ────────────────────────────────────────────────
NEXTAUTH_SECRET=generate-a-long-random-secret
NEXTAUTH_URL=http://localhost:3000
```

### คำอธิบาย Environment Variables

| Variable | คำอธิบาย |
|---|---|
| `NODE_ENV` | Environment (`development` / `production`) |
| `NEXT_PUBLIC_APP_URL` | Base URL ของแอปพลิเคชัน |
| `DATABASE_URL` | MySQL connection string (Hostinger) |
| `NEXT_PUBLIC_SUPABASE_URL` | URL ของ Supabase Project |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anonymous Key (ใช้ใน Client-side) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key (ใช้ใน Server-side เท่านั้น) |
| `OPENAI_API_KEY` | API Key สำหรับ OpenAI |
| `OPENAI_MODEL` | Model ที่ใช้ (default: `gpt-4.1`) |
| `RESEND_API_KEY` | API Key สำหรับ Resend Email Service |
| `EMAIL_FROM` | ที่อยู่ผู้ส่ง Email |
| `NEXTAUTH_SECRET` | Secret สำหรับ NextAuth session encryption |
| `NEXTAUTH_URL` | Base URL สำหรับ NextAuth callbacks |

> ⚠️ **ห้าม commit** ไฟล์ `.env.local` เข้า Git ไฟล์นี้ถูก ignore ใน `.gitignore` แล้ว  
> ⚠️ `SUPABASE_SERVICE_ROLE_KEY` มีสิทธิ์สูง ห้ามใช้ใน Client-side โค้ดโดยเด็ดขาด

---

## 🗃️ Database Setup

โปรเจกต์ใช้ **Prisma ORM** เชื่อมต่อกับ **MySQL 8.x** บน Hostinger

### Prisma Client Output

Prisma Client ถูก generate ไปที่ `/lib/generated/prisma` (ไม่ใช่ default path)  
ตรวจพบจาก `.gitignore`:

```
/lib/generated/prisma
```

### คำสั่ง Prisma ที่ใช้งาน

```bash
# สร้าง Migration ใหม่หลังแก้ schema
npx prisma migrate dev --name <migration-name>

# Apply Migrations บน Production
npx prisma migrate deploy

# Generate Prisma Client หลัง schema เปลี่ยน
npx prisma generate

# เปิด Prisma Studio (GUI สำหรับ Database)
npx prisma studio

# Reset Database (ลบและสร้างใหม่ — ใช้เฉพาะ Development)
npx prisma migrate reset
```

---

## 🔑 Authentication

โปรเจกต์ใช้ **Supabase Auth** ผ่าน `@supabase/ssr` สำหรับจัดการ Authentication

### การทำงานของ Middleware

Middleware (`proxy.ts`) ใช้ `createServerClient` จาก `@supabase/ssr` เพื่อตรวจสอบ session บน Server-side ทุก Request:

```typescript
import { createServerClient } from "@supabase/ssr";

// อ่าน session จาก cookies
const { data: { session } } = await supabase.auth.getSession();

// Protected routes: redirect ไป /login หากไม่มี session
// Auth routes (/login, /register): redirect ไป /dashboard หากมี session แล้ว
```

### Public Routes (ไม่ต้อง Login)

```
/                  ← Landing page
/login             ← Login page
/register          ← Register page
/forgot-password   ← ขอ reset password
/reset-password    ← Reset password
```

### การตั้งค่า Supabase Auth

1. เปิด Supabase Dashboard → Authentication → URL Configuration
2. กำหนด **Site URL**: `https://your-domain.com`
3. กำหนด **Redirect URLs**: `http://localhost:3000/auth/callback`

---

## 🖥️ Running the Project

```bash
# Development server (Hot Reload)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

> **Scripts ที่มีอยู่จริงใน `package.json`:** `dev`, `build`, `start`, `lint`

---

## 📦 Build & Deployment

### Build Configuration

โปรเจกต์ใช้ไฟล์ `next.config.mjs` พร้อมการตั้งค่าดังนี้:

```javascript
// next.config.mjs
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,   // ข้าม TypeScript errors ระหว่าง build
  },
  images: {
    unoptimized: true,         // ปิด Next.js Image Optimization
  },
}
```

### Build สำหรับ Production

```bash
npm run build
npm start
```

### Deployment บน Hostinger Cloud

| ขั้นตอน | คำสั่ง |
|---|---|
| Install dependencies | `npm install` |
| Generate Prisma Client | `npx prisma generate` |
| Run migrations | `npx prisma migrate deploy` |
| Build Next.js | `npm run build` |
| Start server | `npm start` |

ตั้งค่า Environment Variables เดียวกันกับ `.env.local` ใน Hostinger Cloud Panel

---

## 📂 Configuration Files

ไฟล์ Configuration ที่มีอยู่จริงใน Repository:

| ไฟล์ | คำอธิบาย |
|---|---|
| `package.json` | Dependencies และ npm scripts |
| `package-lock.json` | Lock file สำหรับ npm |
| `tsconfig.json` | TypeScript configuration (strict mode, bundler resolution) |
| `next.config.mjs` | Next.js configuration |
| `next-env.d.ts` | TypeScript types สำหรับ Next.js (auto-generated) |
| `proxy.ts` | Next.js Middleware สำหรับ Route Protection |
| `schema.prisma` | Prisma Database Schema |
| `.env.example` | Template สำหรับ Environment Variables |
| `.gitignore` | Git ignore rules |

> ไม่พบ `tailwind.config.*`, `postcss.config.*`, หรือ `eslint.config.*` ใน Repository ปัจจุบัน

---

## 📐 Coding Standards

### TypeScript (จาก `tsconfig.json`)

- `strict: true` — บังคับใช้ TypeScript strict mode ทุก file
- `target: ES6` — compile เป็น ES6
- `moduleResolution: bundler` — ใช้ bundler module resolution
- `paths: { "@/*": ["./*"] }` — alias `@/` ชี้ไปที่ root

```typescript
// ตัวอย่าง: import ด้วย path alias
import { createServerClient } from "@supabase/ssr"
import type { NextRequest } from "next/server"
```

### Naming Conventions

| สิ่งที่ตั้งชื่อ | รูปแบบ | ตัวอย่าง |
|---|---|---|
| Component | PascalCase | `BusinessCard.tsx` |
| Hook | camelCase + `use` prefix | `useBusinessList.ts` |
| Utility Function | camelCase | `formatPhoneNumber.ts` |
| Type / Interface | PascalCase | `UserProfile` |
| Database Model (Prisma) | PascalCase | `User`, `Profile`, `Membership` |
| Database Table (Prisma `@@map`) | snake_case | `users`, `profiles`, `memberships` |
| Environment Variable | UPPER_SNAKE_CASE | `DATABASE_URL` |

### Form Validation

โปรเจกต์ใช้ **React Hook Form** + **Zod** + `@hookform/resolvers`:

```typescript
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const form = useForm({
  resolver: zodResolver(schema),
})
```

### Commit Message Format

ใช้ [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add user profile page
fix: resolve middleware redirect loop on /login
docs: update environment variables guide
refactor: extract supabase client to lib/supabase.ts
chore: upgrade Prisma to 6.x
```

---

## ✨ Features

### Implemented (ตรวจพบจาก Source Code)

| Feature | รายละเอียด |
|---|---|
| **Route Protection Middleware** | `proxy.ts` — ป้องกัน protected routes ด้วย Supabase session |
| **User Authentication** | Supabase Auth via `@supabase/ssr` |
| **Database Schema** | User, Profile, Membership, UserPreference models |
| **Membership Plans** | FREE / PLUS / PRO / BUSINESS tiers พร้อม status tracking |
| **Multi-language Support** | รองรับ EN / TH / MY ใน user preferences |
| **Theme Support** | LIGHT / DARK / SYSTEM ใน user preferences |
| **Soft Delete** | `deletedAt` field บน User model |

### Planned (ระบุใน README ต้นฉบับ แต่ยังไม่พบใน Schema/Source Code)

| Feature | หมายเหตุ |
|---|---|
| Business Directory | Planned — ยังไม่มี model ใน schema.prisma |
| AI Assistant (OpenAI) | Planned — มี `OPENAI_API_KEY` ใน env แต่ยังไม่มี implementation |
| Email Service (Resend) | Planned — มี `RESEND_API_KEY` ใน env แต่ยังไม่มี implementation |
| Job Board | Planned |
| Housing Listings | Planned |
| Community Forum | Planned |
| Visa & Legal Services | Planned |
| Money Services | Planned |
| Travel Services | Planned |
| Analytics (Vercel) | `@vercel/analytics` อยู่ใน dependencies แต่ยังไม่ทราบ implementation |

---

## 📄 License

โปรเจกต์นี้เป็น **Proprietary Software** ของ Siam On Cloud Co., Ltd.  
ห้ามนำไปใช้ แจกจ่าย หรือดัดแปลงโดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร

---

<div align="center">

**Mingalar Bangkok** — Built with ❤️ in Bangkok, Thailand  
© 2025 [Siam On Cloud Co., Ltd.](https://www.siamcloud.co) · All rights reserved

</div>

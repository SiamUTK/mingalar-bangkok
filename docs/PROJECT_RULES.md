# PROJECT_RULES.md — Mingalar Bangkok

กฎระเบียบและมาตรฐานกลางสำหรับนักพัฒนาและ AI Agent ทั้งหมดในโปรเจกต์ **Mingalar Bangkok**

---

# 1. Project Philosophy

โปรเจกต์ **Mingalar Bangkok** มีแนวคิดและหลักการออกแบบระบบในระดับ Enterprise ดังนี้:

* **AI-First Integration**: ออกแบบโครงสร้างระบบให้รองรับระบบปัญญาประดิษฐ์ (OpenAI API / GPT-4.1) เป็นหัวใจหลักของ Super App เพื่อส่งมอบประสบการณ์และบริการเฉพาะบุคคลให้แก่ชุมชนชาวเมียนมาร์ในประเทศไทย
* **Production Ready Architecture**: โค้ดและโครงสร้างทั้งหมดต้องพร้อมรองรับการทำงานในสภาวะการผลิต (Production) บน Hostinger Cloud มีความเสถียร รองรับโหลด และปลอดภัย
* **Clean Architecture & Maintainability**: แบ่งชั้นการทำงาน (Separation of Concerns) อย่างชัดเจน อ่านง่าย บำรุงรักษาง่าย และแยก Business Logic ออกจากส่วนการแสดงผล (UI)
* **Strict Type Safety**: บังคับใช้ TypeScript แบบ Strict Mode ทุกไฟล์ เพื่อป้องกันข้อผิดพลาดในขณะรันไทม์ (Runtime Errors)
* **Scalability & Security**: โครงสร้างรองรับการขยายตัวในอนาคต พร้อมมาตรฐานความปลอดภัยตามหลักสากล (Data Encapsulation, Parameterized Query, Cookie-based Session)

---

# 2. Technology Rules

ชุดเทคโนโลยีที่อนุญาตและไม่อนุญาตให้ใช้ในโปรเจกต์ โดยอ้างอิงจาก Source Code และ `package.json` จริง:

### 2.1 เทคโนโลยีที่อนุญาต (Allowed Tech Stack)

| หมวดหมู่ | เทคโนโลยีที่ใช้อย่างเป็นทางการ | เวอร์ชัน |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | 16.2.6 |
| **UI Library** | React / React DOM | 19.x |
| **Language** | TypeScript | 5.7.3 |
| **Styling** | Tailwind CSS / PostCSS | v4.3.3 |
| **UI Components** | Base UI (`@base-ui/react`), Shadcn, Lucide React, Framer Motion, Sonner, Next Themes | ล่าสุดตาม `package.json` |
| **Form & Validation** | React Hook Form + Zod (`@hookform/resolvers`) | v7.84.0 / v4.4.3 |
| **ORM** | Prisma ORM | 6.19.0 |
| **Database** | MySQL 8.x (Hostinger Remote Database) | 8.x |
| **Authentication** | Supabase Auth (`@supabase/ssr`, `@supabase/supabase-js`, `@supabase/auth-ui-react`) | v0.12.4 / v2.111.0 |
| **AI API** | OpenAI API (กำหนดโมเดล `gpt-4.1`) | - |
| **Email Service** | Resend API (กำหนดตัวแปร `RESEND_API_KEY`) | - |
| **Analytics** | Vercel Analytics (`@vercel/analytics`) | 1.6.1 |

### 2.2 เทคโนโลยีที่ห้ามใช้ (Banned / Disallowed)

* **ห้ามใช้ Pages Router**: ให้ใช้ Next.js App Router (`app/` directory) เท่านั้น
* **ห้ามใช้ Payment Provider อื่นนอกเหนือจากสิ่งที่ระบุ**: ปัจจุบันยังไม่มีการติดตั้ง SDK หรือกำหนดระบบชำระเงินใดๆ ในโปรเจกต์ (ยังไม่ได้กำหนด)
* **ห้ามใช้ State Management Library อื่นที่ไม่จำเป็น**: ห้ามติดตั้ง Redux, Zustand, MobX หรือ Recoil เนื่องจากระบบใช้ React State / Server State / Cookie-based Session

---

# 3. Package Manager Rules

การจัดการ Package และ Dependencies ต้องปฏิบัติตามกฎอย่างเคร่งครัด:

* **บังคับใช้ `npm` เท่านั้น**: เนื่องจากโปรเจกต์มีไฟล์ `package-lock.json`
* **ห้ามใช้ `pnpm` เด็ดขาด**
* **ห้ามใช้ `Yarn` เด็ดขาด**
* **ห้ามใช้ `Bun` เด็ดขาด**
* ทุกคำสั่งการติดตั้ง สร้าง หรือรันโปรเจกต์ ต้องขึ้นต้นด้วย `npm` เช่น:
  * `npm run dev`
  * `npm run build`
  * `npm run start`
  * `npm run lint`
  * `npm install <package-name>`

---

# 4. Project Structure Rules

โครงสร้างโฟลเดอร์หลักและหน้าที่ความรับผิดชอบในโปรเจกต์:

```text
mingalar-bangkok/
├── app/                  # Next.js App Router (Pages, Layouts, API Route Handlers)
│   ├── (protected)/      # Protected Route Groups (ต้องยืนยันตัวตน)
│   ├── (public)/         # Public Route Groups (ไม่ต้องยืนยันตัวตน)
│   └── api/              # API Route Handlers (/api/*)
├── components/           # UI Components แยกตามขอบเขตการทำงาน
│   ├── ai/               # AI Components
│   ├── ai-assistant/     # AI Assistant Features
│   ├── auth/             # Authentication Forms & Cards
│   ├── business-detail/  # Business Detail Page UI
│   ├── directory/        # Directory Listings & Filters
│   ├── home/             # Landing Page Sections
│   ├── navigation/       # Navbar, Footer, Mobile Drawer
│   ├── providers/        # React Context Providers
│   ├── search/           # Global & Mobile Search Overlay
│   ├── sections/         # Shared Landing Sections
│   ├── ui/               # Base UI Primitives (Button, Input, Card ฯลฯ)
│   └── ui-kit/           # Feedback & State Display UI (Alert, Skeleton, Empty)
├── lib/                  # Utilities, Custom Clients และ Helper Services
│   ├── auth/             # Auth Services & Sync Logic
│   ├── generated/prisma/ # Generated Prisma Client Output (Gitignored)
│   ├── prisma/           # Prisma Client Instance
│   ├── supabase/         # Supabase Client for Client/Server
│   ├── motion.ts         # Framer Motion Configs
│   └── utils.ts          # Class Merge & Helpers
├── prisma/               # Database Schema (`schema.prisma`)
├── public/               # Static Assets (Images, Icons, Fonts)
└── proxy.ts              # Next.js Middleware สำหรับ Route Protection & Cookie Session
```

### หลักการสร้างไฟล์ใหม่

* **Co-location**: โค้ดที่ใช้เฉพาะในหน้านั้นๆ ให้วางไว้ในโฟลเดอร์ของหน้านั้น หากเป็นส่วนประกอบที่ใช้ร่วมกัน ให้วางใน `components/` หรือ `lib/`
* **Prisma Client Location**: Prisma Client ต้องถูก Generate ไปที่ `lib/generated/prisma` และอ้างอิงการใช้งานผ่าน Import Alias `@/lib/generated/prisma` หรือ `@/lib/prisma/client` เท่านั้น

---

# 5. Component Rules

* **Functional Components เท่านั้น**: ห้ามใช้ Class Components
* **Server Components เป็นค่าเริ่มต้น**: ทุก Component ใน `app/` Directory เป็น React Server Component (RSC) โดยอัตโนมัติ
* **ใช้ Client Components เท่าที่จำเป็น**: ใส่ диреกทีฟ `"use client";` ที่บรรทัดแรกสุดของไฟล์เฉพาะเมื่อมีการใช้ Event Listener, React Hooks (`useState`, `useEffect`), หรือ UI Animation Libraries (Framer Motion)
* **Single Responsibility Principle**: 1 Component ต้องมีความรับผิดชอบเดียว หากซับซ้อนเกินไปให้ย่อยเป็น Sub-components
* **Separation of Concerns**: แยก UI Presentation ออกจาก Business Logic / API Fetching

---

# 6. TypeScript Rules

กฎการเขียน TypeScript ตามที่กำหนดใน `tsconfig.json`:

* **บังคับเปิด Strict Mode**: กำหนด `"strict": true` ใน `tsconfig.json`
* **ห้ามใช้ `any` เด็ดขาด**: หากไม่ทราบ Type ล่วงหน้า ให้ใช้ `unknown` และทำการ Type Narrowing / Type Guard
* **ต้องระบุ Props Interface / Type**: ทุก Component ต้องมีชนิดข้อมูลของ Props ชัดเจน
* **Explicit Return Types**: ฟังก์ชันในระดับ Utility, API Routes และ Service Layer ต้องระบุ Return Type อย่างชัดเจน

---

# 7. Import Rules

มาตรฐานการ Import ไฟล์ในโปรเจกต์:

* **บังคับใช้ Absolute Import**: ใช้ Path Alias `@/*` ที่ชี้ไปยัง Root Directory เสมอ (ตามตั้งค่าใน `tsconfig.json`)
  * ตัวอย่างที่ถูกต้อง: `import { Button } from "@/components/ui/button"`
  * ตัวอย่างที่ผิด: `import { Button } from "../../../components/ui/button"`
* **การจัดลำดับ Imports**:
  1. External Libraries (React, Next.js, Supabase, Prisma)
  2. Internal Components (`@/components/...`)
  3. Utility Functions & Services (`@/lib/...`)
  4. Types / Interfaces (`@/types/...`)

---

# 8. Naming Convention

มาตรฐานการตั้งชื่อองค์ประกอบต่างๆ ในโปรเจกต์:

| องค์ประกอบ | รูปแบบการตั้งชื่อ | ตัวอย่าง |
| :--- | :--- | :--- |
| **Component Files** | `kebab-case` | `login-form.tsx`, `auth-card.tsx` |
| **Component Names** | `PascalCase` | `LoginForm`, `AuthCard` |
| **Custom Hooks** | `camelCase` (ขึ้นต้นด้วย `use`) | `useAuth`, `useBusinessSearch` |
| **Utility Functions** | `camelCase` | `cn()`, `formatDate()` |
| **API Route Files** | `route.ts` (ตามกฎ Next.js) | `app/api/auth/register/route.ts` |
| **Database Models** | `PascalCase` | `User`, `Profile`, `Membership` |
| **Database Tables** | `snake_case` (ใช้ `@@map`) | `users`, `profiles`, `memberships` |
| **Constants** | `UPPER_SNAKE_CASE` | `PUBLIC_ROUTES`, `DEFAULT_THEME` |
| **Environment Variables** | `UPPER_SNAKE_CASE` | `DATABASE_URL`, `OPENAI_API_KEY` |

---

# 9. API Rules

* **App Router Route Handlers**: API ทั้งหมดต้องเขียนภายใต้ `app/api/**/route.ts`
* **RESTful Naming Convention**: ตั้งชื่อ Endpoint สื่อถึงทรัพยากร (e.g., `/api/auth/register`, `/api/user/profile`)
* **Request Validation**: ต้องตรวจสอบและ Validate Input ของ Request ด้วย **Zod** ทุกครั้งก่อนประมวลผล
* **Standard Response Format**: ส่งคืน JSON Response ที่มีโครงสร้างแน่นอน
* **Status Codes**: ใช้ HTTP Status Code ที่เหมาะสม (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 500 Internal Server Error)

---

# 10. Database Rules

* **Prisma ORM & MySQL 8.x**: ติดต่อฐานข้อมูลผ่าน Prisma Client เท่านั้น
* **Primary Key**: ทุกตารางต้องใช้ `id String @id @default(uuid())`
* **Foreign Keys & Cascade**: กำหนดความสัมพันธ์ชัดเจน พร้อมเงื่อนไข `onDelete: Cascade` ในความสัมพันธ์ One-to-One ย่อย
* **Soft Delete**: ตาราง `users` มีฟิลด์ `deletedAt DateTime?` สำหรับการลบแบบ Soft Delete แอปพลิเคชันต้องตรวจสอบเงื่อนไขการกรองผู้ใช้ที่ยังไม่ถูกลบเสมอ
* **Transactions**: ใช้ `prisma.$transaction()` เมื่อต้องเขียนหรืออัปเดตข้อมูลหลายตารางพร้อมกันเพื่อความสมบูรณ์ของข้อมูล (Atomicity)
* **Migrations**: การเปลี่ยนโครงสร้าง DB ต้องทำผ่าน `npx prisma migrate dev` ในสภาพแวดล้อมพัฒนา และ `npx prisma migrate deploy` ในระบบ Production

---

# 11. Authentication Rules

* **Supabase Auth & `@supabase/ssr`**: ใช้ Supabase ในการจัดการ Session, JWT และการเข้าสู่ระบบ
* **Cookie-based Session**: เก็บ Session ผ่าน HTTP-only Cookies เพื่อความปลอดภัยและทำงานร่วมกับ Server Components / Middleware
* **Middleware Route Protection**: ตรวจสอบสิทธิ์การเข้าถึงผ่านไฟล์ `proxy.ts` (ทำหน้าที่เป็น Next.js Middleware)
  * **Public Routes**: `["/", "/login", "/register", "/forgot-password", "/reset-password"]`
  * **Protected Routes**: เส้นทางอื่นๆ นอกเหนือจาก Public Routes ต้องมีการยืนยันตัวตนเสมอ หากไม่มี Session จะถูก Redirect ไปยัง `/login`
* **Dual-Identity Bridge**: เชื่อมโยงบัญชี Supabase Auth กับตาราง `users` ใน MySQL ด้วยฟิลด์ `supabaseId`

---

# 12. Storage Rules

* **ยังไม่ได้กำหนดการอัปโหลดไฟล์จริงในระบบปัจจุบัน**
* โปรเจกต์มีการติดตั้ง `@supabase/supabase-js` และกำหนดตัวแปร `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` รองรับไว้สำหรับ Supabase Storage ในอนาคต
* ฟิลด์ภาพโปรไฟล์และภาพปกในตาราง `profiles` (`avatar`, `coverImage`) จัดเก็บเป็น URL สตริง

---

# 13. AI Rules

* **OpenAI API (GPT-4.1)**: ใช้ตัวแปรสภาพแวดล้อม `OPENAI_API_KEY` และ `OPENAI_MODEL` (ค่าเริ่มต้น: `gpt-4.1`)
* **Server-side Execution**: การเรียกใช้งาน OpenAI API ต้องทำใน Server-side (API Routes หรือ Server Components) เท่านั้น ห้ามเปิดเผย API Key ฝั่ง Client
* **Error Handling**: ต้องครอบด้วย `try...catch` และมีระบบ Fallback Message เมื่อ API เกิดปัญหาหรือเกิน Quota

---

# 14. Email Rules

* **Resend API**: โปรเจกต์กำหนดการใช้งานผ่านตัวแปรสภาพแวดล้อม `RESEND_API_KEY` และ `EMAIL_FROM`
* **การส่งอีเมล**: ทำงานบน Server-side เท่านั้น รองรับ Transactional Email (เช่น Verification, Password Reset)

---

# 15. Payment Rules

> **ยังไม่ได้กำหนดในโปรเจกต์**

โปรเจกต์ปัจจุบันยังไม่มีการติดตั้ง SDK หรือกำหนดผู้ให้บริการชำระเงิน (Stripe / Omise ฯลฯ) ในโค้ดหรือตัวแปรสภาพแวดล้อม แต่ตาราง `memberships` ใน Schema ถูกออกแบบให้รองรับแผนสมาชิก (`FREE`, `PLUS`, `PRO`, `BUSINESS`) เรียบร้อยแล้ว

---

# 16. Environment Variables Rules

* **ห้าม Commit Secret เข้า Git เด็ดขาด**: ไฟล์ `.env.local` ถูกระบุไว้ใน `.gitignore`
* **ไฟล์ Template**: ใช้ `.env.example` เป็นแม่แบบการตั้งชื่อตัวแปรสภาพแวดล้อม
* **การจำแนกประเภทตัวแปร**:
  * ตัวแปรฝั่ง Client ต้องขึ้นต้นด้วย `NEXT_PUBLIC_` เท่านั้น (เช่น `NEXT_PUBLIC_SUPABASE_URL`)
  * ตัวแปรที่เป็นความลับรุนแรง ห้ามมี `NEXT_PUBLIC_` เด็ดขาด (เช่น `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, `RESEND_API_KEY`, `DATABASE_URL`)

---

# 17. Error Handling Rules

* **API Error Handling**: ครอบ API Handlers ด้วย `try...catch` และตอบกลับในรูปแบบ JSON ที่ชัดเจน
* **Client Error Handling**: แสดงผลข้อผิดพลาดแก่ผู้ใช้ผ่าน UI Components จาก `components/ui-kit/` เช่น `ErrorAlert`, `NetworkErrorBanner`, หรือ Sonner Toast (`toast.error()`)
* **Build Configuration**: ในช่วงการพัฒนาปัจจุบัน `next.config.mjs` มีการกำหนด `typescript.ignoreBuildErrors: true` และ `images.unoptimized: true` เพื่อรองรับการ Deploy บน Hostinger Cloud

---

# 18. Performance Rules

* **Image Unoptimization**: มีการปิด Next.js Image Optimization อัตโนมัติ (`unoptimized: true` ใน `next.config.mjs`) เพื่อความเสถียรบนโฮสติ้ง
* **Lazy Loading**: ใช้ `Dynamic Imports` หรือ Lazy Components เมื่อต้องโหลด Component ขนาดใหญ่ที่ไม่จำเป็นต้องแสดงผลทันที
* **UI Animation Performance**: การใช้งาน Framer Motion ต้องทำใน Client Components ที่แยกส่วนไว้เพื่อไม่ให้กระทบประสิทธิภาพการ Render ฝั่ง Server

---

# 19. Security Rules

* **Input Validation**: บังคับ Validate ข้อมูลด้วย Zod ทั้งฝั่ง Client (React Hook Form) และฝั่ง Server (API Routes)
* **SQL Injection Prevention**: ใช้ Prisma ORM ที่มีระบบ Parameterized Queries โดยตรง ห้ามใช้ Raw Query ที่รับค่า Input โดยไม่ผ่านการ Escaped
* **XSS Prevention**: หลีกเลี่ยงการใช้ `dangerouslySetInnerHTML`
* **Auth Protection**: บังคับใช้ Cookie-based Session และตรวจสอบสิทธิ์ใน `proxy.ts` Middleware

---

# 20. Git Rules

> **ยังไม่ได้กำหนดในโปรเจกต์**

 repository ปัจจุบันยังไม่ได้มีการระบุกฎ Git Flow, Branch Naming หรือ Pull Request Rules ไว้เป็นเอกสารเฉพาะ

---

# 21. Documentation Rules

* **ภาษาที่ใช้**: เอกสารหลักและคู่มือภายในโปรเจกต์ให้เขียนเป็น **ภาษาไทย**
* **Code Comments**: เขียนอธิบายเฉพาะ logic ที่มีความซับซ้อน หรือกรณีพิเศษที่ต้องการเน้นย้ำ
* **Markdown Standard**: เอกสารคู่มือต้องจัดรูปแบบด้วย Markdown ที่อ่านง่าย มีหัวข้อ (Headings), ตาราง (Tables), และ Code Blocks ชัดเจน

---

# 22. AI Coding Rules

กฎเหล็กสำหรับ AI Agents ทั้งหมด (Claude, ChatGPT, GitHub Copilot, Cursor, Codex ฯลฯ) ที่ทำงานกับโปรเจกต์นี้:

1. **อ่าน `PROJECT_RULES.md` และ `DATABASE.md` ก่อนเริ่มเขียนโค้ดเสมอ**
2. **ห้ามเดาข้อมูล**: หากไม่พบไฟล์ โครงสร้าง หรือฟีเจอร์ใดในโปรเจกต์ ให้ระบุว่า **"ยังไม่ได้กำหนดในโปรเจกต์"** ห้ามแต่งเติมข้อมูลขึ้นเอง
3. **ห้ามสร้าง Feature / Script ที่ไม่มีอยู่จริง**: ห้ามคิดค้นคำสั่ง npm ใหม่นอกเหนือจากที่มีใน `package.json`
4. **ห้ามเปลี่ยนสถาปัตยกรรมหลัก**:
   * ห้ามเปลี่ยนไปใช้ Pages Router (ต้องใช้ App Router)
   * ห้ามเปลี่ยน Package Manager (ต้องใช้ `npm` เท่านั้น)
   * ห้ามเปลี่ยน ORM (ต้องใช้ Prisma)
   * ห้ามเปลี่ยน Database (ต้องใช้ MySQL)
   * ห้ามเปลี่ยน Auth Provider (ต้องใช้ Supabase Auth)
5. **อ้างอิง Source Code จริงเท่านั้น**: ทุกการปรับปรุงหรืออธิบายโค้ดต้องอ้างอิงจากโครงสร้างที่มีอยู่จริงใน Repository
6. **เมื่อไม่แน่ใจ ให้สอบถามหรือแจ้งว่าไม่พบข้อมูล** แทนการคาดเดา

---

# 23. Future Development Rules

แนวทางการเพิ่ม Feature ใหม่ในอนาคตเพื่อรักษาความสะอาดและสถาปัตยกรรมของโปรเจกต์:

1. **การเพิ่ม Module ใหม่**: ให้สร้างโฟลเดอร์แยกใน `components/<module-name>/` และสร้าง Route Group ใน `app/(public)/` หรือ `app/(protected)/`
2. **การปรับเปลี่ยน Database Schema**: ต้องแก้ไขที่ `prisma/schema.prisma` แล้วรัน `npx prisma migrate dev` พร้อมทดสอบสร้าง Prisma Client ใหม่เสมอ
3. **การเพิ่ม Third-party Integration**: ต้องลงทะเบียน Environment Variable ใน `.env.example` ก่อน และเขียน Service Layer ไว้ใน `lib/` เพื่อแยกออกจากส่วน UI

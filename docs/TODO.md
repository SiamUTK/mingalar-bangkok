# 🎯 Mingalar Bangkok - Project Task Board (`TODO.md`)

> **Project Goal:** AI-First Super App for the Myanmar Community in Thailand  
> **Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5.7, Tailwind CSS v4, Prisma ORM 6.19, MySQL 8.x, Supabase Auth (`@supabase/ssr`)

---

## 📌 สิ่งที่ยังไม่ได้ทำ (Pending & Backlog Tasks)

### 🔴 Priority 1: งานที่ต้องทำต่อทันที (Immediate Next Steps)
- [ ] **[Auth Integration Test]** ทดสอบ Flow การเข้าสู่ระบบจริงด้วย Supabase Auth ผ่าน Cookie Session และ Route Guard ใน Middleware (`proxy.ts`)
- [ ] **[User Profile API]** ทดสอบการส่ง Request ดึงข้อมูลและอัปเดตข้อมูลส่วนตัวใน API Route `/api/user/profile`
- [ ] **[AI Assistant Connection]** พัฒนา API Route `/api/ai/chat` และเชื่อมต่อ OpenAI API (`gpt-4.1`) เข้ากับส่วนแสดงผล `ChatWindow`

### 🟡 Priority 2: ฟีเจอร์ที่ต้องพัฒนาในระยะสั้น (Short-term Features)
- [ ] **[Transactional Email]** ติดตั้ง SDK และเชื่อมต่อ Resend API สำหรับส่งอีเมลยืนยันตัวตน และเปลี่ยนรหัสผ่าน
- [ ] **[Business Directory Module]** 
  - [ ] ออกแบบ Prisma Schema สำหรับตารางธุรกิจ, หมวดหมู่, รีวิว และภาพถ่าย
  - [ ] สร้าง API Handlers สำหรับการค้นหา และกรองข้อมูลธุรกิจ
- [ ] **[Job Board Module]** พัฒนาระบบแสดงประกาศรับสมัครงาน การกรองตำแหน่งงาน และหน้าสมัครงาน
- [ ] **[Housing Module]** พัฒนาระบบค้นหาและแสดงรายการอสังหาริมทรัพย์/ที่พักอาศัย

### 🔵 Priority 3: ฟีเจอร์และส่วนปรับปรุงในระยะยาว (Long-term & Enhancements)
- [ ] **[Community & Legal Services]** พัฒนาหน้าศูนย์ข้อมูลบริการวีซ่า, กฎหมาย, การเงิน (Money) และการเดินทาง (Travel)
- [ ] **[Membership Payment]** พิจารณาติดตั้งระบบชำระเงิน (Payment Gateway) สำหรับการอัปเกรดระดับสมาชิก (`FREE`, `PLUS`, `PRO`, `BUSINESS`)
- [ ] **[Type Safety Strictness]** ปิดการตั้งค่า `typescript.ignoreBuildErrors: true` ใน `next.config.mjs` เมื่อพัฒนาระบบหลักเสร็จสิ้น

---

## 📜 สิ่งที่ทำเสร็จเรียบร้อยแล้ว (Completed History - ลำดับตามไทม์ไลน์)

### 🗓️ สิงหาคม 2026 (August 2026)
- [x] **[06 Aug 2026]** **Production Build & Bug Fixes** (`b4cfebc`)
  - แก้ไขข้อผิดพลาด `useRouter` assignment ใน Client Components
  - เคลียร์ ESLint Warnings ทั้งหมดในโปรเจกต์
  - ทดสอบรัน `npm run build` ผ่านแบบ Production สดๆ ร้อนๆ สำเร็จ
- [x] **[06 Aug 2026]** **Next.js Types Definitions** (`7e40499`)
  - อัปเดตและปรับปรุงการตั้งค่า Type Definitions สำหรับ Next.js 16 ใน `next-env.d.ts`

---

### 🗓️ กรกฎาคม - สิงหาคม 2026 (July - August 2026)
- [x] **[Protected Dashboard Layout]** (`cde4962`)
  - ออกแบบและพัฒนาโครงสร้างหน้า Member Dashboard สำหรับสมาชิกที่ล็อกอินแล้ว
- [x] **[Auth Navigation Flow]** (`cde4962`)
  - พัฒนาระบบการเปลี่ยนหน้าและตรวจสอบ Session ในการเข้าถึงส่วนต่างๆ ของแอปพลิเคชัน
- [x] **[Complete Public & Member Routes]** (`305ab20`)
  - สร้างโครงสร้าง Route ทั้งหมดในฝั่ง Public และ Protected Member Dashboard พร้อม UI Components พื้นฐาน
- [x] **[Footer Component Overhaul]** (`8a1c6c8`, `2950f09`)
  - อัปเดตลิงก์นำทางทั้งหมด ข้อมูลติดต่อบริษัท
  - เปลี่ยนจากการใช้ Lucide Icons มาเป็น Custom Brand SVG Icons เพื่อความสวยงาม

---

### 🗓️ มิถุนายน - กรกฎาคม 2026 (June - July 2026)
- [x] **[Code Modularization]** (`dffa4c6`)
  - ทำการ Refactor โค้ดส่วน `NewsSection` โดยแยกย่อยเป็น `NewsCard` เพื่อให้ง่ายต่อการบำรุงรักษา
- [x] **[New Public Routes & UI Updates]** (`0bc7167`)
  - เพิ่มเส้นทางบริการสาธารณะชุดใหม่ และอัปเดตชุด UI Kit Components
- [x] **[Homepage Redesign]** (`f879f3b`)
  - ปรับโฉมเลย์เอาต์หน้าแรก (Homepage) และระบบนำทาง (Navbar / Mobile Drawer) ทั้งหมด
- [x] **[Documentation & Config Assets]** (`91c24c6`)
  - อัปเดตเอกสารประกอบโปรเจกต์ และไฟล์ Asset ตั้งค่าเริ่มต้น

---

### 🗓️ พฤษภาคม - มิถุนายน 2026 (May - June 2026)
- [x] **[Prisma Deployment Config]** (`df7fc3d`)
  - ปรับโครงสร้าง Prisma Client ให้ Generate ไปที่ `/lib/generated/prisma` และลบไฟล์ส่วนเกินรองรับการ Deploy บน Hostinger Cloud
- [x] **[Package Manager Standardization]** (`3346dcd`)
  - สวิตช์ระบบจัดการ Package จาก `pnpm` มาเป็น `npm` อย่างเป็นทางการ พร้อมล็อกเวอร์ชันด้วย `package-lock.json`

---

### 🗓️ ต้นปี 2026 (Early Setup 2026)
- [x] **[Database & User Schema Setup]** (`5183238`)
  - ออกแบบ Prisma Schema เชื่อมต่อ MySQL 8.x
  - สร้างตาราง `users`, `profiles`, `memberships` และ `user_preferences` พร้อมรองรับ Soft Delete
- [x] **[Supabase Authentication Setup]** (`5183238`)
  - ติดตั้งและตั้งค่า Supabase Auth (`@supabase/ssr`) ทำงานร่วมกับ Cookie Session ใน `proxy.ts` Middleware
- [x] **[Initial Project Initialization]** (`8b1f356`)
  - ตั้งค่าโปรเจกต์ Next.js 16 (App Router), Tailwind CSS v4, TypeScript 5.7 และติดตั้ง Base UI / Framer Motion
# API_DOCUMENTATION.md — Mingalar Bangkok

เอกสารข้อกำหนด API และข้อมูลอินเทอร์เฟซการสื่อสารระบบ (API Contract) สำหรับโปรเจกต์ **Mingalar Bangkok**

---

# สารบัญ (Table of Contents)
1. [ภาพรวมสถาปัตยกรรม API](#1-ภาพรวมสถาปัตยกรรม-api)
2. [มาตรฐานการสื่อสารและโครงสร้างข้อมูล](#2-มาตรฐานการสื่อสารและโครงสร้างข้อมูล)
3. [Authentication & Session Handling](#3-authentication--session-handling)
4. [รายการ API Endpoints ที่ใช้งานจริง](#4-รายการ-api-endpoints-ที่ใช้งานจริง)
   - [4.1 Authentication Endpoints](#41-authentication-endpoints)
   - [4.2 User Management Endpoints](#42-user-management-endpoints)
   - [4.3 System & Health Check Endpoints](#43-system--health-check-endpoints)
5. [รายการ API Endpoints ที่วางแผนในอนาคต (Planned)](#5-รายการ-api-endpoints-ที่วางแผนในอนาคต-planned)
6. [การจัดการข้อผิดพลาด (Error Handling)](#6-การจัดการข้อผิดพลาด-error-handling)
7. [การตรวจสอบข้อมูล (Request Validation)](#7-การตรวจสอบข้อมูล-request-validation)
8. [ความปลอดภัยและการจำกัดสิทธิ์ (Security & Rate Limiting)](#8-ความปลอดภัยและการจำกัดสิทธิ์-security--rate-limiting)

---

# 1. ภาพรวมสถาปัตยกรรม API

ระบบ API ของ **Mingalar Bangkok** พัฒนาขึ้นด้วย **Next.js App Router Route Handlers** (`app/api/**/route.ts`) ทำหน้าที่เป็น Backend-for-Frontend (BFF) เชื่อมโยงการทำงานระหว่าง React Server/Client Components, ฐานข้อมูล MySQL 8.x ผ่าน Prisma ORM และบริการภายนอก เช่น Supabase Auth, OpenAI API และ Resend Email

### สถาปัตยกรรมความสัมพันธ์

```text
+-----------------------------------------------------------+
|                    Client / Frontend                      |
|            (React Server / Client Components)             |
+-----------------------------+-----------------------------+
                              |
                              | HTTP Fetch / REST API
                              v
+-----------------------------------------------------------+
|              Next.js Middleware (proxy.ts)                |
|             (Cookie Session Check via @supabase/ssr)      |
+-----------------------------+-----------------------------+
                              |
                              v
+-----------------------------------------------------------+
|               Next.js Route Handlers                      |
|                  (/app/api/**/route.ts)                    |
|                                                           |
|  +--------------------+  +-----------------------------+  |
|  | Input Validation   |  | Supabase Auth Session Verification |
|  | (Zod Schemas)      |  |                             |  |
|  +---------+----------+  +--------------+--------------+  |
+------------|----------------------------|-----------------+
             |                            |
             v                            v
+-----------------------+    +------------------------------+
|   Prisma ORM 6.x      |    |   External APIs Integration  |
| (MySQL 8.x Hostinger) |    | (OpenAI GPT-4.1 / Resend)    |
+-----------------------+    +------------------------------+
```

---

# 2. มาตรฐานการสื่อสารและโครงสร้างข้อมูล

### 2.1 Protocol & Headers
* **Base URL**: `http://localhost:3000` (Dev) / `https://mingalarbangkok.com` (Prod)
* **Content-Type**: `application/json`
* **Session Cookie**: อ่านและตั้งค่าการบันทึกผ่าน HTTP-only Cookies (จัดการอัตโนมัติด้วย `@supabase/ssr`)

### 2.2 โครงสร้าง Response Envelope
ทุก Endpoint ในระบบส่งคืน JSON Response ในรูปแบบมาตรฐานเดียวกัน ดังนี้:

#### Response สำเร็จ (Success Response)
```json
{
  "success": true,
  "data": { ... },
  "message": "ข้อความอธิบายเพิ่มเติม (ถ้ามี)"
}
```

#### Response ผิดพลาด (Error Response)
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "คำอธิบายข้อผิดพลาดภาษาไทยหรืออังกฤษ",
    "details": null
  }
}
```

---

# 3. Authentication & Session Handling

โปรเจกต์ใช้ **Supabase Auth** ผ่านแพ็กเกจ `@supabase/ssr` ในการยืนยันตัวตน และใช้ `proxy.ts` ทำหน้าที่เป็น Next.js Middleware เพื่อตรวจสอบความถูกต้องของ Cookie Session ล่วงหน้าก่อนเข้าถึง Route Handlers

1. **Client Auth Flow**: ผู้ใช้ส่ง Credentials มาที่ API
2. **Session Persistence**: Supabase ตรวจสอบความถูกต้องและสร้าง JWT Session บันทึกลงใน HTTP-only Cookie
3. **Middleware Interception**: `proxy.ts` ตรวจสอบ Cookie ทุก Request หากไม่มี Session ใน Route Protected จะตอบกลับด้วย 401 Unauthorized หรือ Redirect ไปที่ `/login`
4. **Data Sync**: นำ `supabaseId` มาแมปความสัมพันธ์กับตาราง `users` ใน MySQL 8.x ผ่าน Prisma

---

# 4. รายการ API Endpoints ที่ใช้งานจริง

อ้างอิงจาก Source Code ในไดเรกทอรี `app/api/` ที่มีอยู่จริงใน Repository:

## 4.1 Authentication Endpoints

### `POST /api/auth/register`
* **Purpose**: ลงทะเบียนผู้ใช้งานใหม่ในระบบผ่าน Supabase Auth พร้อมสร้างข้อมูลในตาราง `users` ของ MySQL
* **Access**: Public
* **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```
* **Success Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "c1f7a08b-8219-4a7f-9b0d-7dbfae9d1234",
      "email": "user@example.com",
      "supabaseId": "sup-uuid-9876",
      "status": "PENDING",
      "createdAt": "2026-08-06T20:00:00.000Z"
    }
  },
  "message": "Registration successful"
}
```

---

### `POST /api/auth/logout`
* **Purpose**: ลบ Session การเข้าสู่ระบบออกจาก Supabase Auth และเคลียร์ HTTP-only Cookies
* **Access**: Protected
* **Request Body**: *None*
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### `GET /api/auth/callback`
* **Purpose**: รองรับ OAuth / Email Verification Callback จาก Supabase Auth เพื่อแลกเปลี่ยน Auth Code เป็น Session Cookie
* **Access**: Public
* **Query Parameters**: `code` (string)
* **Response**: Redirect ไปยัง `/dashboard` หรือ Route ที่กำหนด

---

### `POST /api/auth/sync`
* **Purpose**: ซิงค์ข้อมูลระหว่าง Supabase Auth Session ปัจจุบันกับข้อมูลผู้ใช้ในตาราง `users` ของ MySQL
* **Access**: Protected
* **Request Body**: *None*
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "synced": true,
    "user": {
      "id": "c1f7a08b-8219-4a7f-9b0d-7dbfae9d1234",
      "email": "user@example.com",
      "supabaseId": "sup-uuid-9876"
    }
  }
}
```

---

## 4.2 User Management Endpoints

### `GET /api/user/profile`
* **Purpose**: ดึงข้อมูลโปรไฟล์, สมาชิก และการตั้งค่าของผู้ใช้ปัจจุบันที่ล็อกอินอยู่
* **Access**: Protected
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "id": "c1f7a08b-8219-4a7f-9b0d-7dbfae9d1234",
    "email": "user@example.com",
    "status": "ACTIVE",
    "profile": {
      "displayName": "Mister Siam",
      "username": "mistersiam",
      "avatar": null,
      "language": "EN"
    },
    "membership": {
      "plan": "FREE",
      "status": "TRIAL"
    },
    "preference": {
      "language": "EN",
      "theme": "SYSTEM",
      "currency": "THB"
    }
  }
}
```

---

### `PATCH /api/user/profile`
* **Purpose**: อัปเดตข้อมูลโปรไฟล์ส่วนตัวของผู้ใช้
* **Access**: Protected
* **Request Body**:
```json
{
  "displayName": "Siam Uttrakun",
  "bio": "Software Developer in Bangkok",
  "phone": "+66871125025",
  "language": "TH"
}
```
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "profile": {
      "displayName": "Siam Uttrakun",
      "bio": "Software Developer in Bangkok",
      "phone": "+66871125025",
      "language": "TH",
      "updatedAt": "2026-08-06T20:10:00.000Z"
    }
  },
  "message": "Profile updated successfully"
}
```

---

## 4.3 System & Health Check Endpoints

### `GET /api/test-db`
* **Purpose**: ตรวจสอบการเชื่อมต่อฐานข้อมูล MySQL บน Hostinger ผ่าน Prisma Query Engine
* **Access**: Public
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "status": "connected",
    "database": "MySQL 8.x",
    "timestamp": "2026-08-06T20:18:14.000Z"
  }
}
```

---

# 5. รายการ API Endpoints ที่วางแผนในอนาคต (Planned)

ตามที่ระบุในข้อกำหนดระบบและการตั้งค่าตัวแปรสภาพแวดล้อม (Environment Variables) Endpoints ต่อไปนี้อยู่ระหว่างการพัฒนา:

| Endpoint | Method | Access | Purpose / Description |
| :--- | :--- | :--- | :--- |
| `/api/ai/chat` | POST | Protected | ส่ง Prompt ประมวลผลกับ OpenAI API (`gpt-4.1`) |
| `/api/email/send-verification` | POST | Protected | ส่งอีเมลยืนยันตัวตนผ่าน Resend API |
| `/api/directory/businesses` | GET | Public | ค้นหาและดึงรายการ Business Directory |
| `/api/jobs/listings` | GET | Public | ดึงข้อมูลประกาศรับสมัครงาน |
| `/api/housing/listings` | GET | Public | ดึงข้อมูลรายการอสังหาริมทรัพย์และที่พัก |

---

# 6. การจัดการข้อผิดพลาด (Error Handling)

ระบบใช้ HTTP Status Codes ตามมาตรฐานสากล ร่วมกับ Error Envelopes:

| HTTP Status | Meaning | Description |
| :--- | :--- | :--- |
| `200 OK` | Success | ดำเนินการสำเร็จ |
| `201 Created` | Created | สร้างทรัพยากรใหม่สำเร็จ |
| `400 Bad Request` | Validation Error | ข้อมูลส่งมาไม่ถูกต้อง (Zod Validation Failed) |
| `401 Unauthorized` | Unauthenticated | ไม่พบ Auth Session หรือ Token หมดอายุ |
| `403 Forbidden` | Access Denied | ไม่มีสิทธิ์เข้าถึงทรัพยากร |
| `404 Not Found` | Resource Not Found | ไม่พบข้อมูลที่ร้องขอ |
| `500 Internal Error` | Server Error | ข้อผิดพลาดภายในระบบเซิร์ฟเวอร์ หรือการเชื่อมต่อ DB ล้มเหลว |

---

# 7. การตรวจสอบข้อมูล (Request Validation)

ทุก Request Body ที่ส่งเข้ามายัง API Route Handlers ต้องผ่านการตรวจสอบความถูกต้องด้วย **Zod Schema** เสมอ

### ตัวอย่างการ Validate ฝั่ง Server
```typescript
import { z } from "zod";
import { NextResponse } from "next/server";

const registerSchema = z.object({
  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
  password: z.string().min(8, "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร"),
});

export async function POST(request: Request) {
  const body = await request.json();
  const validation = registerSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "ข้อมูลนำเข้าไม่ถูกต้อง",
          details: validation.error.flatten().fieldErrors,
        },
      },
      { status: 400 }
    );
  }

  // ดำเนินการต่อเมื่อข้อมูลถูกต้อง...
}
```

---

# 8. ความปลอดภัยและการจำกัดสิทธิ์ (Security & Rate Limiting)

1. **SQL Injection Protection**: ใช้ Prisma ORM ที่แปลงคำสั่งเป็น Parameterized Queries โดยอัตโนมัติ
2. **Credential Protection**: รหัสผ่านของผู้ใช้ถูกจัดการทั้งหมดโดย Supabase Auth ไม่มีการเก็บบันทึกรหัสผ่านในฐานข้อมูล MySQL
3. **Secret Key Isolation**: API Keys สำคัญ (`SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, `RESEND_API_KEY`, `DATABASE_URL`) รันบน Server-side เท่านั้น และไม่มีคำว่า `NEXT_PUBLIC_` นำหน้า
4. **CORS & SameSite Cookies**: ตั้งค่า Cookie เป็น `SameSite=Lax` และ `HttpOnly` เพื่อป้องกัน XSS และ CSRF Attacks

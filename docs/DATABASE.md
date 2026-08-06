# สารบัญ (Table of Contents)
1. [ภาพรวมฐานข้อมูล](#1-ภาพรวมฐานข้อมูล)
2. [Database Architecture](#2-database-architecture)
3. [Naming Convention](#3-naming-convention)
4. [ตารางทั้งหมด (Database Tables)](#4-ตารางทั้งหมด-database-tables)
5. [รายละเอียดทุก Field](#5-รายละเอียดทุก-field)
6. [ความสัมพันธ์ของข้อมูล (Relationships)](#6-ความสัมพันธ์ของข้อมูล-relationships)
7. [ER Diagram](#7-er-diagram)
8. [Prisma Models](#8-prisma-models)
9. [Prisma Workflow](#9-prisma-workflow)
10. [Migration Guide](#10-migration-guide)
11. [Database Indexes](#11-database-indexes)
12. [Transactions](#12-transactions)
13. [Performance Guideline](#13-performance-guideline)
14. [Data Validation](#14-data-validation)
15. [Security](#15-security)
16. [Backup & Recovery](#16-backup--recovery)
17. [Environment Variables](#17-environment-variables)
18. [Best Practices](#18-best-practices)
19. [Troubleshooting](#19-troubleshooting)
20. [ภาคผนวก](#20-ภาคผนวก)

---

# 1. ภาพรวมฐานข้อมูล

เอกสารชุดนี้เป็นคู่มืออ้างอิงสถาปัตยกรรมระบบฐานข้อมูลของโปรเจกต์ **Mingalar Bangkok** ซึ่งออกแบบมาเพื่อรองรับแพลตฟอร์ม AI-First Super App สำหรับชาวเมียนมาร์ในประเทศไทย

* **ฐานข้อมูลที่ใช้**: MySQL 8.x (โฮสต์บน Hostinger Cloud)
* **ORM ที่ใช้**: Prisma ORM (Version 6.19.0)
* **เหตุผลที่เลือกใช้**: MySQL 8.x มอบประสิทธิภาพและความเสถียรสูงในการจัดการความสัมพันธ์ของข้อมูลแบบ Relational พร้อมรองรับระบบ Hosting ปัจจุบัน ส่วน Prisma ORM ช่วยให้การเขียนคำสั่งติดต่อฐานข้อมูลมีความปลอดภัยแบบ Type-safe ป้องกันข้อผิดพลาดล่วงหน้าขณะคอมไพล์โค้ด และจัดการ Schema Migration ได้อย่างเป็นระบบ

---

# 2. Database Architecture

สถาปัตยกรรมและการเชื่อมต่อระหว่างแอปพลิเคชันกับฐานข้อมูลแสดงดังแผนภาพด้านล่างนี้:

```text
+---------------------------------------------------+
|               Next.js Application                 |
|       (App Router & Server/Client Components)     |
+-------------------------+-------------------------+
                          |
                          | Prisma Client 6.x
                          | (Generated at /lib/generated/prisma)
                          v
+---------------------------------------------------+
|               Prisma Query Engine                 |
+-------------------------+-------------------------+
                          |
                          | TCP / TLS Connection
                          | (DATABASE_URL)
                          v
+---------------------------------------------------+
|                 MySQL 8.x Database                |
|               (Hostinger Cloud Remote)            |
+---------------------------------------------------+
```

---

# 3. Naming Convention

มาตรฐานการตั้งชื่อในระบบฐานข้อมูลของโปรเจกต์มีข้อกำหนดดังนี้:
* **ตาราง (Tables)**: ใช้ชื่อรูปพหูพจน์และตัวพิมพ์เล็กแบบ `snake_case` (เช่น `users`, `profiles`, `memberships`, `user_preferences`)
* **ฟิลด์ (Fields)**: ใช้รูปแบบ `camelCase` ภายใน Prisma Schema และแมปกับฐานข้อมูล (เช่น `supabaseId`, `emailVerified`, `lastLoginAt`)
* **Enum**: ใช้รูปแบบ `PascalCase` ทั้งชื่อ Enum และค่าข้างใน (เช่น `UserStatus`, `MembershipPlan`, `ACTIVE`, `PENDING`)
* **ความสัมพันธ์ (Relationships)**: อ้างอิงผ่าน Foreign Key (เช่น `userId`) พร้อมกำหนดการลบแบบ Cascade (`onDelete: Cascade`)
* **ดัชนี (Indexes)**: สร้างผ่านคำสั่ง `@unique` หรือคีย์หลัก `@id` ตามความจำเป็น
* **Migration**: จัดการผ่าน Prisma CLI ด้วยคำสั่งระบุชื่อให้สื่อความหมาย

---

# 4. ตารางทั้งหมด (Database Tables)

จากการตรวจสอบโครงสร้างใน `prisma/schema.prisma` ระบบประกอบด้วยตารางหลักทั้งหมด 4 ตาราง ดังนี้:

## 4.1 users
* **Purpose**: จัดเก็บข้อมูลบัญชีผู้ใช้หลักของระบบ เชื่อมโยงกับระบบยืนยันตัวตนภายนอก (Supabase Auth)
* **Primary Key**: `id` (UUID)
* **Relationships**: เชื่อมโยงแบบ One-to-One กับตาราง `profiles`, `memberships`, และ `user_preferences`
* **Indexes**: `id`, `supabaseId`, `email`
* **Unique Constraints**: `supabaseId`, `email`
* **ข้อควรระวัง**: มีฟิลด์ `deletedAt` สำหรับการทำ Soft Delete แอปพลิเคชันต้องตรวจสอบเงื่อนไข `deletedAt IS NULL` ในการดึงข้อมูลผู้ใช้ที่ยังใช้งานอยู่เสมอ

## 4.2 profiles
* **Purpose**: จัดเก็บข้อมูลรายละเอียดส่วนตัวของผู้ใช้งาน เช่น ชื่อ นามสกุล ชื่อภาษาเมียนมาร์ รูปโปรไฟล์ และที่อยู่
* **Primary Key**: `id` (UUID)
* **Relationships**: เชื่อมโยงแบบ One-to-One กับตาราง `users` ผ่านฟิลด์ `userId`
* **Indexes**: `id`, `userId`, `username`
* **Unique Constraints**: `userId`, `username`
* **ข้อควรระวัง**: ข้อมูลส่วนใหญ่เป็นค่า Nullable ยกเว้นความสัมพันธ์กับผู้ใช้งานหลัก

## 4.3 memberships
* **Purpose**: จัดเก็บข้อมูลระดับสมาชิกและสถานะสิทธิ์การใช้งานของผู้ใช้ (FREE, PLUS, PRO, BUSINESS)
* **Primary Key**: `id` (UUID)
* **Relationships**: เชื่อมโยงแบบ One-to-One กับตาราง `users` ผ่านฟิลด์ `userId`
* **Indexes**: `id`, `userId`
* **Unique Constraints**: `userId`
* **ข้อควรระวัง**: ต้องตรวจสอบวันหมดอายุ (`expiresAt`) ควบคู่กับสถานะ `status` เสมอเมื่อใช้งานฟีเจอร์จำกัดสิทธิ์

## 4.4 user_preferences
* **Purpose**: จัดเก็บการตั้งค่าส่วนบุคคลของผู้ใช้ เช่น ภาษา (Language), ธีมหน้าจอ (Theme), สกุลเงิน (Currency) และการตั้งค่าการแจ้งเตือน
* **Primary Key**: `id` (UUID)
* **Relationships**: เชื่อมโยงแบบ One-to-One กับตาราง `users` ผ่านฟิลด์ `userId`
* **Indexes**: `id`, `userId`
* **Unique Constraints**: `userId`
* **ข้อควรระวัง**: มีค่าเริ่มต้นถูกกำหนดไว้ใน Schema ชัดเจน (เช่น ภาษา EN, ธีม SYSTEM)

---

# 5. รายละเอียดทุก Field

### 5.1 ตาราง `users`
| Field Name | Data Type | Nullable | Default | Unique | Index | ความหมาย / คำอธิบาย |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | String (UUID) | No | uuid() | Yes | Primary Key | รหัสประจำตัวผู้ใช้หลัก |
| `supabaseId` | String | Yes | null | Yes | Yes | รหัสอ้างอิงจาก Supabase Auth |
| `email` | String | No | - | Yes | Yes | อีเมลผู้ใช้งาน |
| `emailVerified` | Boolean | No | false | No | No | สถานะการยืนยันอีเมล |
| `status` | UserStatus | No | PENDING | No | No | สถานะบัญชี (ACTIVE, INACTIVE, PENDING, SUSPENDED) |
| `lastLoginAt` | DateTime | Yes | null | No | No | เวลาเข้าสู่ระบบครั้งล่าสุด |
| `createdAt` | DateTime | No | now() | No | No | เวลาที่สร้างเรคอร์ด |
| `updatedAt` | DateTime | No | - | No | No | เวลาที่แก้ไขเรคอร์ดล่าสุด |
| `deletedAt` | DateTime | Yes | null | No | No | เวลาที่ถูกลบ ( Soft Delete ) |

### 5.2 ตาราง `profiles`
| Field Name | Data Type | Nullable | Default | Unique | Index | ความหมาย / คำอธิบาย |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | String (UUID) | No | uuid() | Yes | Primary Key | รหัสประจำตัวข้อมูลโปรไฟล์ |
| `userId` | String | No | - | Yes | Yes | รหัสผู้ใช้ที่เชื่อมโยง (Foreign Key) |
| `displayName` | String | Yes | null | No | No | ชื่อที่แสดงผลในระบบ |
| `username` | String | Yes | null | Yes | Yes | ชื่อผู้ใช้งานเฉพาะตัว (Username) |
| `firstName` | String | Yes | null | No | No | ชื่อจริง |
| `lastName` | String | Yes | null | No | No | นามสกุล |
| `myanmarName` | String | Yes | null | No | No | ชื่อภาษาเมียนมาร์ |
| `bio` | String (Text) | Yes | null | No | No | ประวัติย่อหรือคำอธิบายตัวตน |
| `avatar` | String | Yes | null | No | No | URL รูปภาพโปรไฟล์ |
| `coverImage` | String | Yes | null | No | No | URL ภาพปกโปรไฟล์ |
| `phone` | String | Yes | null | No | No | เบอร์โทรศัพท์ติดต่อ |
| `country` | String | Yes | null | No | No | ประเทศ |
| `province` | String | Yes | null | No | No | จังหวัด |
| `city` | String | Yes | null | No | No | เมือง |
| `language` | Language | No | EN | No | No | ภาษาหลักในโปรไฟล์ (EN, TH, MY) |
| `createdAt` | DateTime | No | now() | No | No | เวลาที่สร้างเรคอร์ด |
| `updatedAt` | DateTime | No | - | No | No | เวลาที่แก้ไขเรคอร์ดล่าสุด |

### 5.3 ตาราง `memberships`
| Field Name | Data Type | Nullable | Default | Unique | Index | ความหมาย / คำอธิบาย |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | String (UUID) | No | uuid() | Yes | Primary Key | รหัสประจำตัวข้อมูลสมาชิก |
| `userId` | String | No | - | Yes | Yes | รหัสผู้ใช้ที่เชื่อมโยง (Foreign Key) |
| `plan` | MembershipPlan | No | FREE | No | No | แผนสมาชิก (FREE, PLUS, PRO, BUSINESS) |
| `status` | MembershipStatus | No | TRIAL | No | No | สถานะสมาชิก (ACTIVE, EXPIRED, CANCELLED, TRIAL) |
| `startedAt` | DateTime | Yes | null | No | No | วันเวลาเริ่มต้นแผนสมาชิก |
| `expiresAt` | DateTime | Yes | null | No | No | วันเวลาหมดอายุแผนสมาชิก |
| `createdAt` | DateTime | No | now() | No | No | เวลาที่สร้างเรคอร์ด |
| `updatedAt` | DateTime | No | - | No | No | เวลาที่แก้ไขเรคอร์ดล่าสุด |

### 5.4 ตาราง `user_preferences`
| Field Name | Data Type | Nullable | Default | Unique | Index | ความหมาย / คำอธิบาย |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | String (UUID) | No | uuid() | Yes | Primary Key | รหัสประจำตัวการตั้งค่า |
| `userId` | String | No | - | Yes | Yes | รหัสผู้ใช้ที่เชื่อมโยง (Foreign Key) |
| `language` | Language | No | EN | No | No | ภาษาที่เลือกตั้งค่า (EN, TH, MY) |
| `theme` | Theme | No | SYSTEM | No | No | ธีมการแสดงผล (LIGHT, DARK, SYSTEM) |
| `currency` | String | No | THB | No | No | สกุลเงินหลักที่ใช้งาน |
| `emailNotification` | Boolean | No | true | No | No | เปิด/ปิดการแจ้งเตือนทางอีเมล |
| `pushNotification` | Boolean | No | true | No | No | เปิด/ปิดการแจ้งเตือนแบบ Push |
| `marketingEmail` | Boolean | No | false | No | No | การยินยอมรับอีเมลข่าวสารการตลาด |
| `createdAt` | DateTime | No | now() | No | No | เวลาที่สร้างเรคอร์ด |
| `updatedAt` | DateTime | No | - | No | No | เวลาที่แก้ไขเรคอร์ดล่าสุด |

---

# 6. ความสัมพันธ์ของข้อมูล (Relationships)

ความสัมพันธ์ทั้งหมดในระบบเป็นแบบ **One-to-One** ระหว่างตารางหลัก `User` และตารางย่อย โดยกำหนดเงื่อนไข `onDelete: Cascade` เพื่อให้ข้อมูลย่อยถูกลบโดยอัตโนมัติเมื่อข้อมูลผู้ใช้หลักถูกลบ

* **One-to-One**:
  * `User` (1) ↔ (1) `Profile` ผ่านฟิลด์ `userId`
  * `User` (1) ↔ (1) `Membership` ผ่านฟิลด์ `userId`
  * `User` (1) ↔ (1) `UserPreference` ผ่านฟิลด์ `userId`

ตัวอย่างการเขียน Query ดึงข้อมูลพร้อมความสัมพันธ์ผ่าน Prisma:
```typescript
const userWithRelations = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    profile: true,
    membership: true,
    preference: true,
  },
});
```

---

# 7. ER Diagram

โครงสร้างความสัมพันธ์ของฐานข้อมูลแสดงด้วย Mermaid Diagram:

```mermaid
erDiagram
    users {
        string id PK
        string supabaseId UK
        string email UK
        boolean emailVerified
        enum status
        datetime lastLoginAt
        datetime createdAt
        datetime updatedAt
        datetime deletedAt
    }

    profiles {
        string id PK
        string userId UK
        string displayName
        string username UK
        string firstName
        string lastName
        string myanmarName
        string bio
        string avatar
        string coverImage
        string phone
        string country
        string province
        string city
        enum language
        datetime createdAt
        datetime updatedAt
    }

    memberships {
        string id PK
        string userId UK
        enum plan
        enum status
        datetime startedAt
        datetime expiresAt
        datetime createdAt
        datetime updatedAt
    }

    user_preferences {
        string id PK
        string userId UK
        enum language
        enum theme
        string currency
        boolean emailNotification
        boolean pushNotification
        boolean marketingEmail
        datetime createdAt
        datetime updatedAt
    }

    users ||--o{ profiles : "has"
    users ||--o{ memberships : "has"
    users ||--o{ user_preferences : "has"
```

---

# 8. Prisma Models

สรุปหน้าที่ของ Prisma Models ทั้งหมดในระบบ:
1. **User**: บริหารจัดการข้อมูลบัญชีผู้ใช้ สถานะการยืนยันตัวตน และการเชื่อมต่อกับ Supabase Auth
2. **Profile**: บริหารจัดการรายละเอียดส่วนตัว ข้อมูลโปรไฟล์ และที่อยู่ของผู้ใช้งาน
3. **Membership**: บริหารจัดการระดับสมาชิก สถานะ และรอบเวลาการใช้งานแพ็กเกจ
4. **UserPreference**: บริหารจัดการการตั้งค่าส่วนบุคคล เช่น ภาษา ธีม และช่องทางการแจ้งเตือน

---

# 9. Prisma Workflow

คำสั่ง npm ที่ใช้งานจริงในโปรเจกต์ (อ้างอิงจาก `package.json` และ Prisma CLI):

* **Generate Prisma Client**:
  ```bash
  npx prisma generate
  ```
* **Development Migration**:
  ```bash
  npx prisma migrate dev
  ```
* **Production Migration Deployment**:
  ```bash
  npx prisma migrate deploy
  ```
* **Prisma Studio (GUI)**:
  ```bash
  npx prisma studio
  ```
* **Seed**: ยังไม่มีการกำหนด

---

# 10. Migration Guide

* **การเพิ่ม Table**: กำหนด Model ใหม่ใน `schema.prisma` แล้วรัน `npx prisma migrate dev --name add_<table_name>`
* **การเพิ่ม Column**: เพิ่ม Field ลงใน Model ที่เกี่ยวข้องแล้วรันคำสั่ง Migration
* **การลบ Column**: เอา Field ออกจาก Schema และรัน Migration
* **การ Rename**: ใช้ฟีเจอร์ `@map` หรือกำหนดชื่อคอลัมน์เดิมเพื่อป้องกันข้อมูลสูญหาย
* **Production Migration**: รันคำสั่ง `npx prisma migrate deploy` บนเซิร์ฟเวอร์ Hostinger
* **Rollback**: ใช้คำสั่งแก้ไข Migration หรือจัดการผ่านฐานข้อมูล MySQL โดยตรงตามสถานการณ์
* **ข้อควรระวัง**: ห้ามรันคำสั่งที่ทำลายโครงสร้างฐานข้อมูลบน Production โดยไม่มีการสำรองข้อมูลล่วงหน้า

---

# 11. Database Indexes

* **Index ที่มีอยู่จริง**:
  * `users`: `id` (Primary Key), `supabaseId` (Unique Index), `email` (Unique Index)
  * `profiles`: `id` (Primary Key), `userId` (Unique Index), `username` (Unique Index)
  * `memberships`: `id` (Primary Key), `userId` (Unique Index)
  * `user_preferences`: `id` (Primary Key), `userId` (Unique Index)
* **Composite Index**: ยังไม่มีการกำหนด
* **Unique Index**: ใช้ `@unique` บนฟิลด์สำคัญเพื่อป้องกันข้อมูลซ้ำซ้อน
* **Performance**: การค้นหาข้อมูลผ่าน `supabaseId`, `email`, และ `userId` มีประสิทธิภาพสูงเนื่องจากมี Index รองรับ

---

# 12. Transactions

การทำ Transaction ช่วยให้กระบวนการบันทึกข้อมูลหลายตารางมีความถูกต้องสมบูรณ์แบบพร้อมเพรียงกัน (Atomicity):

ตัวอย่างการใช้ Prisma `$transaction`:
```typescript
const result = await prisma.$transaction(async (tx) => {
  const newUser = await tx.user.create({
    data: {
      email: "test@example.com",
      supabaseId: "supabase-uuid-123",
    },
  });

  await tx.profile.create({
    data: {
      userId: newUser.id,
      displayName: "Mingalar User",
    },
  });

  return newUser;
});
```

---

# 13. Performance Guideline

* **Pagination**: ควรใช้การแบ่งหน้าข้อมูลเมื่อต้องดึงข้อมูลจำนวนมาก
* **Select เฉพาะ Field ที่ใช้**: หลีกเลี่ยงการดึงข้อมูลทั้งหมดโดยไม่จำเป็น เพื่อลดขนาด Payload
* **Include Relation เท่าที่จำเป็น**: จำกัดการใช้ `include` เฉพาะความสัมพันธ์ที่จะนำไปใช้งานจริงเท่านั้น
* **หลีกเลี่ยง N+1 Query**: ใช้เทคนิค Batch Query หรือ `include` ร่วมกับการดึงข้อมูลรอบเดียว
* **Query Optimization**: หมั่นตรวจสอบการใช้ Index ในคอลัมน์ที่มีการสืบค้นบ่อย

---

# 14. Data Validation

* **Validation**: ใช้ **Zod** ร่วมกับ **React Hook Form** ในการตรวจสอบความถูกต้องของข้อมูลรับเข้า
* **Prisma**: ตรวจสอบความถูกต้องของประเภทข้อมูลผ่าน Type-safety ของ Prisma Client
* **Database Constraints**: ควบคุมกฎเกณฑ์ของข้อมูลด้วยคีย์หลัก คีย์นอก และเงื่อนไข Unique / Not Null ในระดับ MySQL

---

# 15. Security

* **SQL Injection**: ป้องกันโดยอัตโนมัติผ่านระบบ Parameterized Queries ของ Prisma ORM
* **Soft Delete**: ใช้ฟิลด์ `deletedAt` บนตาราง `users` เพื่อรักษาความสมบูรณ์ของข้อมูลและรองรับการตรวจสอบย้อนหลัง
* **Sensitive Data**: ข้อมูลความลับและรหัสผ่านถูกจัดการทั้งหมดโดย Supabase Auth ไม่มีการเก็บบันทึกรหัสผ่านในตาราง MySQL
* **Encryption**: การรับส่งข้อมูลระหว่างแอปพลิเคชันและฐานข้อมูลเข้ารหัสผ่านเครือข่ายปลอดภัย (TLS/SSL)

---

# 16. Backup & Recovery

* ยังไม่มีการกำหนด

---

# 17. Environment Variables

ตัวแปรสภาพแวดล้อมที่เกี่ยวข้องกับฐานข้อมูล:
* `DATABASE_URL`: Connection string สำหรับเชื่อมต่อกับ MySQL 8.x บน Hostinger (รูปแบบ: `mysql://username:password@host:3306/database_name`)
* Shadow Database: ยังไม่มีการกำหนด

---

# 18. Best Practices

* ใช้ Prisma Client เป็นช่องทางเดียวในการติดต่อสื่อสารกับฐานข้อมูล
* ตรวจสอบข้อมูลนำเข้าด้วย Zod Schema ทุกครั้งก่อนส่งต่อไปยังฐานข้อมูล
* ใช้ Path Alias (`@/`) ในการอ้างอิงไฟล์เพื่อให้โค้ดเป็นระเบียบ
* รักษาความปลอดภัยของไฟล์ตั้งค่าและห้ามนำไฟล์ `.env.local` ขึ้นสู่ระบบควบคุมเวอร์ชัน (Git)

---

# 19. Troubleshooting

* **Prisma Generate**: หากเกิดปัญหาประเภทข้อมูลไม่ตรง ให้รันคำสั่ง `npx prisma generate` ใหม่
* **Migration Failed**: ตรวจสอบสถานะและข้อผิดพลาดด้วยคำสั่ง `npx prisma migrate status`
* **Connection Error**: ตรวจสอบค่า `DATABASE_URL` ใน `.env.local` และสถานะการเปิดใช้งานของ MySQL บน Hostinger
* **MySQL Authentication**: ตรวจสอบสิทธิ์การเข้าใช้งานและรหัสผ่านใน Connection String
* **Schema Drift**: แก้ไขโดยการปรับปรุงสคีมาหรือจัดการผ่าน Migration ให้สอดคล้องกัน

---

# 20. ภาคผนวก

รวมคำสั่ง npm ที่มีอยู่จริงและใช้งานในโปรเจกต์ (อ้างอิงจาก `package.json`):
* `npm run dev`: เริ่มต้นเซิร์ฟเวอร์สำหรับพัฒนาโปรเจกต์
* `npm run build`: คอมไพล์โปรเจกต์สำหรับใช้งานบน Production
* `npm run start`: เริ่มต้นเซิร์ฟเวอร์ Production
* `npm run lint`: ตรวจสอบและค้นหาข้อผิดพลาดของโค้ดด้วย ESLint

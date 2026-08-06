# 🚀 PS_COMMANDS.md

> **Mingalar Bangkok**
> **PowerShell Quick Reference**
> Next.js 16 • Prisma ORM • MySQL • Git

---

# ☀️ Start Working

เปิดโปรเจกต์และเตรียมสภาพแวดล้อม

```powershell
# อ่านงานที่ต้องทำ
Get-Content .\TODO.md

# ดึงโค้ดล่าสุด
git pull origin main

# ตรวจสอบสถานะ Git
git status

# เปิด Prisma Studio (ถ้าต้องใช้)
npx prisma studio

# เริ่ม Development Server
npm run dev
```

---

# 🌙 End Working

ก่อนเลิกงานทุกครั้ง

```powershell
# ตรวจสอบโค้ด
npm run lint

# อัปเดต TODO
code .\TODO.md

# Commit
git add .
git commit -m "feat(scope): description"

# Push
git push origin main

# ล้างหน้าจอ
cls
```

---

# 🚀 Before Deploy

เช็กทุกอย่างก่อนขึ้น Production

```powershell
# Lint
npm run lint

# Generate Prisma Client
npx prisma generate

# Production Build
npm run build

# ทดลองรัน Production
npm run start

# Deploy Migration
npx prisma migrate deploy

# Push Source
git add .
git commit -m "chore(release): production deployment"
git push origin main
```

---

# 📦 NPM Commands

| Command           | Description          |
| ----------------- | -------------------- |
| `npm install`     | ติดตั้ง Packages     |
| `npm i <package>` | ติดตั้ง Package ใหม่ |
| `npm run dev`     | Development Server   |
| `npm run build`   | Production Build     |
| `npm run start`   | รัน Production       |
| `npm run lint`    | ตรวจสอบ ESLint       |

---

# 🗄 Prisma Commands

| Command                     | Description                       |
| --------------------------- | --------------------------------- |
| `npx prisma generate`       | Generate Prisma Client            |
| `npx prisma migrate dev`    | Migration สำหรับ Development      |
| `npx prisma migrate deploy` | Migration สำหรับ Production       |
| `npx prisma studio`         | เปิด Prisma Studio                |
| `npx prisma db push`        | Push Schema โดยไม่สร้าง Migration |

---

# 🐙 Git Commands

## ตรวจสอบสถานะ

```powershell
git status
```

## ดึงโค้ดล่าสุด

```powershell
git pull origin main
```

## Commit

```powershell
git add .
git commit -m "feat(scope): message"
git push origin main
```

## ดูประวัติ

```powershell
git log --oneline -10
```

## สร้าง Branch

```powershell
git checkout -b feature/new-feature
```

---

# 📁 File Commands

| Command               | Description           |
| --------------------- | --------------------- |
| `pwd`                 | ตำแหน่งปัจจุบัน       |
| `ls`                  | รายการไฟล์            |
| `cd ..`               | ย้อนกลับหนึ่งโฟลเดอร์ |
| `Get-Content file.md` | อ่านไฟล์              |
| `code .`              | เปิด VS Code          |
| `code file.md`        | เปิดไฟล์              |
| `cls`                 | ล้างหน้าจอ            |

---

# 🧹 Clean Cache

ลบ Cache ของ Next.js

```powershell
Remove-Item -Recurse -Force .\.next
```

ลบ node_modules

```powershell
Remove-Item -Recurse -Force .\node_modules
```

ติดตั้งใหม่

```powershell
npm install
```

---

# 🔍 Port Troubleshooting

ดูว่าใครใช้ Port 3000

```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess
```

ปิด Process

```powershell
Stop-Process -Id <PID> -Force
```

ปิด Node ทั้งหมด

```powershell
Stop-Process -Name "node" -Force
```

---

# ⚡ Quick Combos

## เปิดงาน

```powershell
Get-Content .\TODO.md; git pull origin main; npm run dev
```

---

## Build Test

```powershell
npm run lint; npx prisma generate; npm run build
```

---

## Save Progress

```powershell
git add .; git commit -m "wip: progress"; git push origin main
```

---

## Full Release

```powershell
npm run lint
npx prisma generate
npm run build
git add .
git commit -m "chore(release)"
git push origin main
```

---

# 💡 Daily Rule

ก่อนเริ่มงาน

* อ่าน `TODO.md`
* `git pull`
* `npm run dev`

ก่อน Commit

* `npm run lint`

ก่อน Deploy

* `npm run build`
* `npx prisma migrate deploy`

อย่า Deploy ถ้า Build ยังไม่ผ่าน

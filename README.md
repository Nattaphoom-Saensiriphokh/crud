# Fetching Data – Next.js CRUD ข้อมูลนักศึกษา

โปรเจกต์ Next.js (App Router + TypeScript) สำหรับจัดการข้อมูลนักศึกษา ใช้ **Prisma + SQLite** เป็นฐานข้อมูล และ **Zod** ตรวจสอบข้อมูลก่อนบันทึก
ในงานนี้ฝึกเรื่อง **การดึงข้อมูล (Fetching Data)** ได้แก่ Loading UI, Suspense, Skeleton, not-found และ Error Handling

> โปรเจกต์นี้ fork มาจาก [it-nkc/crud](https://github.com/it-nkc/crud)

## 🛠️ เทคโนโลยีที่ใช้

| เทคโนโลยี | รายละเอียด |
| --- | --- |
| [Next.js](https://nextjs.org) 16 | React Framework (App Router) |
| React 19 + TypeScript | UI และภาษาหลัก |
| [Prisma](https://www.prisma.io) 7 | ORM |
| SQLite (better-sqlite3) | ฐานข้อมูลแบบไฟล์ (`dev.db`) |
| [Zod](https://zod.dev) | Validation ข้อมูลฟอร์ม |
| [Tailwind CSS](https://tailwindcss.com) 4 | จัดการ Style |

## ⚙️ สิ่งที่ต้องมีก่อนติดตั้ง

- [Node.js](https://nodejs.org) เวอร์ชัน 20 ขึ้นไป (แนะนำ LTS)
- npm
- Git

## 🚀 วิธีการติดตั้ง

**1. Clone โปรเจกต์**

```bash
git clone https://github.com/Nattaphoom-Saensiriphokh/crud.git
cd crud
```

**2. ติดตั้ง dependencies**

```bash
npm install
```

**3. ตรวจสอบไฟล์ `.env`**

ในโปรเจกต์มีไฟล์ `.env` อยู่แล้ว ให้ตรวจสอบว่ามีค่าชี้ไปที่ฐานข้อมูล SQLite

```env
DATABASE_URL="file:./dev.db"
```

**4. เตรียม Prisma**

```bash
npx prisma generate
```

**5. รันโปรเจกต์**

```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

## 📖 วิธีการใช้งาน

| หน้า | URL | รายละเอียด |
| --- | --- | --- |
| รายชื่อนักศึกษา | `/students` | แสดงข้อมูลนักศึกษาทั้งหมด |
| เพิ่มนักศึกษา | `/students/create` | ฟอร์มเพิ่มข้อมูล พร้อมตรวจสอบด้วย Zod |
| ตัวอย่าง Loading / Suspense | `/blogs` | ดึงข้อมูลบทความจาก `api.vercel.app/blog` |
| ตัวอย่างหน้ารายละเอียด + not-found | `/blogs/[id]` | ใส่ id ที่ไม่มีจริงเพื่อดูหน้า 404 |
| ตัวอย่าง Skeleton | `/skeleton` | ตัวอย่างโครง Skeleton |

### ฟอร์มเพิ่มนักศึกษา

กรอกข้อมูลตามช่องต่อไปนี้ แล้วกด **บันทึก**

| ฟิลด์ | เงื่อนไข |
| --- | --- |
| รหัสนักศึกษา (`studentCode`) | จำเป็น, ไม่เกิน 20 ตัวอักษร, ห้ามซ้ำ |
| ชื่อ-นามสกุล (`name`) | จำเป็น, ไม่เกิน 100 ตัวอักษร |
| Email (`email`) | ไม่บังคับ, ต้องเป็นรูปแบบอีเมลที่ถูกต้อง |
| สาขา (`major`) | จำเป็น, ไม่เกิน 100 ตัวอักษร |
| ชั้นปี (`year`) | จำนวนเต็ม 1–8 |

ถ้าข้อมูลไม่ถูกต้อง ระบบจะแสดงข้อความ error ใต้ช่องนั้น ถ้าถูกต้องจะบันทึกและกลับไปหน้า `/students`

## 🧩 สิ่งที่ทำในงานนี้

### 1. Validation ด้วย Zod
ตรวจสอบข้อมูลที่ `app/students/validation.ts` ก่อนส่งเข้า Prisma

```
FormData → Zod → ข้อมูลถูกต้อง? ── ไม่ → แสดง Error
                                └─ ใช่ → Prisma → บันทึกลง Database
```

### 2. Loading UI (`loading.tsx`)
แสดงข้อความระหว่างรอโหลดหน้า ใช้ไฟล์ `loading.tsx` ในโฟลเดอร์ route

### 3. Suspense
ห่อเฉพาะส่วนที่โหลดช้าด้วย `<Suspense fallback={...}>` เพื่อให้ส่วนอื่นของหน้าแสดงได้ก่อน

```tsx
<Suspense fallback={<BlogListSkeleton />}>
  <Blogs />
</Suspense>
```

### 4. Skeleton
สร้างโครงการ์ดจำลอง (`app/ui/my-skeleton.tsx`) ด้วย `animate-pulse` ของ Tailwind ใช้เป็น fallback ระหว่างโหลดข้อมูล

### 5. not-found
เรียก `notFound()` เมื่อไม่พบข้อมูล และกำหนดหน้า 404 เองที่ `app/blogs/not-found.tsx`

### 6. Error Handling
- `app/blogs/error.tsx` จัดการ error เฉพาะ route
- `app/global-error.tsx` จัดการ error ระดับทั้งแอป

> หมายเหตุ: การหน่วงเวลา 3 วินาทีในโค้ด (`setInterval`) ใช้สำหรับทดสอบ Loading เท่านั้น

## 📁 โครงสร้างโปรเจกต์

```
crud/
├── app/
│   ├── students/        # หน้านักศึกษา + validation
│   ├── blogs/           # ตัวอย่าง Suspense / not-found / error
│   ├── skeleton/        # ตัวอย่าง Skeleton
│   ├── ui/              # Component ที่ใช้ร่วมกัน
│   └── global-error.tsx
├── prisma/              # Prisma schema
├── public/
├── dev.db               # ฐานข้อมูล SQLite
└── package.json
```

## 📜 คำสั่งที่ใช้บ่อย

| คำสั่ง | ความหมาย |
| --- | --- |
| `npm run dev` | รันโหมดพัฒนา |
| `npm run build` | Build สำหรับ production |
| `npm run start` | รันโปรเจกต์ที่ build แล้ว |
| `npm run lint` | ตรวจโค้ดด้วย ESLint |
| `npx prisma studio` | เปิดหน้าดูข้อมูลในฐานข้อมูล |

## 👤 ผู้พัฒนา

- **Nattaphoom Saensiriphokh** – [GitHub](https://github.com/Nattaphoom-Saensiriphokh)

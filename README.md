# 🎨 MyBlog - Frontend (Next.js 15)

หน้ากากบล็อกส่วนตัวระดับพรีเมียมที่เน้นความเร็ว ความสวยงาม และ SEO โดยใช้เทคโนโลยีล่าสุดจาก Next.js 15

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Data Fetching**: Axios & HttpClient pattern
- **Notification**: Sonner (Toast)

---

## 🚀 Getting Started

### 1. ติดตั้ง Dependencies

```bash
npm install
```

### 2. ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` ไว้ที่ Root ของโฟลเดอร์ `myblog`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 3. รันโปรเจกต์ (Development)

```bash
npm run dev
```

เปิดบราวเซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

---

## 📁 Folder Structure

โครงสร้างของโปรเจกต์ถูกจัดระเบียบตามมาตรฐานของ Next.js (App Router) ดังนี้:

### 1. `app/` (Core Routes & Pages)
- **`admin/`**: ระบบหลังบ้านสำหรับจัดการบทความและคอมเมนต์
  - `dashboard/`: หน้าตารางรวมข้อมูล (Management Overview)
  - `blogs/`: ฟอร์มสร้างและแก้ไขบทความ (Create/Edit Blog)
- **`blog/`**: ส่วนแสดงผลบทความสำหรับบุคคลทั่วไป
  - `[slug]/`: หน้ารายละเอียดบทความรายชิ้น (Dynamic Route)
- **`login/`**: หน้าเข้าสู่ระบบสำหรับ Admin
- **`layout.tsx`**: โครงสร้างหลัก (Navbar, Footer, Providers) ที่ใช้ร่วมกันทั้งเว็บ
- **`page.tsx`**: หน้าแรกของเว็บไซต์ (Home Page)

### 2. `app/components/` (UI & Feature Components)
- **`blog/`**: คอมโพเนนต์เฉพาะสำหรับหน้าบทความ (เช่น `CommentForm`, `ArticleHeader`)
- **`home/`**: คอมโพเนนต์สำหรับหน้าแรก (เช่น `Hero`, `SearchBar`)
- **`ui/`**: คอมโพเนนต์พื้นฐานที่นำกลับมาใช้ซ้ำได้ (เช่น `Button`, `Input`, `Card`, `Breadcrumb`)

### 3. `app/lib/` (Utilities & Logic)
- **`api.ts`**: การตั้งค่า `HttpClient` (Axios) เพื่อเชื่อมต่อกับ Backend
- **`types.ts`**: คำนิยาม TypeScript Interfaces ทั้งหมด (Blog, Comment, API Response)
- **`utils.ts`**: ฟังก์ชันช่วยเหลือทั่วไป (เช่น การจัดรูปแบบวันที่, การสุ่มชื่อ)
- **`blog-utils.ts`**: ฟังก์ชันเฉพาะทางสำหรับการจัดการบล็อกและไฟล์รูปภาพ

### 4. `public/` (Assets)
- เก็บไฟล์รูปภาพ Static, โลโก้ และไฟล์ Assets ต่างๆ

---

## 💎 Key Features ในฝั่ง Frontend

- **Glassmorphism Design**: พื้นหลังโปร่งแสงพร้อมเบลอ (Backdrop Blur) ให้ความรู้สึกหรูหรา
- **Dynamic SEO**: ระบบ Generate Metadata อัตโนมัติในหน้าบทความ
- **Interactive Comment Form**: ฟอร์มคอมเมนต์ที่แก้ชื่อเองได้และมีระบบสุ่มชื่อ
- **Image Gallery**: ระบบแสดงรูปภาพหลายใบพร้อมแอนิเมชันตอนเปลี่ยนรูป
- **Breadcrumbs**: ระบบนำทางที่ช่วยให้ผู้ใช้ไม่หลงทาง

---

## 📦 Production Build

หากต้องการ Build เพื่อใช้งานจริง:

```bash
npm run build
npm run start
```

---

Created with  by Antigravity

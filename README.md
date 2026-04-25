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

- `app/`: หน้าเว็บหลักและระบบ Routing (App Router)
- `components/`: UI Components แยกตามส่วนการใช้งาน (blog, home, ui)
- `lib/`: ฟังก์ชันเสริม, API Client และการจัดการ Type
- `public/`: ไฟล์รูปภาพและ Assets คงที่

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

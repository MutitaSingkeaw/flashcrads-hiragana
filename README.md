# Kana Kissa

เว็บแอปแฟลชการ์ดฮิรางานะพื้นฐาน 46 ตัว พร้อมภาพช่วยจำ เสียงอ่าน คำศัพท์ และการบันทึกความคืบหน้าในอุปกรณ์

## ใช้งานในเครื่อง

```bash
npm install
npm run dev
```

## ตรวจสอบคุณภาพ

```bash
npm test
npm run lint
npm run build
```

โปรเจกต์เป็น Static SPA ไม่มี backend ใช้ Web Speech API สำหรับเสียง และ Service Worker สำหรับ offline cache หลังเปิดเว็บครั้งแรก

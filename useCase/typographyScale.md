## Use Case: Typography Scale จาก Design ที่ยังไม่ถูก Normalize

### บริบทของปัญหา

ในหลายโปรเจกต์ Design (เช่น Figma) มักมีการกำหนดขนาดตัวอักษร (Typography) แบบกระจัดกระจาย เช่น

- ใช้ font-size หลายค่าที่ใกล้เคียงกันมาก (17px, 18px, 19px)
- Heading แต่ละหน้ามีสัดส่วนไม่เท่ากัน
- Line-height และ spacing ไม่สม่ำเสมอ

เมื่อพัฒนาเป็นโค้ดจริง จะทำให้:

- CSS ซ้ำซ้อนและดูแลยาก
- ดีไซน์ดูไม่เป็นระบบ (visual rhythm ไม่สม่ำเสมอ)
- ปรับขนาด responsive ได้ยาก

### เป้าหมายของ Typography Scale

- สร้างระบบตัวอักษรที่เป็นมาตรฐานเดียวกันทั้งเว็บ
- ลดจำนวน font-size ที่ไม่จำเป็น
- รองรับ responsive design อย่างเป็นระบบ
- เชื่อม Design → Code ได้ชัดเจน

### แนวคิดการแก้ปัญหา

แทนที่จะยึด font-size ตาม Design ทุกจุด เราจะ:

1. วิเคราะห์ Design ที่ยังไม่ normalize
2. จัดกลุ่มขนาดตัวอักษรตามบทบาท (role-based)
3. สร้าง Typography Scale กลาง (Design Token)
4. นำ Scale ไปใช้จริงใน CSS / Component

---

### ขั้นตอนที่ 1: วิเคราะห์ Design

ตัวอย่างจาก Design ที่พบ:

- Heading ใหญ่: 46px, 48px, 50px
- Heading กลาง: 30px, 32px
- Body text: 15px, 16px, 17px

สังเกตว่า:

- ขนาดใกล้กันมาก
- ไม่มีสัดส่วนที่ชัดเจน

---

### ขั้นตอนที่ 2: Normalize เป็น Typography Scale

กำหนด Scale กลาง เช่น:

| Role  | Font size |
| ----- | --------- |
| H1    | 48px      |
| H2    | 36px      |
| H3    | 28px      |
| H4    | 22px      |
| Body  | 16px      |
| Small | 14px      |

จากนั้น map ขนาดใน Design เข้ากับ Scale นี้แทน

---

### ขั้นตอนที่ 3: สร้าง Design Token

กำหนดค่าเป็นตัวแปรกลาง เช่น

- `--font-size-4xl`
- `--font-size-3xl`
- `--font-size-2xl`
- `--font-size-base`

เพื่อให้ทุกทีมอ้างอิงชุดเดียวกัน

---

### ขั้นตอนที่ 4: ใช้งานจริงใน Code

ใช้ Typography Scale กับ semantic tag (h1–h6, p) และรองรับ responsive ด้วย `clamp()`

ผลลัพธ์ที่ได้:

- ขนาดตัวอักษรสม่ำเสมอทั้งเว็บ
- เปลี่ยน scale ได้จากจุดเดียว
- Design และ Code พูดภาษาเดียวกัน

---

### ประโยชน์ที่ได้

- ลดความซับซ้อนของ CSS
- เพิ่มความสอดคล้องของ UI
- รองรับการเติบโตของระบบในอนาคต
- เหมาะสำหรับ Design System และ Component Library

---

### สรุป

Typography Scale คือสะพานเชื่อมระหว่าง Design ที่ยังไม่เป็นระบบ กับ Code ที่ต้องการความเป็นมาตรฐาน การ normalize ตั้งแต่ต้น จะช่วยประหยัดเวลาและลดปัญหาในระยะยาวอย่างมาก


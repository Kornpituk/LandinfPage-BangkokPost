# Bangkok Post – Landing Campaign 76 Years

โปรเจกต์นี้เป็น **Landing Campaign 76 ปี Bangkok Post**  
พัฒนาด้วย **HTML, CSS และ Vanilla JavaScript**  
ออกแบบมาเพื่อรองรับ **legacy codebase** ที่มีอยู่เดิม  
พร้อมปรับโครงสร้างไฟล์ให้เป็นระบบ อ่านง่าย และดูแลต่อได้ในระยะยาว

---

## Entry Point

- หน้าเริ่มต้นของโปรเจกต์  
  **`landingPage.html`**

---

## Tech Stack

- HTML5
- CSS3
  - Bootstrap
  - Custom CSS (structured by responsibility)
- Vanilla JavaScript (no framework)
- Third-party libraries (stored locally)

---

## Project Structure

โครงสร้างโปรเจกต์ถูกจัดใหม่โดยแยกตาม **ประเภทของไฟล์**  
เพื่อให้ง่ายต่อการดูแล แก้ไข และขยายในอนาคต

├── .vscode/ # VS Code settings
│
├── assets/
│ └── images/ # รูปภาพทั้งหมด (campaign, banner, icon)
│
├── fonts/ # Web fonts
│
├── styles/
│ └── css/ # CSS ทั้งหมดของโปรเจกต์
│ ├── base/ # reset, variables, global rules
│ ├── layout/ # header, footer, navigation
│ ├── sections/ # page / section specific styles
│ └── legacy/ # legacy styles (forum / old campaign)
│
├── js/
│ ├── components/ # UI components (component-based mindset)
│ │ ├── anniversaryGiveaway/
│ │ ├── giveaway/
│ │ └── help/
│ │
│ ├── utils/ # Shared helper functions
│ │
│ └── vendors/ # Third-party libraries (DO NOT EDIT)
│
├── backup/ # Backup / deprecated files
│
├── useCase/ # Business / page-specific logic
│
└── landingPage.html # Main entry page


---

## Folder Responsibilities

### `assets/images/`

ใช้เก็บรูปภาพทั้งหมดของโปรเจกต์  
เช่น campaign image, banner, thumbnail  
ไม่ควรเก็บ CSS หรือ JavaScript ในโฟลเดอร์นี้

---

### `fonts/`

ใช้เก็บ web fonts ทั้งหมด  
ช่วยให้จัดการ `@font-face` และ performance ได้ง่ายขึ้น

---

### `styles/css/`

โฟลเดอร์ CSS หลัก แยกตามหน้าที่อย่างชัดเจน

#### `base/`

- reset.css
- variables.css
- typography
- utility classes

ใช้สำหรับ global styles เท่านั้น  
ไม่ควรใส่ style ของ section หรือ page ลงที่นี่

---

#### `layout/`

ใช้สำหรับโครงสร้างหลักของหน้าเว็บ เช่น

- header
- footer
- navigation
- grid

---

#### `sections/`

CSS ที่ผูกกับ section หรือ page เฉพาะ เช่น

- landing
- giveaway
- foundation
- promotions
- help

---

#### `legacy/`

**Legacy styles**

- ใช้สำหรับระบบหรือแคมเปญเก่า
- แก้ไขเฉพาะเมื่อจำเป็น
- ไม่ควร reuse ใน feature ใหม่

---

### `js/components/`

JavaScript ถูกเขียนในแนว **component-based** (แม้ไม่ใช้ framework)

แนวทาง:

- 1 component = 1 folder
- component ดูแล DOM และ event ของตัวเอง
- ลดการเขียน logic แบบ global

ตัวอย่าง:

js/components/giveaway/
├── index.js
├── modal.js
└── form.js


---

### `js/utils/`

ฟังก์ชันที่ใช้ซ้ำได้หลายที่ เช่น

- DOM helpers
- formatter
- validation
- API helpers

---

### `js/vendors/`

Library ภายนอก เช่น slider, slot machine, polyfill  
ห้ามแก้ไขโค้ดในโฟลเดอร์นี้

---

## Coding Guidelines

### JavaScript

- ใช้ `const` / `let`
- หลีกเลี่ยง global variables
- แยก logic เป็น component
- ห้ามเขียน inline script ใน HTML

---

### CSS

- หลีกเลี่ยง global selector (`div`, `p`, `h1`)
- ใช้ class-based styling
- แยกไฟล์ตาม responsibility
- ห้ามแก้ vendor CSS โดยตรง

---

## Legacy Notes

- โฟลเดอร์ `legacy/` และ `backup/` ถือเป็น legacy
- Feature ใหม่ไม่ควรพึ่งพา legacy styles
- หากจำเป็นต้องแก้ legacy code ต้อง comment ให้ชัดเจน

---

## Summary of Refactoring Work

สิ่งที่ได้ดำเนินการแล้ว:

- แยกรูปภาพทั้งหมดไปไว้ที่ `assets/images/`
- แยก CSS ทั้งหมดไปไว้ที่ `styles/css/`
- แยก JavaScript ไปไว้ที่ `js/`
- แยก fonts ไปไว้ที่ `fonts/`
- แตกไฟล์ CSS ใหญ่ ออกเป็นไฟล์ย่อยตามหมวด:
  - `base`
  - `layout`
  - `sections`
- ใช้ไฟล์ CSS กลางเป็นตัวรวม (`@import`)
- ปรับโครงสร้างโดยลดผลกระทบต่อ legacy code เดิม

โครงสร้างนี้ช่วยให้:

- แก้ไขแต่ละส่วนได้ง่าย
- ลดความเสี่ยงในการกระทบโค้ดเก่า
- รองรับการขยายในอนาคต

---

## Maintained By

**Kornpitak Kannika Kan**  
Frontend Developer

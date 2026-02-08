1. แยกรูปมาใส่ที่ assets/images
2. แยก css มาใส่ที่ styles/css
3. แยก js มาใส่ที่ styles/js
4. แยก fonts มาใส่ที่ fonts

หน้าหลักจะอยู่ที่ labdinfPage.html

# Bangkok Post – Frontend Legacy Project

โปรเจกต์นี้เป็นเว็บข่าว/เว็บแคมเปญที่พัฒนาด้วย **HTML, CSS, Vanilla JavaScript**  
ออกแบบมาเพื่อรองรับ **legacy codebase** แต่ใช้แนวคิดการจัดโครงสร้างแบบ modern frontend
เพื่อให้ง่ายต่อการดูแลและพัฒนาต่อในระยะยาว

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

โครงสร้างโปรเจกต์ถูกออกแบบให้แยกตาม **responsibility** และ **use case/domain**

├── .vscode/ # VS Code settings
│
├── assets/ # Static assets
│ ├── BW/ # Black & White images
│ ├── colour/ # Color assets
│ ├── logo/ # Logos
│ └── pic/ # General images
│
├── backup/ # Backup / deprecated files
│
├── fonts/ # Web fonts
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
├── styles/
│ ├── base/ # Global styles (reset, variables, base rules)
│ │
│ ├── layout/ # Layout styles (header, footer, grid)
│ │
│ ├── sections/ # Page/section-specific styles
│ │
│ ├── forum2022/ # Legacy forum styles (⚠ legacy)
│ │ └── backUp/
│ │
│ ├── foundation/ # Foundation-related styles
│ ├── giveaway/ # Giveaway campaign styles
│ ├── giveBackPromotions/ # Promotion styles
│ └── help/ # Help page styles
│
└── useCase/ # Page-specific or business-specific implementations

## Folder Responsibilities

### `assets/`

ใช้เก็บ static files ทั้งหมด เช่น รูป โลโก้ ไอคอน  
❗ ไม่ควร import logic หรือ style ตรงจากโฟลเดอร์นี้

### `js/components/`

เขียน JavaScript ในแนว **component-based**

- 1 component = 1 folder
- แต่ละ component ควรจัดการ DOM ของตัวเอง
- หลีกเลี่ยงการเขียน logic กระจายหลายไฟล์

ตัวอย่าง:

js/components/giveaway/
├── index.js
├── modal.js
└── form.js

### `js/utils/`

ฟังก์ชันที่ใช้ซ้ำได้หลายที่ เช่น:

- DOM helpers
- formatter
- validation
- API helpers

### `js/vendors/`

Library ภายนอก (เช่น slider, carousel, polyfill)
❌ **ห้ามแก้ไขโค้ดในโฟลเดอร์นี้**

### `styles/base/`

Global CSS:

- reset.css
- variables.css
- typography
- utility classes

⚠️ ไม่ควรใส่ style ของ section หรือ page ลงที่นี่

### `styles/layout/`

โครงสร้างหลักของหน้าเว็บ:

- header
- footer
- grid
- navigation

### `styles/sections/`

CSS ที่ผูกกับ section หรือ page เฉพาะ
เช่น homepage, article, campaign

### `styles/forum2022/`

⚠️ **Legacy styles**

- ใช้สำหรับระบบเก่า
- แก้ไขเฉพาะเมื่อจำเป็น
- หลีกเลี่ยงการ reuse ใน feature ใหม่

## Coding Guidelines

### JavaScript

- ใช้ `const` / `let`
- หลีกเลี่ยง global variables
- แยก logic เป็น component
- ห้ามเขียน inline script ใน HTML

### CSS

- หลีกเลี่ยง global selector (`div`, `p`, `h1`)
- ใช้ class-based styling
- แยกไฟล์ตาม responsibility
- ห้ามแก้ vendor CSS โดยตรง

## Legacy Notes

- โฟลเดอร์ `forum2022` และ `backup` ถือเป็น legacy
- Feature ใหม่ **ไม่ควรพึ่งพา legacy styles**
- หากจำเป็นต้องแก้ legacy code ควร comment ให้ชัดเจน

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
- ใช้ไฟล์ CSS กลางเป็นตัวรวม (`@import`) เพื่อลดความซับซ้อน
- ลดผลกระทบต่อ legacy code เดิม

โครงสร้างนี้ช่วยให้:

- แก้ไขแต่ละส่วนได้ง่าย
- ลดความเสี่ยงในการกระทบโค้ดเก่า
- รองรับการขยายในอนาคต

---

## Maintained By

**Kornpitak Kannika Kan**  
Frontend Developer

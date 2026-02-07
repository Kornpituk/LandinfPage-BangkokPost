export function initDonationTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".donation-content");
  const copyButtons = document.querySelectorAll(".copy-btn");

  // 1. Logic สลับ Tab
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // เอา active ออกจากทุก Tab และ Content
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));

      // ใส่ active ให้ตัวที่ถูกกด
      tab.classList.add("active");

      // หา content ที่มี id ตรงกับ data-target ของปุ่ม
      const targetId = tab.dataset.target;
      document.getElementById(targetId).classList.add("active");
    });
  });

  // 2. Logic ปุ่ม Copy
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const numberToCopy = btn.dataset.copy;

      // Copy ลง Clipboard
      navigator.clipboard
        .writeText(numberToCopy)
        .then(() => {
          // Feedback เมื่อ Copy สำเร็จ (เปลี่ยน text ชั่วคราว)
          const originalText = btn.innerText;
          btn.innerText = "COPIED!";
          btn.style.backgroundColor = "#28a745"; // สีเขียว

          setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = ""; // กลับเป็นสีเดิม
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    });
  });
}

export function initBirthdayForm() {
  const form = document.getElementById("birthdayForm");
  const colorOptions = document.querySelectorAll(".color-dot");
  const hiddenColorInput = document.getElementById("selectedColor");
  const messageDisplayBox = document.getElementById("messageDisplayBox");

  // 1. Logic เลือกสี Avatar
  colorOptions.forEach((option) => {
    option.addEventListener("click", () => {
      colorOptions.forEach((opt) => opt.classList.remove("active"));
      option.classList.add("active");
      hiddenColorInput.value = option.dataset.color;
    });
  });

  // 2. Logic Submit
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("inputName").value;
      const email = document.getElementById("inputEmail").value;
      const message = document.getElementById("inputMessage").value;
      const color = hiddenColorInput.value;

      if (!name || !message) return;

      // HTML ก้อนใหม่ที่จะแทรก
      const newMessageHTML = `
                <div class="msg-item" style="animation: fadeIn 0.5s;">
                    <div class="avatar-circle" style="background: ${color};"></div>
                    <div class="msg-text">
                        <strong>${name}</strong>
                        <p>${message}</p>
                    </div>
                </div>
            `;

      // แทรกไปบนสุด (afterbegin) หรือต่อท้าย (beforeend)
      // จากรูป ตัวใหม่อยู่บนสุด หรือล่างสุดแล้วแต่ดีไซน์ (ปกติแชทใหม่อยู่ล่าง)
      // ถ้าเอาตามรูปต้นฉบับเหมือนจะเป็น List นิ่งๆ แต่ถ้าให้ UX ดี ใส่ล่างสุดแล้ว scroll ไปหาครับ
      messageDisplayBox.insertAdjacentHTML("beforeend", newMessageHTML);

      // Scroll ไปล่างสุด
      messageDisplayBox.scrollTop = messageDisplayBox.scrollHeight;

      form.reset();
      // set default color active again if needed
    });
  }
}

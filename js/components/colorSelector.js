export function initColorSelector() {
  const options = document.querySelectorAll(".color-option");

  options.forEach((opt) => {
    opt.addEventListener("click", function () {
      // ลบ active จากทุกตัว
      options.forEach((o) => o.classList.remove("active"));
      // ใส่ active ให้ตัวที่คลิก
      this.classList.add("active");
    });
  });
}

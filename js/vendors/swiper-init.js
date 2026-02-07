export function initSwiper() {
  // เช็คก่อนว่ามี element และ Swiper ถูกโหลดมาหรือยัง
  if (
    !document.querySelector(".gallery-swiper") ||
    typeof Swiper === "undefined"
  )
    return;

  const swiper = new Swiper(".gallery-swiper", {
    slidesPerView: "auto",
    spaceBetween: 1,
    loop: true,
    speed: 800,
    grabCursor: true,

    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },

    lazy: {
      loadPrevNext: true,
    },

    breakpoints: {
      0: { slidesPerView: 1.2 },
      768: { slidesPerView: 2.2 },
      1200: { slidesPerView: 3.2 },
    },
  });

  // Click → scroll to section Logic
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const target = document.querySelector(item.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

export function initSpeakerCarousel() {
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!track || !prevBtn || !nextBtn) return; // ป้องกัน Error หาก Element ไม่ครบ

  const slideWidth = 280 + 40; // width + gap
  let isAnimating = false;

  function updateActive() {
    [...track.children].forEach((slide, index) => {
      slide.classList.toggle("active", index === 1);
    });
  }

  nextBtn.addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;

    // 1️⃣ เลื่อนซ้าย
    track.style.transform = `translateX(-${slideWidth}px)`;

    // 2️⃣ หลัง animation
    setTimeout(() => {
      track.appendChild(track.firstElementChild); // ย้ายตัวแรกไปท้าย
      track.style.transition = "none";
      track.style.transform = "translateX(0)";
      track.offsetHeight; // force reflow
      track.style.transition = "";

      updateActive();
      isAnimating = false;
    }, 450);
  });

  prevBtn.addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;

    // ย้ายท้ายมาหน้าไว้ก่อน
    track.insertBefore(track.lastElementChild, track.firstElementChild);

    track.style.transition = "none";
    track.style.transform = `translateX(-${slideWidth}px)`;
    track.offsetHeight;
    track.style.transition = "";

    // เลื่อนกลับ
    requestAnimationFrame(() => {
      track.style.transform = "translateX(0)";
    });

    setTimeout(() => {
      updateActive();
      isAnimating = false;
    }, 450);
  });

  updateActive(); // Init state
}

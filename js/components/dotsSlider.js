export function initDotsSlider() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  if (dots.length === 0) return;

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = dot.dataset.index;

      slides.forEach((s) => s.classList.remove("active"));
      dots.forEach((d) => d.classList.remove("active"));

      if (slides[index]) slides[index].classList.add("active");
      dot.classList.add("active");
    });
  });
}

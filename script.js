// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show");
      }
    }
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll(".counter");
let counterAnimated = false;

const counterObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !counterAnimated) {
        counterAnimated = true;
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-target"));
          const duration = 2000; // 2 seconds
          const increment = target / (duration / 16); // 60fps
          let current = 0;

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current).toLocaleString("th-TH");
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toLocaleString("th-TH");
            }
          };

          updateCounter();
        });
      }
    });
  },
  { threshold: 0.5 },
);

// Observe stats section
const statsSection = document.querySelector(".stats");
if (statsSection) {
  counterObserver.observe(statsSection);
}

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector(".hero-image");
  if (heroImage) {
    heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// ===== BUTTON RIPPLE EFFECT =====
document
  .querySelectorAll(".btn-primary-custom, .btn-secondary-custom")
  .forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

// ===== CONSOLE MESSAGE =====
console.log(
  "%c🚀 Landing Page สร้างด้วย HTML, CSS, JavaScript และ Bootstrap 5",
  "color: #e94560; font-size: 16px; font-weight: bold;",
);
console.log("%c✨ พัฒนาโดย: Claude", "color: #d4af37; font-size: 14px;");

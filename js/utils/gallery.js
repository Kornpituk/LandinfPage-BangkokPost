/**
 * Gallery Module
 * Initialize and manage the main gallery carousel
 */

export function initGallery() {
  console.log("🖼️ Initializing gallery...");

  const galleryElement = document.querySelector(".gallery-swiper");

  if (!galleryElement) {
    console.warn("Gallery element not found");
    return;
  }

  try {
    // Initialize Swiper
    const swiper = new Swiper(".gallery-swiper", {
      // Basic settings
      loop: true,
      speed: 800,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },

      // Autoplay
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },

      // Lazy loading
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 2,
      },

      // Navigation
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // Pagination
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },

      // Keyboard control
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },

      // Accessibility
      a11y: {
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
        paginationBulletMessage: "Go to slide {{index}}",
      },

      // Events
      on: {
        init: function () {
          console.log("✅ Gallery initialized");
        },

        slideChange: function () {
          const currentIndex = this.realIndex + 1;
          const totalSlides = this.slides.length;
          console.log(`Slide ${currentIndex} of ${totalSlides}`);
        },

        lazyImageReady: function (slideEl, imageEl) {
          console.log("Image loaded:", imageEl.src);
        },
      },
    });

    // Handle click on gallery items
    const galleryCards = document.querySelectorAll(".gallery-card");

    galleryCards.forEach((card) => {
      card.addEventListener("click", function () {
        const targetSection = this.dataset.section;

        if (targetSection) {
          navigateToSection(targetSection);
        }
      });

      // Keyboard support
      card.addEventListener("keypress", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.click();
        }
      });
    });

    // Pause autoplay when page is hidden
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        swiper.autoplay.stop();
      } else {
        swiper.autoplay.start();
      }
    });

    return swiper;
  } catch (error) {
    console.error("Error initializing gallery:", error);
  }
}

/**
 * Navigate to section with smooth scroll
 */
function navigateToSection(sectionId) {
  const targetSection = document.getElementById(sectionId);

  if (!targetSection) {
    console.warn(`Section ${sectionId} not found`);
    return;
  }

  // Get navbar height for offset (if exists)
  const navbarHeight =
    document.querySelector(".site-header")?.offsetHeight || 0;

  // Scroll to section
  const elementPosition = targetSection.getBoundingClientRect().top;
  const offsetPosition =
    elementPosition + window.pageYOffset - navbarHeight - 20;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });

  // Update URL without page jump
  if ("history" in window) {
    history.pushState(null, null, `#${sectionId}`);
  }

  // Trigger analytics event
  if ("gtag" in window) {
    gtag("event", "navigate_to_section", {
      section_id: sectionId,
    });
  }
}

/**
 * Preload next images for better UX
 */
function preloadImages(imageUrls) {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

export default { initGallery };

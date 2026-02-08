/**
 * Lazy Loading Module
 * Efficiently load images and content as they enter viewport
 */

export function initLazyLoading() {
  console.log("⚡ Initializing lazy loading...");

  // Check for browser support
  if ("IntersectionObserver" in window) {
    setupIntersectionObserver();
  } else {
    // Fallback for older browsers
    setupFallbackLoading();
  }
}

/**
 * Modern approach using Intersection Observer
 */
function setupIntersectionObserver() {
  // Observer options
  const observerOptions = {
    root: null, // viewport
    rootMargin: "50px", // Start loading 50px before entering viewport
    threshold: 0.01, // Trigger when 1% is visible
  };

  // Create observer for images
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        loadImage(img);
        observer.unobserve(img); // Stop observing once loaded
      }
    });
  }, observerOptions);

  // Observe all lazy images
  const lazyImages = document.querySelectorAll(
    'img[loading="lazy"], img[data-src]',
  );
  lazyImages.forEach((img) => {
    // Skip if already loaded
    if (img.complete && img.naturalHeight !== 0) {
      return;
    }
    imageObserver.observe(img);
  });

  // Create observer for content sections
  const contentObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");

          // Trigger animations
          if (entry.target.hasAttribute("data-animate")) {
            animateElement(entry.target);
          }
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "-50px",
    },
  );

  // Observe sections for animations
  const animatedSections = document.querySelectorAll("[data-animate]");
  animatedSections.forEach((section) => {
    contentObserver.observe(section);
  });

  console.log(
    `✅ Observing ${lazyImages.length} images and ${animatedSections.length} animated sections`,
  );
}

/**
 * Load image efficiently
 */
function loadImage(img) {
  const src = img.dataset.src || img.getAttribute("src");

  if (!src) {
    console.warn("No image source found", img);
    return;
  }

  // Create a promise for loading
  return new Promise((resolve, reject) => {
    // Show loading state
    img.classList.add("loading");

    // Use a temporary image to load
    const tempImage = new Image();

    tempImage.onload = () => {
      // Apply the loaded image
      if (img.dataset.src) {
        img.src = img.dataset.src;
        delete img.dataset.src;
      }

      // Handle srcset if present
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
        delete img.dataset.srcset;
      }

      // Remove loading state
      img.classList.remove("loading");
      img.classList.add("loaded");

      console.log("Image loaded:", src);
      resolve(img);
    };

    tempImage.onerror = () => {
      console.error("Failed to load image:", src);
      img.classList.remove("loading");
      img.classList.add("error");

      // Show fallback
      img.alt = "Failed to load image";
      reject(new Error(`Failed to load ${src}`));
    };

    // Start loading
    tempImage.src = src;

    // Set a timeout to prevent infinite loading
    setTimeout(() => {
      if (!img.complete) {
        console.warn("Image load timeout:", src);
        reject(new Error(`Timeout loading ${src}`));
      }
    }, 10000); // 10 second timeout
  });
}

/**
 * Fallback for browsers without Intersection Observer
 */
function setupFallbackLoading() {
  console.log("Using fallback lazy loading");

  const lazyImages = document.querySelectorAll(
    'img[loading="lazy"], img[data-src]',
  );

  function loadVisibleImages() {
    lazyImages.forEach((img) => {
      if (isElementInViewport(img) && !img.classList.contains("loaded")) {
        loadImage(img);
      }
    });
  }

  // Load on scroll (debounced)
  let scrollTimeout;
  window.addEventListener(
    "scroll",
    () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(loadVisibleImages, 100);
    },
    { passive: true },
  );

  // Load on resize (debounced)
  let resizeTimeout;
  window.addEventListener(
    "resize",
    () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(loadVisibleImages, 100);
    },
    { passive: true },
  );

  // Initial load
  loadVisibleImages();
}

/**
 * Check if element is in viewport
 */
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Animate element when it enters viewport
 */
function animateElement(element) {
  const animationType = element.dataset.animate;

  switch (animationType) {
    case "fade-in":
      element.style.opacity = "0";
      element.style.transition = "opacity 0.6s ease-in";
      setTimeout(() => {
        element.style.opacity = "1";
      }, 10);
      break;

    case "slide-up":
      element.style.transform = "translateY(30px)";
      element.style.opacity = "0";
      element.style.transition =
        "transform 0.6s ease-out, opacity 0.6s ease-out";
      setTimeout(() => {
        element.style.transform = "translateY(0)";
        element.style.opacity = "1";
      }, 10);
      break;

    case "scale":
      element.style.transform = "scale(0.9)";
      element.style.opacity = "0";
      element.style.transition =
        "transform 0.6s ease-out, opacity 0.6s ease-out";
      setTimeout(() => {
        element.style.transform = "scale(1)";
        element.style.opacity = "1";
      }, 10);
      break;

    default:
      console.warn("Unknown animation type:", animationType);
  }
}

/**
 * Preload critical images
 */
export function preloadCriticalImages(imageUrls) {
  imageUrls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    document.head.appendChild(link);
  });
}

/**
 * Progressive image loading (blur-up technique)
 */
export function setupProgressiveImages() {
  const progressiveImages = document.querySelectorAll(".progressive-image");

  progressiveImages.forEach((container) => {
    const placeholder = container.querySelector(".placeholder");
    const fullImage = container.querySelector(".full-image");

    if (!placeholder || !fullImage) return;

    // Load full image
    const img = new Image();
    img.src = fullImage.dataset.src;

    img.onload = () => {
      fullImage.src = img.src;
      fullImage.classList.add("loaded");

      // Remove placeholder after transition
      setTimeout(() => {
        placeholder.remove();
      }, 300);
    };
  });
}

export default {
  initLazyLoading,
  preloadCriticalImages,
  setupProgressiveImages,
};

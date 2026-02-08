/**
 * Main JavaScript Entry Point
 * Bangkok Post 76th Anniversary
 *
 * Module structure for better organization and maintainability
 */

// Import Modules
import { initSmoothScroll } from "./utils/smoothScroll.js";
import { initColorSelector } from "./components/colorSelector.js";
import { initSlotMachine } from "./components/slotMachine.js";
import { initSpeakerCarousel } from "./components/speakerCarousel.js";
import { initDotsSlider } from "./components/dotsSlider.js";
import { initFormHandler } from "./components/formHandler.js";
import { initSwiper } from "./vendors/swiper-init.js";

import { initBirthdayForm } from "./components/anniversaryGiveaway/birthdayForm.js";
import { initSpinerSlotMachine } from "./components/giveaway/spin.js";
import { initDonationTabs } from "./components/help/donationTabs.js";

/**
 * Document Ready
 * Initialize all modules when DOM is ready
 */
// Run when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎉 Bangkok Post 76th Anniversary - Initializing...");

  try {
    // Performance mark
    performance.mark("app-init-start");

    // Initialize modules
    initSmoothScroll();
    initColorSelector();
    initSpeakerCarousel();
    initDotsSlider();
    initFormHandler();
    initSwiper();

    // anniversary giveaway
    initBirthdayForm();
    initSpinerSlotMachine();

    // donation tabs
    initDonationTabs();

    // Performance measure
    performance.mark("app-init-end");
    performance.measure("app-init", "app-init-start", "app-init-end");

    const initTime = performance.getEntriesByName("app-init")[0].duration;
    console.log(`✅ Initialization complete in ${initTime.toFixed(2)}ms`);

    // Add loaded class to body
    document.body.classList.add("loaded");
  } catch (error) {
    console.error("❌ Initialization error:", error);
  }
});

/**
 * Window Load
 * Tasks that need full page load
 */
window.addEventListener("load", () => {
  console.log("📄 Page fully loaded");

  // Remove loading indicators
  const loaders = document.querySelectorAll(".loading");
  loaders.forEach((loader) => loader.classList.remove("loading"));

  // Log performance metrics
  if ("performance" in window) {
    const perfData = performance.getEntriesByType("navigation")[0];
    console.log("⚡ Performance Metrics:", {
      "DOM Content Loaded": `${perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart}ms`,
      "Page Load": `${perfData.loadEventEnd - perfData.loadEventStart}ms`,
      "DNS Lookup": `${perfData.domainLookupEnd - perfData.domainLookupStart}ms`,
      "TCP Connection": `${perfData.connectEnd - perfData.connectStart}ms`,
      "Time to First Byte": `${perfData.responseStart - perfData.requestStart}ms`,
      "DOM Processing": `${perfData.domComplete - perfData.domInteractive}ms`,
    });
  }
});

/**
 * Handle page visibility changes
 * Pause/resume animations when tab is hidden/visible
 */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    console.log("👁️ Page hidden - pausing animations");
    // Pause any heavy animations
    document.body.classList.add("page-hidden");
  } else {
    console.log("👁️ Page visible - resuming");
    document.body.classList.remove("page-hidden");
  }
});

/**
 * Handle online/offline status
 */
window.addEventListener("online", () => {
  console.log("🌐 Connection restored");
  document.body.classList.remove("offline");
});

window.addEventListener("offline", () => {
  console.log("📵 Connection lost");
  document.body.classList.add("offline");
});

/**
 * Error handling
 */
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
});

/**
 * Utility Functions
 * Shared utilities for all modules
 */
export const utils = {
  /**
   * Debounce function
   */
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Throttle function
   */
  throttle: (func, limit) => {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  /**
   * Check if element is in viewport
   */
  isInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  /**
   * Smooth scroll to element
   */
  scrollTo: (element, offset = 0) => {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  },

  /**
   * Generate random ID
   */
  generateId: () => {
    return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Format date
   */
  formatDate: (date) => {
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  },

  /**
   * Sanitize HTML to prevent XSS
   */
  sanitizeHTML: (str) => {
    const temp = document.createElement("div");
    temp.textContent = str;
    return temp.innerHTML;
  },
};

// Export for use in other modules
export default utils;

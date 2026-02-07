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

// Run when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("App initialized");

  initSmoothScroll();
  initColorSelector();
  // initSlotMachine();
  initSpeakerCarousel();
  initDotsSlider();
  initFormHandler();
  initSwiper();

  // anniversary giveaway
  initBirthdayForm();
  initSpinerSlotMachine();

  // donation tabs
  initDonationTabs();

});

/* =============================================================
   mOHiKOnTOk SOUND LAB — NAVBAR SCRIPT
   Vanilla JS only. No dependencies.
   ============================================================= */

(function () {
  "use strict";

  /* -----------------------------------------------------------
     0. Cache DOM references
  ----------------------------------------------------------- */
  const header = document.getElementById("siteHeader");
  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");
  const navOverlay = document.getElementById("navOverlay");
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const body = document.body;

  const MOBILE_QUERY = window.matchMedia("(max-width: 1150px)");

  /* -----------------------------------------------------------
     1. Mobile drawer: open / close state management
  ----------------------------------------------------------- */
  let isMenuOpen = false;

  function openMenu() {
    isMenuOpen = true;
    primaryNav.classList.add("is-open");
    navOverlay.hidden = false;
    // next frame so the transition from hidden -> visible can animate
    requestAnimationFrame(() => navOverlay.classList.add("is-visible"));
    navToggle.setAttribute("aria-expanded", "true");
    body.classList.add("nav-open");
  }

  function closeMenu() {
    if (!isMenuOpen) return;
    isMenuOpen = false;
    primaryNav.classList.remove("is-open");
    navOverlay.classList.remove("is-visible");
    navToggle.setAttribute("aria-expanded", "false");
    body.classList.remove("nav-open");

    // wait for the fade-out transition before fully hiding the overlay
    window.setTimeout(() => {
      if (!isMenuOpen) navOverlay.hidden = true;
    }, 320);
  }

  function toggleMenu() {
    isMenuOpen ? closeMenu() : openMenu();
  }

  navToggle.addEventListener("click", toggleMenu);

  /* Close on outside click (overlay click = outside the drawer) */
  navOverlay.addEventListener("click", closeMenu);

  document.addEventListener("click", (event) => {
    if (!isMenuOpen) return;
    const clickedInsideNav = primaryNav.contains(event.target);
    const clickedToggle = navToggle.contains(event.target);
    if (!clickedInsideNav && !clickedToggle) {
      closeMenu();
    }
  });

  /* Close on ESC key */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMenuOpen) {
      closeMenu();
      navToggle.focus();
    }
  });

  /* Close on resize back up to desktop width — avoids stuck-open drawers */
  MOBILE_QUERY.addEventListener("change", (event) => {
    if (!event.matches && isMenuOpen) {
      closeMenu();
    }
  });

  /* Close the drawer whenever a nav item is clicked (mobile UX) */
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((l) => l.classList.remove("is-active"));
      link.classList.add("is-active");
      if (isMenuOpen) closeMenu();
    });
  });

  /* -----------------------------------------------------------
     2. Sticky header: shrink + shadow on scroll (rAF-throttled)
  ----------------------------------------------------------- */
  const SCROLL_THRESHOLD = 12;
  let lastKnownScrollY = 0;
  let scrollTicking = false;

  function updateHeaderState() {
    const scrolled = lastKnownScrollY > SCROLL_THRESHOLD;
    header.dataset.scrolled = String(scrolled);
    scrollTicking = false;
  }

  function onScroll() {
    lastKnownScrollY = window.scrollY;
    if (!scrollTicking) {
      window.requestAnimationFrame(updateHeaderState);
      scrollTicking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // set initial state on load
})();

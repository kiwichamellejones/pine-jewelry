const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");
const signupForm = document.getElementById("signup-form");
const emailInput = document.getElementById("email");
const formMessage = document.getElementById("form-message");

function updateHeaderOnScroll() {
  if (window.scrollY > 24) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

function toggleMobileNav() {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";
}

function closeMobileNav() {
  siteNav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", toggleMobileNav);

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      closeMobileNav();
    }
  });
}

updateHeaderOnScroll();
window.addEventListener("scroll", updateHeaderOnScroll);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (signupForm && emailInput && formMessage) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailValue = emailInput.value.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

    if (!emailValue) {
      formMessage.textContent = "Please enter your email address.";
      return;
    }

    if (!isValidEmail) {
      formMessage.textContent = "Please enter a valid email address.";
      return;
    }

    formMessage.textContent = "Thanks for joining the Pine Jewelry mailing list.";
    signupForm.reset();
  });
}
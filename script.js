// Redirect to home section on page refresh
window.addEventListener("load", function () {
  // Check if page was reloaded (not from history navigation)
  if (performance.navigation.type === 1) {
    window.location.hash = "#home";
  }
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});
// trigger on load
if (window.scrollY > 40) navbar.classList.add("scrolled");

// Mobile menu
function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("open");
}

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
reveals.forEach((el) => observer.observe(el));

// Contact form validation
function submitForm() {
  let valid = true;
  const name = document.getElementById("fname").value.trim();
  const phone = document.getElementById("fphone").value.trim();
  const msg = document.getElementById("fmessage").value.trim();

  document
    .querySelectorAll(".form-error")
    .forEach((e) => (e.style.display = "none"));

  if (!name) {
    document.getElementById("fnameErr").style.display = "block";
    valid = false;
  }
  if (!/^[\d\s\+]{10,13}$/.test(phone)) {
    document.getElementById("fphoneErr").style.display = "block";
    valid = false;
  }
  if (!msg) {
    document.getElementById("fmessageErr").style.display = "block";
    valid = false;
  }

  if (valid) {
    document.querySelector(".btn-submit").disabled = true;
    document.querySelector(".btn-submit").innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Sending...';
    setTimeout(() => {
      document.getElementById("formSuccess").style.display = "block";
      document.querySelector(".btn-submit").style.display = "none";
      document.getElementById("fname").value = "";
      document.getElementById("fphone").value = "";
      document.getElementById("fmessage").value = "";
      document.getElementById("fproduct").value = "";
    }, 1200);
  }
}

// Smooth close mobile menu on link click
document.querySelectorAll(".mobile-menu a").forEach((a) => {
  a.addEventListener("click", () => {
    document.getElementById("mobileMenu").classList.remove("open");
  });
});

// Home redirect on refresh/direct section navigation
document.addEventListener("DOMContentLoaded", function () {
  const hash = window.location.hash;
  if (hash && hash !== "#home") {
    // Scroll to home first (immediate)
    window.scrollTo({ top: 0, behavior: "instant" });
    // Then to target after delay (show home briefly)
    setTimeout(() => {
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 600);
  }
});

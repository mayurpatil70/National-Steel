// Redirect to home section on page refresh - PREVENT BACK TO PREVIOUS SECTION
(function () {
  // Use sessionStorage to detect if this is a page refresh
  const isRefresh = sessionStorage.getItem("pageRefreshed");

  if (!isRefresh) {
    // First load - mark as refreshed
    sessionStorage.setItem("pageRefreshed", "true");
  }

  // Always redirect to home on any page load/refresh
  function forceHomeRedirect() {
    window.history.replaceState(null, null, window.location.pathname + "#home");

    const homeElement = document.getElementById("home");
    if (homeElement) {
      window.scrollTo({ top: 0, behavior: "instant" });
      homeElement.scrollIntoView({ behavior: "instant", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }

  // Run on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", forceHomeRedirect);

  // Run on window load as backup
  window.addEventListener("load", forceHomeRedirect);

  // Prevent hash changes that try to navigate away from home on refresh
  window.addEventListener("hashchange", function (e) {
    if (isRefresh && window.location.hash !== "#home") {
      window.location.hash = "#home";
    }
  });
})();

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

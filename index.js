// ============================================
// Preloader
// ============================================
const preloader = document.getElementById("preloader");
window.addEventListener("load", function () {
  setTimeout(() => {
    preloader.classList.add("hidden");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }, 500);
});

// ============================================
// GSAP Animations Setup
// ============================================
if (typeof gsap !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Animate elements on scroll
  gsap.utils.toArray("[data-aos]").forEach((element) => {
    const delay = element.getAttribute("data-aos-delay")
      ? parseFloat(element.getAttribute("data-aos-delay")) / 1000
      : 0;
    const animationType = element.getAttribute("data-aos") || "fade-up";

    let animationProps = {
      opacity: 0,
      duration: 1,
      delay: delay,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    };

    if (animationType === "fade-up") {
      animationProps.y = 50;
    } else if (animationType === "zoom-in") {
      animationProps.scale = 0.8;
    } else if (animationType === "fade-right") {
      animationProps.x = -50;
    } else if (animationType === "fade-left") {
      animationProps.x = 50;
    }

    gsap.from(element, animationProps);
  });

  // Parallax effect for hero section
  gsap.to(".gradient-orb", {
    y: (i) => i * 50,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // Sticky navbar animation
  ScrollTrigger.create({
    start: "top -100",
    end: 99999,
    toggleClass: { className: "sticky-nav", targets: "#header" },
  });
}

// ============================================
// Animated Cursor
// ============================================
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

if (cursor && cursorFollower) {
  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  // Smooth follower animation
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    cursorFollower.style.left = followerX + "px";
    cursorFollower.style.top = followerY + "px";

    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Cursor hover effects
  const hoverElements = document.querySelectorAll(
    "a, button, .btn, .work-card, .service-card, .tech-item, .nav-link"
  );

  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });
  });

  // Hide cursor on mobile
  if (window.innerWidth <= 768) {
    cursor.style.display = "none";
    cursorFollower.style.display = "none";
  }
}

// ============================================
// Dynamic Text Animation
// ============================================
const dynamicText = document.getElementById("dynamic-text");
if (dynamicText) {
  const textItems = dynamicText.querySelectorAll(".text-item");
  let currentIndex = 0;

  function animateText() {
    textItems[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % textItems.length;
    textItems[currentIndex].classList.add("active");
  }

  // Start animation after 2 seconds
  setTimeout(() => {
    setInterval(animateText, 3000);
  }, 2000);
}

// ============================================
// Tab Switching
// ============================================
const tablinks = document.getElementsByClassName("tab-link");
const tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  // Remove active class from all tabs
  for (let tablink of tablinks) {
    tablink.classList.remove("active-link");
  }

  // Hide all tab contents
  for (let tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }

  // Add active class to clicked tab
  event.currentTarget.classList.add("active-link");

  // Show selected tab content
  document.getElementById(tabname).classList.add("active-tab");
}

// ============================================
// Mobile Menu
// ============================================
const sidemenu = document.getElementById("sidemenu");

function openmenu() {
  if (sidemenu) {
    sidemenu.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closemenu() {
  if (sidemenu) {
    sidemenu.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closemenu();
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    sidemenu &&
    !sidemenu.contains(e.target) &&
    !e.target.classList.contains("hamburger") &&
    sidemenu.classList.contains("active")
  ) {
    closemenu();
  }
});

// ============================================
// Smooth Scroll
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ============================================
// Contact Form Submission
// ============================================
const scriptURL =
  "https://api.sheetbest.com/sheets/673fb0e0-0859-41d7-8647-0de4feb5aec6";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitButton = form.querySelector(".form-submit");
    const buttonText = submitButton.querySelector(".btn-text");
    const buttonIcon = submitButton.querySelector(".fa-paper-plane");

    // Show loading state
    submitButton.disabled = true;
    buttonText.textContent = "Sending...";
    buttonIcon.style.display = "none";

    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        if (response.ok) {
          msg.textContent = "Message sent successfully!";
          msg.classList.add("show");

          // Reset form
          form.reset();

          // Reset button
          submitButton.disabled = false;
          buttonText.textContent = "Send Message";
          buttonIcon.style.display = "inline-block";

          // Hide message after 5 seconds
          setTimeout(() => {
            msg.classList.remove("show");
          }, 5000);
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("Error!", error.message);
        msg.textContent = "Something went wrong. Please try again.";
        msg.style.background = "rgba(244, 67, 54, 0.1)";
        msg.style.borderColor = "rgba(244, 67, 54, 0.3)";
        msg.style.color = "#f44336";
        msg.classList.add("show");

        // Reset button
        submitButton.disabled = false;
        buttonText.textContent = "Send Message";
        buttonIcon.style.display = "inline-block";

        setTimeout(() => {
          msg.classList.remove("show");
          msg.style.background = "";
          msg.style.borderColor = "";
          msg.style.color = "";
        }, 5000);
      });
  });
}

// ============================================
// Scroll Animations (Fallback if GSAP not loaded)
// ============================================
if (typeof gsap === "undefined") {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute("data-aos-delay")
          ? parseFloat(entry.target.getAttribute("data-aos-delay"))
          : 0;
        const animationType = entry.target.getAttribute("data-aos") || "fade-up";

        setTimeout(() => {
          entry.target.style.opacity = "1";
          if (animationType === "fade-up") {
            entry.target.style.transform = "translateY(0)";
          } else if (animationType === "zoom-in") {
            entry.target.style.transform = "scale(1)";
          } else if (animationType === "fade-right") {
            entry.target.style.transform = "translateX(0)";
          } else if (animationType === "fade-left") {
            entry.target.style.transform = "translateX(0)";
          }
        }, delay);
      }
    });
  }, observerOptions);

  document.querySelectorAll("[data-aos]").forEach((el) => {
    const animationType = el.getAttribute("data-aos") || "fade-up";
    el.style.opacity = "0";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    if (animationType === "fade-up") {
      el.style.transform = "translateY(50px)";
    } else if (animationType === "zoom-in") {
      el.style.transform = "scale(0.8)";
    } else if (animationType === "fade-right") {
      el.style.transform = "translateX(-50px)";
    } else if (animationType === "fade-left") {
      el.style.transform = "translateX(50px)";
    }

    observer.observe(el);
  });
}

// ============================================
// Navbar Scroll Effect
// ============================================
let lastScroll = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.style.background = "rgba(10, 10, 10, 0.8)";
  } else {
    header.style.background = "rgba(10, 10, 10, 0.95)";
  }

  lastScroll = currentScroll;
});

// ============================================
// Floating Card Animation
// ============================================
const floatingCard = document.querySelector(".floating-card");
if (floatingCard && typeof gsap !== "undefined") {
  gsap.to(floatingCard, {
    y: -20,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });
}

// ============================================
// Work Card Hover Effects
// ============================================
const workCards = document.querySelectorAll(".work-card");
workCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

// ============================================
// Tech Stack Hover Glow
// ============================================
const techItems = document.querySelectorAll(".tech-item");
techItems.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.boxShadow = "0 0 30px rgba(255, 0, 79, 0.6)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.boxShadow = "";
  });
});

// ============================================
// Performance Optimization
// ============================================
// Lazy load images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ============================================
// Console Message
// ============================================
console.log(
  "%c👋 Hello! Interested in my code?",
  "color: #ff004f; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cCheck out my GitHub: https://github.com/Tapashkumar99",
  "color: #ababab; font-size: 14px;"
);

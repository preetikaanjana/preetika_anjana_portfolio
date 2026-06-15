/* ==========================================================================
   INITIALIZE ICONS & CORE SETUP
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Initialize all modular scripts
  initTheme();
  initCustomCursor();
  initTypingEffect();
  initSparkles();
  initQuoteCarousel();
  initProjectFilter();
  initScrollReveal();
  initMobileMenu();
  initContactForm();
});

/* ==========================================================================
   THEME SWITCHER
   ========================================================================== */

function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const htmlEl = document.documentElement;

  // Check stored theme or system preference
  const savedTheme = localStorage.getItem("portfolio-theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  const currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
  htmlEl.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener("click", () => {
    const activeTheme = htmlEl.getAttribute("data-theme");
    const newTheme = activeTheme === "light" ? "dark" : "light";
    
    htmlEl.setAttribute("data-theme", newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
    updateThemeIcon(newTheme);
    
    // Trigger tiny sparkle burst at toggle location
    createSparkleBurst(themeToggle.getBoundingClientRect());
  });

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === "dark") {
      themeIcon.setAttribute("data-lucide", "sun");
    } else {
      themeIcon.setAttribute("data-lucide", "moon");
    }
    if (typeof lucide !== "undefined") {
      lucide.createIcons({
        attrs: {
          id: "theme-icon"
        }
      });
    }
  }
}

/* ==========================================================================
   CUSTOM CURSOR
   ========================================================================== */

function initCustomCursor() {
  const cursor = document.getElementById("custom-cursor");
  if (!cursor) return;

  // Track mouse coordinates
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth lerp animation for cursor
  function animateCursor() {
    let dx = mouseX - cursorX;
    let dy = mouseY - cursorY;
    
    cursorX += dx * 0.15;
    cursorY += dy * 0.15;
    
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Scale cursor on hover of interactive items
  const hoverables = document.querySelectorAll("a, button, .filter-btn, .tech-tag, input, textarea");
  hoverables.forEach(item => {
    item.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.8)";
      cursor.style.backgroundColor = "rgba(255, 133, 162, 0.15)";
      cursor.style.borderColor = "var(--accent-primary)";
    });
    item.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.backgroundColor = "transparent";
      cursor.style.borderColor = "var(--accent-primary)";
    });
  });
}



/* ==========================================================================
   TYPING EFFECT
   ========================================================================== */

function initTypingEffect() {
  const typedTextSpan = document.getElementById("typed-text");
  if (!typedTextSpan) return;

  const textArray = [
    "Building beautiful & performant web experiences",
    "Exploring AI / ML + Web integration",
    "Coding in pastel & building dreams in pixels"
  ];
  
  const typingDelay = 60;
  const erasingDelay = 35;
  const newTextDelay = 2000; // Delay between texts
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 500);
    }
  }

  // Start typewriter
  setTimeout(type, 1000);
}

/* ==========================================================================
   QUOTE CAROUSEL / SHUFFLE
   ========================================================================== */

function initQuoteCarousel() {
  const quoteEl = document.getElementById("quote-text");
  if (!quoteEl) return;

  const quotes = [
    "🌸 Coding in pastel and building dreams in pixels. 🌸",
    "To me, code is just another way to create pretty things.",
    "She believed she could, so she coded.",
    "Behind every line of code is a girl with big dreams.",
    "Soft colors, hard code. Making the digital world beautiful.",
    "Turning coffee and dreams into functional, gorgeous reality."
  ];

  let currentIdx = 0;

  setInterval(() => {
    quoteEl.style.opacity = 0;
    
    setTimeout(() => {
      currentIdx = (currentIdx + 1) % quotes.length;
      quoteEl.textContent = quotes[currentIdx];
      quoteEl.style.opacity = 1;
    }, 500);
  }, 6000);
}

/* ==========================================================================
   BACKGROUND SPARKLES / PARTICLES CANVAS
   ========================================================================== */

function initSparkles() {
  const canvas = document.getElementById("sparkle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let particles = [];
  const maxParticles = 60;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  class Particle {
    constructor(x, y, isBurst = false) {
      this.x = x || Math.random() * canvas.width;
      this.y = y || canvas.height + Math.random() * 50;
      this.size = Math.random() * 4 + 1;
      
      // Speed
      if (isBurst) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.size = Math.random() * 5 + 2;
      } else {
        this.vx = Math.random() * 1 - 0.5;
        this.vy = -(Math.random() * 0.8 + 0.3); // Floats upward
      }
      
      this.alpha = 1;
      this.fadeSpeed = isBurst ? Math.random() * 0.03 + 0.015 : Math.random() * 0.005 + 0.002;
      this.rotation = Math.random() * 360;
      this.spin = Math.random() * 2 - 1;
      
      // Determine shapes: circle, star, petal, heart
      const shapes = ["circle", "star", "petal", "heart"];
      this.shape = isBurst ? "star" : shapes[Math.floor(Math.random() * shapes.length)];
      
      // Warm feminine colors
      const themeColors = ["#FFB7C5", "#FF85A2", "#E8D7F1", "#F4A261", "#FAF6F0", "#D4A373"];
      this.color = themeColors[Math.floor(Math.random() * themeColors.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.fadeSpeed;
      this.rotation += this.spin;
      
      if (!this.isBurst) {
        // Slow sway horizontally
        this.vx += Math.sin(this.y * 0.01) * 0.02;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      
      if (this.shape === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.shape === "star") {
        drawStar(ctx, 0, 0, 5, this.size * 2, this.size);
      } else if (this.shape === "petal") {
        drawPetal(ctx, this.size);
      } else if (this.shape === "heart") {
        drawHeart(ctx, this.size);
      }
      
      ctx.restore();
    }
  }

  // Draw 4-point or 5-point star
  function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  }

  // Draw simple leaf/sakura petal shape
  function drawPetal(ctx, size) {
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.quadraticCurveTo(size * 0.8, -size * 0.2, 0, size);
    ctx.quadraticCurveTo(-size * 0.8, -size * 0.2, 0, -size);
    ctx.closePath();
    ctx.fill();
  }

  // Draw tiny pixel heart
  function drawHeart(ctx, size) {
    ctx.beginPath();
    ctx.moveTo(0, size * 0.3);
    ctx.bezierCurveTo(-size, -size * 0.5, -size * 1.5, size * 0.5, 0, size * 1.5);
    ctx.bezierCurveTo(size * 1.5, size * 0.5, size, -size * 0.5, 0, size * 0.3);
    ctx.closePath();
    ctx.fill();
  }

  // Burst generator
  window.createSparkleBurst = function(rect) {
    const burstX = rect.left + rect.width / 2;
    const burstY = rect.top + rect.height / 2;
    for (let i = 0; i < 15; i++) {
      particles.push(new Particle(burstX, burstY, true));
    }
  };

  // Sparkle generator loop
  function handleParticles() {
    // Generate new background ambient particles
    if (particles.length < maxParticles && Math.random() < 0.2) {
      particles.push(new Particle());
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();

      if (particles[i].alpha <= 0 || particles[i].y < -20 || particles[i].x < -20 || particles[i].x > canvas.width + 20) {
        particles.splice(i, 1);
      }
    }
  }

  // Animation Loop
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(loop);
  }
  loop();

  // Subtle interactiveness: Click spawns sparkles
  document.addEventListener("click", (e) => {
    // Exclude button clicks to avoid overlapping effects
    if (e.target.closest("button") || e.target.closest("a")) return;
    
    for (let i = 0; i < 8; i++) {
      particles.push(new Particle(e.clientX, e.clientY, true));
    }
  });
}

/* ==========================================================================
   PROJECTS FILTER SYSTEM
   ========================================================================== */

function initProjectFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  
  if (filterButtons.length === 0 || projectCards.length === 0) return;

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active class
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterVal = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        const category = card.getAttribute("data-category");
        
        card.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease";
        
        if (filterVal === "all" || category === filterVal || (filterVal === "python" && category === "python")) {
          // Fade in
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 10);
        } else {
          // Fade out
          card.style.opacity = "0";
          card.style.transform = "scale(0.9)";
          setTimeout(() => {
            card.style.display = "none";
          }, 400);
        }
      });
    });
  });
}

/* ==========================================================================
   SCROLL REVEAL (IntersectionObserver)
   ========================================================================== */

function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length === 0) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    root: null,
    threshold: 0.12, // Trigger slightly before full entrance
    rootMargin: "0px 0px -50px 0px"
  });

  reveals.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   MOBILE MENU TOGGLE
   ========================================================================== */

function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    
    // Toggle menu icon
    const icon = hamburger.querySelector("i");
    if (navMenu.classList.contains("open")) {
      icon.setAttribute("data-lucide", "x");
    } else {
      icon.setAttribute("data-lucide", "menu");
    }
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  });

  // Close menu when clicking link
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      const icon = hamburger.querySelector("i");
      icon.setAttribute("data-lucide", "menu");
      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    });
  });
}

/* ==========================================================================
   CONTACT FORM SUBMISSION
   ========================================================================== */

function initContactForm() {
  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("btn-submit");

  if (!form || !submitBtn) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("form-name").value;
    const email = document.getElementById("form-email").value;
    const message = document.getElementById("form-message").value;

    // Visual button loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `Sending... <i data-lucide="loader" class="spin"></i>`;
    if (typeof lucide !== "undefined") lucide.createIcons();

    // AJAX submit to Web3Forms
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        access_key: "f7c574fd-5d29-44d6-86c9-0959d88d3441",
        name: name,
        email: email,
        message: message
      })
    })
    .then(response => response.json())
    .then(data => {
      // Trigger burst effect at button
      createSparkleBurst(submitBtn.getBoundingClientRect());
      
      // Success visual state
      submitBtn.innerHTML = `Sent with love! <i data-lucide="check"></i>`;
      submitBtn.style.backgroundColor = "#81C784"; // Success green
      if (typeof lucide !== "undefined") lucide.createIcons();

      // Reset form
      form.reset();

      // Clear success visual state after 3s
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.style.backgroundColor = ""; // Reset inline CSS
        if (typeof lucide !== "undefined") lucide.createIcons();
      }, 3000);
    })
    .catch(error => {
      console.error("Error submitting form:", error);
      submitBtn.innerHTML = `Error! Try again <i data-lucide="alert-circle"></i>`;
      submitBtn.style.backgroundColor = "#E57373"; // Error red
      if (typeof lucide !== "undefined") lucide.createIcons();

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.style.backgroundColor = "";
        if (typeof lucide !== "undefined") lucide.createIcons();
      }, 3000);
    });
  });
}

/* =========================
   PREFERENCES
========================= */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const fluidMotion = supportsFinePointer && !prefersReducedMotion;

/* =========================
   RENDER PROJECTS (see projects.js)
========================= */
function shortUrl(url) {
  try {
    const u = new URL(url);
    return (u.hostname + u.pathname).replace(/\/$/, "");
  } catch {
    return url;
  }
}

const workGrid = document.getElementById("work-grid");

if (workGrid && typeof PROJECTS !== "undefined") {
  workGrid.innerHTML = PROJECTS.map((project, i) => `
    <article class="work-item reveal" style="--d: ${i * 90}ms">
      <span class="work-rank">${String(i + 1).padStart(2, "0")} / ${String(PROJECTS.length).padStart(2, "0")}</span>
      <div class="work-media">
        <div class="browser-frame">
          <div class="browser-bar">
            <span class="dot"></span><span class="dot"></span><span class="dot"></span>
            <span class="browser-url">${shortUrl(project.url)}</span>
          </div>
          <a class="work-media-link" href="${project.url}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${project.title}">
            <img src="${project.image}" alt="${project.title} screenshot" loading="lazy">
            <span class="work-view">View Live <i class="fa-solid fa-arrow-up-right-from-square"></i></span>
          </a>
        </div>
      </div>
      <div class="work-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <ul class="work-highlights">
          ${project.highlights.map((h) => `<li>${h}</li>`).join("")}
        </ul>
        <a class="work-link magnetic" href="${project.url}" target="_blank" rel="noopener noreferrer">
          Visit Site <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    </article>
  `).join("");
}

/* =========================
   SPLIT TEXT (progressive enhancement)
========================= */
function splitWords(el) {
  const words = el.textContent.split(/(\s+)/);
  el.textContent = "";
  let index = 0;
  words.forEach((chunk) => {
    if (chunk.trim() === "") {
      el.appendChild(document.createTextNode(chunk));
      return;
    }
    const line = document.createElement("span");
    line.className = "split-line";
    const word = document.createElement("span");
    word.className = "split-word";
    word.style.setProperty("--d", `${index * 55}ms`);
    word.textContent = chunk;
    line.appendChild(word);
    el.appendChild(line);
    index += 1;
  });
}

document.querySelectorAll("[data-split]").forEach(splitWords);

/* =========================
   SCROLL REVEAL (drives .reveal sections, cards, and split text)
========================= */
const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach((section) => observer.observe(section));
} else {
  reveals.forEach((section) => section.classList.add("active"));
}

/* =========================
   HERO LOAD-IN
========================= */
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.querySelector(".load-in")?.classList.add("is-active");
  });
});

/* =========================
   HEADER SCROLL STATE
========================= */
const header = document.querySelector(".site-header");

if (header) {
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* =========================
   NAV HOVER INDICATOR
========================= */
const navLinksEl = document.querySelector(".nav-links");
const navIndicator = document.querySelector(".nav-indicator");

if (navLinksEl && navIndicator) {
  const links = navLinksEl.querySelectorAll("a");

  const moveIndicatorTo = (el) => {
    navIndicator.style.width = `${el.offsetWidth}px`;
    navIndicator.style.transform = `translateX(${el.offsetLeft}px)`;
    navIndicator.style.opacity = "1";
  };

  links.forEach((link) => link.addEventListener("pointerenter", () => moveIndicatorTo(link)));
  navLinksEl.addEventListener("pointerleave", () => { navIndicator.style.opacity = "0"; });
}

/* =========================
   CUSTOM CURSOR + HERO SPOTLIGHT + MAGNETIC BUTTONS
   (fine pointers only, disabled under reduced motion)
========================= */
if (fluidMotion) {
  document.body.classList.add("has-cursor");

  const cursorEl = document.createElement("div");
  cursorEl.className = "cursor";
  cursorEl.setAttribute("aria-hidden", "true");
  document.body.appendChild(cursorEl);

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;

  window.addEventListener("pointermove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function trackCursor() {
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;
    cursorEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    requestAnimationFrame(trackCursor);
  }
  requestAnimationFrame(trackCursor);

  document.querySelectorAll("a, button, .magnetic").forEach((el) => {
    el.addEventListener("pointerenter", () => cursorEl.classList.add("cursor--active"));
    el.addEventListener("pointerleave", () => cursorEl.classList.remove("cursor--active"));
  });

  const hero = document.querySelector(".hero");
  if (hero) {
    hero.addEventListener("pointermove", (e) => {
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      hero.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  }

  document.querySelectorAll(".magnetic").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${relX * 0.25}px, ${relY * 0.35}px)`;
    });
    el.addEventListener("pointerleave", () => { el.style.transform = ""; });
  });

  document.querySelectorAll(".browser-frame").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(1000px) rotateY(${relX * 11}deg) rotateX(${relY * -11}deg) scale3d(1.03, 1.03, 1.03)`;
    });
    el.addEventListener("pointerleave", () => { el.style.transform = ""; });
  });
}

/* =========================
   SCROLL FX — saber progress indicator
========================= */
const saber = document.querySelector(".saber");
let scrollFxTicking = false;

function updateScrollFx() {
  scrollFxTicking = false;
  const scrollY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min(100, Math.max(0, (scrollY / maxScroll) * 100)) : 0;

  if (saber) saber.style.setProperty("--scroll-progress", `${progress}%`);
}

window.addEventListener("scroll", () => {
  if (!scrollFxTicking) {
    scrollFxTicking = true;
    requestAnimationFrame(updateScrollFx);
  }
}, { passive: true });

updateScrollFx();

/* =========================
   CONTACT FORM (mailto handoff — static site, no backend)
========================= */
const contactForm = document.getElementById("contactForm");

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const mailto = `mailto:davin.bujold@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;
});

/* =========================
   RENDER PROJECTS (see projects.js)
========================= */
const workGrid = document.getElementById("work-grid");

if (workGrid && typeof PROJECTS !== "undefined") {
  workGrid.innerHTML = PROJECTS.map(project => `
    <div class="card">
      <a class="card-media" href="${project.url}" target="_blank" rel="noopener noreferrer">
        <img src="${project.image}" alt="${project.title} screenshot" loading="lazy">
      </a>
      <div class="card-body">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a class="card-link" href="${project.url}" target="_blank" rel="noopener noreferrer">
          Visit Site <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    </div>
  `).join("");
}

/* =========================
   SCROLL REVEAL
========================= */
const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(section => observer.observe(section));
} else {
  reveals.forEach(section => section.classList.add("active"));
}

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

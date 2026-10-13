const projectsData = [
  {
    id: "weather",
    name: "Weather",
    title: "Weather",
    category: "web-apps",
    categoryLabel: "Web App",
    description:
      "Live animated weather dashboard fetching real-time weather conditions, 7-day forecast, wind telemetry, and dynamic animated backgrounds using the Open-Meteo API.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Open-Meteo API"],
    tags: ["HTML5", "CSS3", "JavaScript", "Open-Meteo API"],
    icon: "⛅",
    accentColor: "#00d2ff",
    image: "assets/weather.png",
    liveUrl: "https://naveddeveloper.github.io/apcs-projects/Weather/",
    demoUrl: "https://naveddeveloper.github.io/apcs-projects/Weather/",
    githubUrl: "https://github.com/naveddeveloper/apcs-projects",
    hasLocalDemo: true
  },

  {
    id: "portfolio",
    name: "Portfolio",
    title: "Portfolio",
    category: "web-apps",
    categoryLabel: "Portfolio",
    description:
      "Creative developer portfolio featuring an editorial scrapbook theme, dynamic project showcase with category filtering, polaroid photo frame, and responsive Vanilla JavaScript architecture.",
    technologies: ["HTML5", "CSS3", "Vanilla JS", "Scrapbook Design"],
    tags: ["HTML5", "CSS3", "Vanilla JS", "Scrapbook Design"],
    icon: "★",
    accentColor: "#ff6b35",
    image: "assets/project-portfolio.jpg",
    liveUrl: "https://naveddeveloper.github.io/apcs-projects/",
    demoUrl: "https://naveddeveloper.github.io/apcs-projects/",
    githubUrl: "https://github.com/naveddeveloper/apcs-projects",
    hasLocalDemo: true
  },

  {
    id: "todolist",
    name: "TodoList",
    title: "TodoList",
    category: "web-apps",
    categoryLabel: "Web App",
    description:
      "A complete task management application featuring instant task creation, inline editing, status toggling, custom categories, priority filtering, and client-side persistence using localStorage.",
    technologies: ["HTML5", "CSS3", "JavaScript", "localStorage"],
    tags: ["HTML5", "CSS3", "JavaScript", "localStorage"],
    icon: "✓",
    accentColor: "#25d366",
    image: "assets/todolist.png",
    liveUrl: "https://naveddeveloper.github.io/apcs-projects/TodoList/",
    demoUrl: "https://naveddeveloper.github.io/apcs-projects/TodoList/",
    githubUrl: "https://github.com/naveddeveloper/apcs-projects",
    hasLocalDemo: true
  },

  {
    id: "quiz",
    name: "Quiz",
    title: "Quiz",
    category: "web-apps",
    categoryLabel: "Web App",
    description:
      "An interactive computer science practice quiz application featuring timed questions on web technologies, immediate score calculation, answer reviews, and responsive quiz card styling.",
    technologies: ["JavaScript", "HTML5", "CSS3", "Quiz Engine"],
    tags: ["JavaScript", "HTML5", "CSS3", "Quiz Engine"],
    icon: "✦",
    accentColor: "#8338ec",
    image: "assets/quiz.png",
    liveUrl: "https://naveddeveloper.github.io/apcs-projects/Quiz/",
    demoUrl: "https://naveddeveloper.github.io/apcs-projects/Quiz/",
    githubUrl: "https://github.com/naveddeveloper/apcs-projects",
    hasLocalDemo: true
  },

  {
    id: "calculator",
    name: "Calculator",
    title: "Calculator",
    category: "utilities",
    categoryLabel: "Utility",
    description:
      "A classic retro-styled arithmetic calculator built with responsive tactile keypads, keyboard input support, decimal calculations, and clear display states for desktop and mobile.",
    technologies: ["HTML5", "CSS3", "JavaScript", "UI Design"],
    tags: ["HTML5", "CSS3", "JavaScript", "UI Design"],
    icon: "±",
    accentColor: "#ffc700",
    image: "assets/project-calculator.png",
    liveUrl: "https://naveddeveloper.github.io/apcs-projects/Calculator/",
    demoUrl: "https://naveddeveloper.github.io/apcs-projects/Calculator/",
    githubUrl: "https://github.com/naveddeveloper/apcs-projects",
    hasLocalDemo: true
  },

  {
    id: "navedi-mall-ecommerse",
    name: "Navedi Mall Ecommerce",
    title: "Navedi Mall Ecommerce",
    category: "ecommerce",
    categoryLabel: "E-Commerce",
    description:
      "A modern multi-category eCommerce storefront featuring promotional banners, category showcases, responsive product grids with rating badges, and mobile navigation.",
    technologies: ["HTML5", "CSS3", "JavaScript", "E-Commerce"],
    tags: ["HTML5", "CSS3", "JavaScript", "E-Commerce"],
    icon: "🛍",
    accentColor: "#ff2a85",
    image: "assets/project-ecommerse.jpg",
    liveUrl: "https://naveddeveloper.github.io/apcs-projects/Ecommerse/",
    demoUrl: "https://naveddeveloper.github.io/apcs-projects/Ecommerse/",
    githubUrl: "https://github.com/naveddeveloper/apcs-projects",
    hasLocalDemo: true
  }
];

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initProjects();
  initYear();
  initScrollEffects();
});

function initNavigation() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        navMenu.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const sections = document.querySelectorAll("section[id], header[id]");
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

function initScrollEffects() {
  const navbar = document.getElementById("navbar");
  const heroSection = document.getElementById("home");

  if (!navbar || !heroSection) return;

  const handleScroll = () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    if (heroBottom <= 80) {
      navbar.classList.add("scrolled-dark");
    } else {
      navbar.classList.remove("scrolled-dark");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

function initProjects() {
  const projectsGrid = document.getElementById("projects-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (!projectsGrid) return;

  renderProjects(projectsData, projectsGrid);

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      if (filter === "all") {
        renderProjects(projectsData, projectsGrid);
      } else {
        const filtered = projectsData.filter((item) => item.category === filter);
        renderProjects(filtered, projectsGrid);
      }
    });
  });
}

function renderProjects(projects, container) {
  container.innerHTML = "";

  projects.forEach((proj) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const targetUrl = proj.liveUrl || proj.demoUrl;
    let demoButtonHtml = "";
    if (targetUrl) {
      demoButtonHtml = `
        <a href="${targetUrl}" class="card-btn card-btn-demo" ${targetUrl.startsWith("http") || targetUrl.includes(".html") ? 'target="_blank" rel="noopener noreferrer"' : ""}>
          <span>View Project</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>
      `;
    } else {
      demoButtonHtml = `
        <span class="card-btn card-btn-disabled" title="Live project link unavailable" aria-disabled="true">
          <span>Unavailable</span>
        </span>
      `;
    }

    let githubButtonHtml = "";
    if (proj.githubUrl) {
      githubButtonHtml = `
        <a href="${proj.githubUrl}" class="card-btn card-btn-github" target="_blank" rel="noopener noreferrer">
          <span>GitHub</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        </a>
      `;
    } else {
      githubButtonHtml = `
        <span class="card-btn card-btn-disabled" title="Repository not published yet" aria-disabled="true">
          <span>No Repo</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        </span>
      `;
    }

    const techList = proj.technologies || proj.tags || [];
    const tagsHtml = techList
      .map((tag) => `<span class="project-tag">${tag}</span>`)
      .join("");

    const displayTitle = proj.name || proj.title;
    const thumbHtml = proj.image
      ? `<img src="${proj.image}" alt="${displayTitle} preview" class="project-card-thumb" loading="lazy" onerror="this.style.display='none';">`
      : "";

    card.innerHTML = `
      <div class="project-card-banner">
        ${thumbHtml}
        <div class="banner-pattern" aria-hidden="true"></div>
        <span class="project-category-badge">${proj.categoryLabel}</span>
        <div class="project-icon-art" style="background-color: ${proj.accentColor}; color: #111111;">
          ${proj.icon}
        </div>
      </div>
      <div class="project-card-body">
        <h3 class="project-title">${displayTitle}</h3>
        <p class="project-desc">${proj.description}</p>
        <div class="project-tags">${tagsHtml}</div>
        <div class="project-card-footer">
          ${demoButtonHtml}
          ${githubButtonHtml}
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function initYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ==================== NAVIGATION ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ==================== THEME TOGGLE ====================
const htmlEl = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');

function applyTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  // icon state
  toggleBtn.classList.toggle('is-dark', theme === 'dark');
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) return applyTheme(saved);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
}

toggleBtn.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(current);
});

initTheme();

// ==================== TYPING ANIMATION ====================
const roles = [
  'Data Engineer',
  'ML Practitioner',
  'Fraud Detection Specialist',
  'Big Data Expert'
];

let roleIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 100;

function typeRole() {
  const roleText = document.getElementById('roleText');
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    roleText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--; typingSpeed = 50;
  } else {
    roleText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++; typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    typingSpeed = 2000; isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; typingSpeed = 500;
  }
  setTimeout(typeRole, typingSpeed);
}
document.addEventListener('DOMContentLoaded', typeRole);

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('reveal-in');
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const animated = document.querySelectorAll(
    '.xp-card, .project-card, .skill-category, .stat-item, .education-card, .hero-content, .contact-info'
  );
  animated.forEach(el => observer.observe(el));
});

// ==================== ACTIVE NAV HIGHLIGHT ====================
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

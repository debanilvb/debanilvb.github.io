// your code goes here
// NAV
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

// THEME TOGGLE
const htmlEl = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');

function applyTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
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

// TYPING
const roles = ['Data Science','Machine Learning','Fraud & Risk','Applied Statistics'];
let roleIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 100;

function typeRole() {
  const roleText = document.getElementById('roleText');
  const currentRole = roles[roleIndex];
  if (isDeleting) { roleText.textContent = currentRole.substring(0, charIndex - 1); charIndex--; typingSpeed = 50; }
  else { roleText.textContent = currentRole.substring(0, charIndex + 1); charIndex++; typingSpeed = 100; }
  if (!isDeleting && charIndex === currentRole.length) { typingSpeed = 2000; isDeleting = true; }
  else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; typingSpeed = 500; }
  setTimeout(typeRole, typingSpeed);
}
document.addEventListener('DOMContentLoaded', typeRole);

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// REVEAL
const observer = new IntersectionObserver((entries)=> {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('reveal-in'); });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal-in, .glass-card, .parallax-tile').forEach(el => observer.observe(el));
});

// ACTIVE NAV
window.addEventListener('scroll', () => {
  let current = '';
  document.querySelectorAll('section, header.hero').forEach(section => {
    const top = section.offsetTop;
    if (pageYOffset >= top - 200) current = section.getAttribute('id') || 'home';
  });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
});

// Parallax tilt for skill tiles
document.querySelectorAll('.parallax-tile').forEach(tile => {
  tile.addEventListener('mousemove', (e) => {
    const r = tile.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tile.style.transform = `perspective(800px) rotateX(${(-y*3)}deg) rotateY(${(x*3)}deg) translateZ(4px)`;
  });
  tile.addEventListener('mouseleave', () => {
    tile.style.transform = '';
  });
});

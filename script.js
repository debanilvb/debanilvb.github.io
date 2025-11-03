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

// 
document.addEventListener('mousemove', (e) => {
  const glassCards = document.querySelectorAll('.lg-depth, .glass-card, .parallax-tile');
  
  glassCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const isInside = x > 0 && x < rect.width && y > 0 && y < rect.height;
    
    if (isInside) {
      const xPercent = (x / rect.width - 0.5) * 100;
      const yPercent = (y / rect.height - 0.5) * 100;
      
      //
      card.style.setProperty('--mouse-x', xPercent + '%');
      card.style.setProperty('--mouse-y', yPercent + '%');
    }
  });
});

// Parallax tilt 
document.querySelectorAll('.parallax-tile').forEach(tile => {
  tile.addEventListener('mousemove', (e) => {
    const r = tile.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    
    // 
    tile.style.transform = `
      perspective(1200px) 
      rotateX(${(-y * 8)}deg) 
      rotateY(${(x * 8)}deg) 
      translateZ(10px) 
      scale(1.02)
    `;
  });
  
  tile.addEventListener('mouseleave', () => {
    tile.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
  });
});

// 
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    btn.style.setProperty('--btn-x', x + 'px');
    btn.style.setProperty('--btn-y', y + 'px');
  });
});

// 
document.querySelectorAll('.glass-card, .glass-chip').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });
});

console.log('Liquid Glass Portfolio loaded! 🌊✨');

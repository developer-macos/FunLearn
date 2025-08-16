
// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Theme toggle
const themeBtn = document.getElementById('themeToggle');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
let theme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'dark'); // default dark
document.documentElement.dataset.theme = theme;
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  });
}

// Newsletter fake handler
const signup = document.getElementById('signup');
if (signup) {
  signup.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signup.email.value.trim();
    const msg = signup.querySelector('.form-msg');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.textContent = 'Please enter a valid email.';
      msg.style.color = '#fca5a5';
      return;
    }
    msg.textContent = 'Thanks for subscribing! We just sent you a digital high‑five ✋';
    msg.style.color = 'var(--ok)';
    signup.reset();
  });
}

// Contact form fake handler
const contact = document.getElementById('contactForm');
if (contact) {
  contact.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = contact.querySelector('.form-msg');
    msg.textContent = 'Message sent! We will reply faster than a JS event loop tick.';
    msg.style.color = 'var(--ok)';
    contact.reset();
  });
}

// Year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

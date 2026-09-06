(function () {
  'use strict';

  /* ---------- Theme toggle (dark default) ---------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');
  var STORAGE_KEY = 'portfolio-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
      themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    }
  }

  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* storage unavailable */ }
  applyTheme(saved === 'light' ? 'light' : 'dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.querySelectorAll('#navMenu a, .nav-contact-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll reveal (continuous up & down) ---------- */
  var reveals = document.querySelectorAll('.reveal');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function revealAll() {
    reveals.forEach(function (el) { el.classList.add('in-view'); });
  }

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealAll();
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Hero packet travel animation ---------- */
  var packet = document.getElementById('packet');
  if (packet) {
    if (!prefersReducedMotion) {
      requestAnimationFrame(function () {
        packet.classList.add('run');
      });
    } else {
      packet.style.opacity = '1';
    }
  }

  /* ---------- Contact form (static, no backend) ---------- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        if (status) status.textContent = 'Please fill in all fields with a valid email.';
        return;
      }
      if (status) status.textContent = 'Thanks — your message is ready to send. Connect an email service to deliver it automatically.';
      form.reset();
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
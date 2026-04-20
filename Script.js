// ============================================
//   DYCREX CLINIC — JavaScript
// ============================================

// ── Navbar scroll effect ──────────────────────
const navbar = document.querySelector('.navbar');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
  if (backToTop) {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
});

// ── Mobile menu ───────────────────────────────
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu?.classList.toggle('open');
  document.body.style.overflow = mobileMenu?.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Back to top ───────────────────────────────
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Scroll reveal ─────────────────────────────
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger children if they share a parent grid
      const siblings = entry.target.parentElement?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      let delay = 0;
      if (siblings && siblings.length > 1) {
        siblings.forEach((sib, i) => {
          if (sib === entry.target) delay = i * 100;
        });
      }
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.10,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ── Active nav link ───────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── Smooth scroll to section ──────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    }
  });
});

// ── Registration form (Formspree) ─────────────
const regForm = document.getElementById('reg-form');
const regSuccess = document.getElementById('reg-success');

regForm?.addEventListener('submit', async function (e) {
  e.preventDefault();
  const btn = this.querySelector('[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  try {
    const response = await fetch('https://formspree.io/f/xdkogqkn', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(this)
    });

    if (response.ok) {
      this.reset();
      if (regSuccess) {
        regSuccess.classList.add('show');
        setTimeout(() => regSuccess.classList.remove('show'), 5000);
      }
    } else {
      alert('Something went wrong. Please try again or call us directly.');
    }
  } catch {
    alert('Network error. Please call us at 1234567890.');
  }

  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Appointment Request';
});

// ── Contact form (Formspree) ──────────────────
const ctForm = document.getElementById('contact-form');
const ctSuccess = document.getElementById('contact-success');

ctForm?.addEventListener('submit', async function (e) {
  e.preventDefault();
  const btn = this.querySelector('[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  try {
    const response = await fetch('https://formspree.io/f/xdkogqkn', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(this)
    });

    if (response.ok) {
      this.reset();
      if (ctSuccess) {
        ctSuccess.classList.add('show');
        setTimeout(() => ctSuccess.classList.remove('show'), 5000);
      }
    } else {
      alert('Something went wrong. Please try again or call us directly.');
    }
  } catch {
    alert('Network error. Please call us at 1234567890.');
  }

  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
});

// ── Counter animation ─────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      clearInterval(timer);
      current = target;
    }
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
  }, 16);
}

const counters = document.querySelectorAll('[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

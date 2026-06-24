// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const tick = () => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start);
    if (start < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// ===== INTERSECTION OBSERVER =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

// Metric counters
const metricObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.metric-num');
      nums.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'));
        animateCounter(num, target);
      });
      metricObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const metricsEl = document.querySelector('.hero-metrics');
if (metricsEl) metricObserver.observe(metricsEl);

// Scroll reveal for sections
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.skill-group, .project-card, .edu-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.skill-group, .project-card, .edu-card').forEach(el => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    obs.observe(el);
  });
});

// ===== TERMINAL TYPING EFFECT =====
document.addEventListener('DOMContentLoaded', () => {
  // Already rendered, just add fade-in class to hero elements
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const children = ['.hero-eyebrow', '.hero-name', '.hero-title', '.hero-subtitle', '.hero-metrics', '.hero-actions'];
    children.forEach((sel, i) => {
      const el = heroContent.querySelector(sel);
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 100 + i * 100);
      }
    });
  }

  const terminal = document.querySelector('.hero-terminal');
  if (terminal) {
    terminal.style.opacity = '0';
    terminal.style.transform = 'translateX(20px)';
    terminal.style.transition = 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s';
    setTimeout(() => {
      terminal.style.opacity = '1';
      terminal.style.transform = 'translateX(0)';
    }, 100);
  }
});

// ===== SMOOTH NAV HIGHLIGHT =====
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--cyan)';
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(sec => navObserver.observe(sec));

// ===== STAT COUNTERS IN PROJECT CARDS =====
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        const raw = el.textContent;
        const num = parseInt(raw);
        if (!isNaN(num)) {
          const suffix = raw.replace(num.toString(), '');
          let start = 0;
          const step = num / 60;
          const tick = () => {
            start = Math.min(start + step, num);
            el.textContent = Math.floor(start) + suffix;
            if (start < num) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.project-stats').forEach(el => statObserver.observe(el));

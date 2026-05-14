/* ================================================================
   PORTFOLIO — script.js
   Colorful Creative Personal Portfolio
================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. CUSTOM CURSOR
  ============================================================ */
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Ring follows with lag
  function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Scale cursor on interactive elements
  document.querySelectorAll('a, button, .project-card, .about-card, .testi-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform  = 'translate(-50%,-50%) scale(2)';
      ring.style.width     = '56px';
      ring.style.height    = '56px';
      ring.style.borderColor = 'rgba(255,107,107,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.transform  = 'translate(-50%,-50%) scale(1)';
      ring.style.width     = '36px';
      ring.style.height    = '36px';
      ring.style.borderColor = 'rgba(255,107,107,0.5)';
    });
  });

  /* ============================================================
     2. NAVBAR — Scroll & Active Link
  ============================================================ */
  const navbar  = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Sticky style
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // Active link highlight
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });

  /* ============================================================
     3. MOBILE MENU
  ============================================================ */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ============================================================
     4. SCROLL REVEAL (Intersection Observer)
  ============================================================ */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Staggered delay for sibling groups
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const idx      = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = (idx * 0.08) + 's';
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ============================================================
     5. ANIMATED COUNTER (Stats)
  ============================================================ */
  const statNums = document.querySelectorAll('.stat-num[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target   = +el.dataset.target;
    const duration = 1800;
    const step     = target / (duration / 16);
    let current    = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 16);
  }

  /* ============================================================
     6. SKILL BAR ANIMATION
  ============================================================ */
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const width = el.dataset.width || '0';
        // Small delay so animation feels intentional
        setTimeout(() => {
          el.style.width = width + '%';
        }, 200);
        skillObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  skillFills.forEach(el => skillObserver.observe(el));

  /* ============================================================
     7. PROJECT FILTER
  ============================================================ */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const cats = card.dataset.category || '';
        const show  = filter === 'all' || cats.includes(filter);

        if (show) {
          card.classList.remove('hidden');
          card.style.animation = 'cardReveal 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ============================================================
     8. CONTACT FORM
  ============================================================ */
  const form        = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled    = true;

      // Simulate async send (replace with your actual fetch/formspree/emailjs call)
      setTimeout(() => {
        submitBtn.textContent = 'Send Message 🚀';
        submitBtn.disabled    = false;
        formSuccess.classList.add('visible');
        form.reset();

        setTimeout(() => formSuccess.classList.remove('visible'), 5000);
      }, 1400);
    });
  }

  /* ============================================================
     9. SMOOTH SCROLL (for older browsers without CSS scroll-behavior)
  ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ============================================================
     10. FLOATING BADGE PARALLAX (subtle, hero only)
  ============================================================ */
  const floatBadges = document.querySelectorAll('.float-badge');

  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    floatBadges.forEach((badge, i) => {
      const depth = 0.015 + i * 0.008;
      badge.style.transform = `translate(${dx * 20 * depth * 100}px, ${dy * 20 * depth * 100 - (Math.sin(Date.now() / 1000 + i * 1.5) * 8)}px)`;
    });
  });

  /* ============================================================
     11. AVATAR PARALLAX (hero)
  ============================================================ */
  const avatarImg = document.querySelector('.avatar-img');

  document.addEventListener('mousemove', e => {
    if (!avatarImg) return;
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    avatarImg.style.transform = `perspective(800px) rotateY(${dx * 6}deg) rotateX(${-dy * 4}deg)`;
  });

  /* ============================================================
     12. TOOL PILLS — Random Color Highlight on Hover
  ============================================================ */
  const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#C77DFF'];
  document.querySelectorAll('.tool-pill').forEach(pill => {
    pill.addEventListener('mouseenter', () => {
      const clr = colors[Math.floor(Math.random() * colors.length)];
      pill.style.borderColor = clr;
      pill.style.color       = clr;
      pill.style.background  = clr + '12';
    });
    pill.addEventListener('mouseleave', () => {
      pill.style.borderColor = '';
      pill.style.color       = '';
      pill.style.background  = '';
    });
  });

  /* ============================================================
     13. NAVBAR LINK ACTIVE ON CLICK (mobile)
  ============================================================ */
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  /* ============================================================
     14. TESTI CARDS — Auto cycle border color
  ============================================================ */
  const testiColors = ['rgba(255,107,107,0.3)', 'rgba(77,150,255,0.3)', 'rgba(107,203,119,0.3)'];
  document.querySelectorAll('.testi-card').forEach((card, i) => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = testiColors[i % testiColors.length];
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '';
    });
  });

  /* ============================================================
     15. PAGE LOAD — Stagger hero elements
  ============================================================ */
  const heroRevealEls = document.querySelectorAll('.hero .reveal');
  heroRevealEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 + i * 150);
  });

});

/* ================================================================
   CARD REVEAL KEYFRAME (injected dynamically)
================================================================ */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes cardReveal {
    from { opacity: 0; transform: translateY(20px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
`;
document.head.appendChild(styleSheet);

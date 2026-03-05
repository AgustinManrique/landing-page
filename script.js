/* ═══════════════════════════════════════════════════════
   AGUSTÍN MANRIQUE — PORTFOLIO JS
   GSAP + ScrollTrigger + Lenis + ReactBits-inspired FX
   ═══════════════════════════════════════════════════════ */

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function boot() {
  await loadScript('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js');
  await loadScript('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js');
  await loadScript('https://unpkg.com/lenis@1.1.18/dist/lenis.min.js');

  gsap.registerPlugin(ScrollTrigger);

  initLenis();
  initNavbar();
  initMobileMenu();
  initSplitText();
  initHeroAnimations();
  initScrollReveal();
  initCountUp();
  initOrbFloat();
  initHeroParallax();
  initProjectTilt();
  initSpotlightCursor();
  initMagneticButtons();
  initMarquee();
}

/* ═══════════════════════════════
   LENIS SMOOTH SCROLL
   ═══════════════════════════════ */
function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 2,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) lenis.scrollTo(target, { offset: -80 });
    });
  });

  window.__lenis = lenis;
}

/* ═══════════════════════════════
   NAVBAR
   ═══════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      navbar.classList.toggle('scrolled', self.scroll() > 80);
    },
  });
}

/* ═══════════════════════════════
   MOBILE MENU
   ═══════════════════════════════ */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ═══════════════════════════════
   SPLIT TEXT (ReactBits-style)
   Splits hero name into individual
   chars for staggered animation
   ═══════════════════════════════ */
function initSplitText() {
  const nameEl = document.querySelector('.hero-name');
  if (!nameEl) return;

  const html = nameEl.innerHTML;
  // Split by <br/> to handle multi-line
  const lines = html.split(/<br\s*\/?>/i);
  let result = '';

  lines.forEach((line, li) => {
    const chars = line.trim().split('');
    chars.forEach((char, ci) => {
      if (char === ' ') {
        result += '<span class="split-char">&nbsp;</span>';
      } else {
        result += `<span class="split-char" style="--char-index:${ci}">${char}</span>`;
      }
    });
    if (li < lines.length - 1) result += '<br/>';
  });

  nameEl.innerHTML = result;
}

/* ═══════════════════════════════
   HERO ENTRANCE ANIMATIONS
   ═══════════════════════════════ */
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Set initial states explicitly
  gsap.set('.hero-line', { opacity: 0, y: 20 });
  gsap.set('.split-char', { opacity: 0, y: 50, rotateX: -90 });
  gsap.set('.hero-subtitle', { opacity: 0, y: 30 });
  gsap.set('.hero-description', { opacity: 0, y: 30 });
  gsap.set('.hero-cta', { opacity: 0, y: 30 });
  gsap.set('.scroll-indicator', { opacity: 0 });

  tl.to('.hero-line', { opacity: 1, y: 0, duration: 0.5, delay: 0.3 })
    .to('.split-char', {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: 'back.out(1.7)',
    }, '-=0.2')
    .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
    .to('.hero-description', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    .to('.hero-cta', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
    .to('.scroll-indicator', { opacity: 1, duration: 0.8 }, '-=0.2');

  // Gradient animation on name
  gsap.to('.hero-name', {
    backgroundPosition: '200% 200%',
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
}

/* ═══════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════ */
function initScrollReveal() {
  document.querySelectorAll('.reveal:not(.hero .reveal):not(.hero-line):not(.hero-name)').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      }
    );
  });

  document.querySelectorAll('.project-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 60, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.8, delay: i * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
      }
    );
  });

  document.querySelectorAll('.skill-group').forEach((group, i) => {
    gsap.fromTo(group,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.7, delay: i * 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: group, start: 'top 90%', toggleActions: 'play none none none' },
      }
    );
  });
}

/* ═══════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════ */
function initCountUp() {
  document.querySelectorAll('.stat-number[data-count]').forEach((stat) => {
    const target = parseInt(stat.dataset.count, 10);
    ScrollTrigger.create({
      trigger: stat,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(stat, {
          innerText: target,
          duration: 1.5,
          snap: { innerText: 1 },
          ease: 'power2.out',
        });
      },
    });
  });
}

/* ═══════════════════════════════
   FLOATING ORBS
   ═══════════════════════════════ */
function initOrbFloat() {
  gsap.to('.orb-1', { x: 60, y: -40, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.orb-2', { x: -50, y: 50, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.orb-3', { x: 40, y: -30, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
}

/* ═══════════════════════════════
   HERO PARALLAX (subtle)
   ═══════════════════════════════ */
function initHeroParallax() {
  gsap.to('.hero-bg', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  gsap.to('.hero-content', {
    y: -60,
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: '30% top', end: 'bottom top', scrub: true },
  });

  gsap.to('.scroll-indicator', {
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: '15% top', end: '25% top', scrub: true },
  });
}

/* ═══════════════════════════════
   PROJECT CARD 3D TILT
   ═══════════════════════════════ */
function initProjectTilt() {
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (y - 0.5) * -6;
      const rotateY = (x - 0.5) * 6;

      gsap.to(card, {
        rotateX, rotateY,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1000,
      });

      // Spotlight glow on card
      card.style.setProperty('--mouse-x', `${x * 100}%`);
      card.style.setProperty('--mouse-y', `${y * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power2.out' });
    });
  });
}

/* ═══════════════════════════════
   SPOTLIGHT CURSOR (ReactBits-style)
   Radial glow that follows mouse
   ═══════════════════════════════ */
function initSpotlightCursor() {
  const spotlight = document.createElement('div');
  spotlight.className = 'spotlight-cursor';
  document.body.appendChild(spotlight);

  let mouseX = 0, mouseY = 0;
  let spotX = 0, spotY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    // Smooth lerp
    spotX += (mouseX - spotX) * 0.1;
    spotY += (mouseY - spotY) * 0.1;
    spotlight.style.left = `${spotX}px`;
    spotlight.style.top = `${spotY}px`;
    requestAnimationFrame(animate);
  }
  animate();
}

/* ═══════════════════════════════
   MAGNETIC BUTTONS (ReactBits-style)
   Buttons subtly pull toward cursor
   ═══════════════════════════════ */
function initMagneticButtons() {
  document.querySelectorAll('.btn, .contact-card').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

/* ═══════════════════════════════
   TECH MARQUEE (ReactBits-style)
   Infinite scrolling ticker
   ═══════════════════════════════ */
function initMarquee() {
  const marquee = document.querySelector('.marquee-track');
  if (!marquee) return;

  // Clone items for seamless loop
  const content = marquee.innerHTML;
  marquee.innerHTML = content + content;

  const totalWidth = marquee.scrollWidth / 2;

  gsap.to(marquee, {
    x: -totalWidth,
    duration: 30,
    ease: 'none',
    repeat: -1,
  });
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', boot);

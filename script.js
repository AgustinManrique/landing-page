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
  initProjectModal();
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

/* ═══════════════════════════════
   PROJECT DETAIL MODAL
   ═══════════════════════════════ */
function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');
  const track = document.getElementById('galleryTrack');
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  const dotsEl = document.getElementById('galleryDots');
  const slideTitle = document.getElementById('gallerySlideTitle');
  const slideDesc = document.getElementById('gallerySlideDesc');

  let currentSlide = 0;
  let currentProject = null;

  const icons = {
    grid: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    cart: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>',
    'credit-card': '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="22" height="16" x="1" y="4" rx="2"/><path d="M1 10h22"/></svg>',
    settings: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/></svg>',
    moon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></svg>',
    shield: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>',
    bot: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>',
    test: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m9 12 2 2 4-4"/><rect width="14" height="14" x="5" y="5" rx="2"/></svg>',
    layout: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
    'clipboard-list': '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>',
    'bar-chart': '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>',
    'file-text': '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>',
    columns: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>',
    'edit-3': '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
    api: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>',
    trophy: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
    target: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    table: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/></svg>',
    zap: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>',
  };

  const projectData = {
    roxana: {
      role: 'Proyecto propio',
      title: 'Roxana Aromaterapia',
      desc: 'E-commerce completo para una regalería en La Plata, actualmente en producción. Catálogo de productos, carrito de compras, checkout vía WhatsApp, panel de administración, notificaciones por email y modo oscuro.',
      tags: ['React', 'TypeScript', 'Supabase', 'Tailwind', 'WhatsApp API', 'Railway'],
      links: [
        { label: 'Web en vivo', url: 'https://www.roxanaaromaterapia.com' },
        { label: 'Código', url: 'https://github.com/AgustinManrique/roxana-aromaterapia' },
      ],
      gradient: 'linear-gradient(135deg, #818cf8, #c084fc, #f472b6)',
      slides: [
        { title: 'Catálogo de Productos', desc: 'Vista principal con grid adaptativo, filtros por categoría y búsqueda en tiempo real. Diseño responsive de móvil a desktop. Captura en modo oscuro.', icon: 'grid', image: 'images/projects/roxana-catalogo.png' },
        { title: 'Carrito de Compras', desc: 'Drawer lateral con los productos agregados, control de cantidades, eliminación individual, cálculo de total y botones de finalizar compra o vaciar carrito. Captura en modo oscuro.', icon: 'cart', image: 'images/projects/roxana-carrito.png' },
        { title: 'Checkout vía WhatsApp', desc: 'Pantalla de finalización con selección de tipo de entrega (retiro en local o envío privado), notas del pedido y botón de WhatsApp que envía el resumen completo al negocio. Captura en modo oscuro.', icon: 'cart', image: 'images/projects/roxana-finalizar-compra.png' },
        { title: 'Gestión de Productos', desc: 'Tabla CRUD con nombre, descripción, categoría, precio, stock y acciones de editar/eliminar. Botón para agregar nuevos productos con subida de imágenes a Supabase Storage. Captura en modo oscuro.', icon: 'settings', image: 'images/projects/roxana-admin-productos.png' },
        { title: 'Panel Admin — Estadísticas', desc: 'Dashboard de métricas del negocio: ingresos, pedidos, ticket promedio, entregas. Secciones de productos más vendidos, estado de pedidos y mejores clientes con filtro por período. Captura en modo oscuro.', icon: 'bar-chart', image: 'images/projects/roxana-admin-stats.png' },
      ],
    },
    maps: {
      role: 'Colaborador',
      title: 'Maps Asesores',
      desc: 'Plataforma e-commerce para una aseguradora. Catálogo de productos, carrito de compras, integración de pagos con MercadoPago/Stripe, chatbot con BotMaker y testing con Jest. Proyecto grupal universitario.',
      tags: ['React', 'Node.js', 'Prisma', 'Docker', 'Jest'],
      links: [
        { label: 'Código', url: 'https://github.com/lucaslegor/UTN-DS25-GRUPO-08' },
      ],
      gradient: 'linear-gradient(135deg, #22d3ee, #818cf8)',
      slides: [
        { title: 'Catálogo de Seguros', desc: 'Vitrina de productos de la aseguradora con categorías, filtros y detalle de cada plan de cobertura.', icon: 'shield' },
        { title: 'Carrito y Checkout', desc: 'Proceso de compra completo con selección de planes, resumen de cobertura y pasarela de pago integrada.', icon: 'cart' },
        { title: 'Chatbot BotMaker', desc: 'Asistente virtual integrado para consultas de clientes sobre coberturas, precios y procesos de contratación.', icon: 'bot' },
        { title: 'Testing con Jest', desc: 'Suite completa de tests unitarios y de integración con Jest para asegurar la calidad y estabilidad del código.', icon: 'test' },
      ],
    },
    paicat: {
      role: 'Colaborador',
      title: 'PAICAT',
      desc: 'Sistema de gestión integral para el curso de ingreso de la UTN FRLP. Control de asistencia, calificaciones en Física, Matemática y Química, gestión de comisiones, reportes en PDF/Excel y roles de usuario.',
      tags: ['Laravel 11', 'MariaDB', 'Tailwind', 'Alpine.js', 'Docker'],
      links: [
        { label: 'Código', url: 'https://github.com/FranciscoMontiron/PAICAT' },
      ],
      gradient: 'linear-gradient(135deg, #34d399, #22d3ee)',
      slides: [
        { title: 'Dashboard Principal', desc: 'Panel de control con métricas del curso de ingreso: cantidad de alumnos, asistencia general, promedios por materia y alertas.', icon: 'layout' },
        { title: 'Control de Asistencia', desc: 'Registro de asistencia por comisión con vista de calendario, porcentajes y alertas por inasistencias.', icon: 'clipboard-list' },
        { title: 'Calificaciones', desc: 'Sistema de notas para Física, Matemática y Química con promedios automáticos, parciales y recuperatorios.', icon: 'bar-chart' },
        { title: 'Reportes PDF/Excel', desc: 'Generación automática de reportes exportables con datos de asistencia, calificaciones y estadísticas por comisión.', icon: 'file-text' },
      ],
    },
    tasktracker: {
      role: 'Proyecto propio',
      title: 'TaskTracker',
      desc: 'Aplicación full stack de gestión de tareas con vista kanban, filtrado avanzado, dark mode, API REST completa y sistema de autenticación. Diseño inspirado en F1.',
      tags: ['Django', 'DRF', 'Tailwind', 'SQLite', 'REST API'],
      links: [],
      gradient: 'linear-gradient(135deg, #f97316, #ef4444)',
      slides: [
        { title: 'Dashboard', desc: 'Vista principal con cards de tareas agrupadas por estado, estadísticas de progreso, búsqueda y filtros por estado/proyecto.', icon: 'layout', image: 'images/projects/tasktracker-dashboard.png' },
        { title: 'Login', desc: 'Sistema de autenticación completo con formulario de login y protección de vistas. Diseño F1 con rojo, negro y blanco.', icon: 'shield', image: 'images/projects/tasktracker-login.png' },
        { title: 'Gestión de Tareas', desc: 'Formularios con prioridad, asignación a proyecto, tags, fecha de vencimiento y Work Units (equipos).', icon: 'edit-3' },
        { title: 'API REST', desc: 'API completa con Django REST Framework. Endpoints CRUD para tareas, proyectos, tags y work units.', icon: 'api' },
      ],
    },
    torneo: {
      role: 'Proyecto propio',
      title: 'Torneo de Bar',
      desc: 'App interactiva para organizar torneos de pool y fútbol en bares. Sistema de brackets con hasta 16 jugadores, mini-juegos de penales y pool con físicas, y diseño temático dual.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'localStorage'],
      links: [],
      gradient: 'linear-gradient(135deg, #eab308, #f97316)',
      slides: [
        { title: 'Mesa de Pool Interactiva', desc: 'Interfaz principal con mesa de pool visual donde las troneras sirven como botones para seleccionar el formato del torneo (2 a 16 jugadores).', icon: 'target', image: 'images/projects/torneo-pool.png' },
        { title: 'Mini-Juego de Pool', desc: 'Simulación de tiros con bola blanca, colisiones físicas, detección de troneras, contador de tiros y mejores puntajes guardados en localStorage.', icon: 'target', image: 'images/projects/torneo-setup.png' },
        { title: 'Brackets del Torneo', desc: 'Visualización de llaves con progresión automática de ganadores. Soporte para modo pool y modo fútbol.', icon: 'table', image: 'images/projects/torneo-brackets.png' },
        { title: 'Mini-Juego de Penales', desc: 'Juego interactivo de penales con arquero controlado por IA, sistema de rachas y high score persistente.', icon: 'zap' },
      ],
    },
  };

  // Inject expand buttons into cards
  document.querySelectorAll('.project-card[data-project]').forEach((card) => {
    const btn = document.createElement('button');
    btn.className = 'project-expand';
    btn.setAttribute('aria-label', 'Ver detalles');
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>';
    card.style.position = 'relative';
    card.querySelector('.project-body').appendChild(btn);
  });

  function openModal(projectId) {
    currentProject = projectData[projectId];
    if (!currentProject) return;
    currentSlide = 0;

    document.getElementById('modalRole').textContent = currentProject.role;
    document.getElementById('modalTitle').textContent = currentProject.title;
    document.getElementById('modalDesc').textContent = currentProject.desc;

    const tagsEl = document.getElementById('modalTags');
    tagsEl.innerHTML = currentProject.tags.map((t) => `<span>${t}</span>`).join('');

    const linksEl = document.getElementById('modalLinks');
    if (currentProject.links.length > 0) {
      linksEl.innerHTML = currentProject.links
        .map((l) => `<a href="${l.url}" target="_blank" rel="noopener">${l.label} &#8599;</a>`)
        .join('');
      linksEl.style.display = 'flex';
    } else {
      linksEl.style.display = 'none';
    }

    track.innerHTML = currentProject.slides
      .map(
        (slide) => slide.image
          ? `<div class="gallery-slide">
              <img class="gallery-slide-img" src="${slide.image}" alt="${slide.title}" loading="lazy"/>
            </div>`
          : `<div class="gallery-slide">
              <div class="gallery-slide-bg" style="background: ${currentProject.gradient}"></div>
              <div class="gallery-slide-icon">${icons[slide.icon] || ''}</div>
              <span class="gallery-slide-label">${slide.title}</span>
            </div>`
      )
      .join('');

    dotsEl.innerHTML = currentProject.slides
      .map((_, i) => `<button class="gallery-dot${i === 0 ? ' active' : ''}" data-index="${i}"></button>`)
      .join('');

    goToSlide(0);

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.__lenis) window.__lenis.stop();
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (window.__lenis) window.__lenis.start();
  }

  function goToSlide(index) {
    const slides = currentProject.slides;
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    slideTitle.textContent = slides[index].title;
    slideDesc.textContent = slides[index].desc;
    dotsEl.querySelectorAll('.gallery-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // Card click → open modal (skip if clicking a link)
  document.querySelectorAll('.project-card[data-project]').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      openModal(card.dataset.project);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  dotsEl.addEventListener('click', (e) => {
    const dot = e.target.closest('.gallery-dot');
    if (dot) goToSlide(parseInt(dot.dataset.index));
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
    if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
  });

  // Touch swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goToSlide(currentSlide + 1) : goToSlide(currentSlide - 1);
    }
  }, { passive: true });
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', boot);

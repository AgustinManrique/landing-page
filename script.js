/* ═══════════════════════════════════════════════════════
   AGUSTÍN MANRIQUE — PORTFOLIO JS
   Text scramble · Canvas sandbox · GSAP reveals
   ═══════════════════════════════════════════════════════ */

/* ═══════════════════════════════
   i18n TRANSLATIONS
   ═══════════════════════════════ */
let currentLang = localStorage.getItem('portfolio-lang') || 'es';

const translations = {
  es: {
    'nav.about': 'Sobre mí',
    'nav.projects': 'Proyectos',
    'nav.playground': 'Playground',
    'nav.contact': 'Contacto',
    'hero.greeting': 'Hola, soy',
    'hero.subtitle': 'Desarrollador Full Stack · Freelance',
    'hero.description': 'Desarrollo soluciones web a medida para clientes y proyectos propios. Coordinando equipos de desarrollo para empresas.',
    'hero.cta.projects': 'Ver proyectos',
    'hero.cta.cv': 'Descargar CV',
    'hero.cta.contact': 'Contactame',
    'about.tag': 'Sobre mí',
    'about.p1': 'Tengo 23 años y soy <strong>Licenciado en Ciberseguridad Aplicada</strong> y <strong>Analista de Sistemas</strong> por la <strong>UTN Facultad Regional La Plata</strong>.',
    'about.p2': 'Trabajo como <strong>desarrollador freelance</strong> creando soluciones web a medida para clientes. Actualmente también <strong>coordino equipos de desarrollo</strong> en proyectos para empresas.',
    'about.stat1': 'En producción',
    'about.stat2': 'Tecnologías',
    'about.stat3': 'Clientes',
    'about.diploma.title': 'Lic. Ciberseguridad Aplicada',
    'about.diploma.inst': 'UTN Facultad Regional La Plata',
    'playground.tag': 'Playground',
    'playground.title': 'Experimentá',
    'playground.desc': 'Elegí un efecto y jugá con las animaciones interactivas.',
    'playground.hint': 'Mové el mouse por el canvas',
    'playground.btn.particles': 'Partículas',
    'playground.btn.waves': 'Ondas',
    'playground.btn.gravity': 'Gravedad',
    'playground.btn.matrix': 'Matrix',
    'playground.btn.starfield': 'Estrellas',
    'projects.tag': 'Proyectos',
    'projects.title': 'Trabajo destacado',
    'projects.badge.live': 'En producción',
    'projects.badge.soon': 'Próximamente',
    'projects.other': 'Otros proyectos',
    'project.planestudio.role': 'Proyecto propio',
    'project.planestudio.desc': 'Plataforma web para estudiantes universitarios. Malla curricular interactiva, estadísticas y soporte multi-carrera. Usada por alumnos de la UNLP.',
    'project.roxana.role': 'Proyecto propio',
    'project.roxana.desc': 'E-commerce completo con catálogo, carrito, checkout WhatsApp, panel admin, notificaciones y modo oscuro.',
    'project.estudiojob.role': 'Cliente freelance',
    'project.estudiojob.desc': 'Sitio institucional para estudio de arquitectura. Showcase de proyectos, panel admin y diseño responsive con Framer Motion.',
    'project.peirano.role': 'Coordinación de equipo',
    'project.peirano.desc': 'Plataforma inmobiliaria con catálogo, filtros avanzados y panel admin. En desarrollo, coordinando equipo.',
    'project.maps.desc.short': 'E-commerce para aseguradora con pagos MercadoPago/Stripe y chatbot.',
    'project.paicat.desc.short': 'Sistema de gestión del ingreso UTN FRLP. Asistencia, notas y reportes.',
    'project.tasktracker.desc.short': 'Gestión de tareas con vista kanban, dark mode y API REST.',
    'project.torneo.desc.short': 'Torneos de pool y fútbol con brackets y mini-juegos con físicas.',
    'contact.tag': 'Contacto',
    'contact.title': 'Trabajemos juntos',
    'contact.available': 'Disponible para trabajar',
    'contact.text': '¿Tenés un proyecto en mente? Me encantaría ayudarte a hacerlo realidad.',
    'contact.whatsapp': 'Escribime directamente',
    'footer.text': 'Agustín Manrique &mdash; 2026',
    'meta.title': 'Agustín Manrique | Desarrollador Web',
  },
  en: {
    'nav.about': 'About me',
    'nav.projects': 'Projects',
    'nav.playground': 'Playground',
    'nav.contact': 'Contact',
    'hero.greeting': "Hi, I'm",
    'hero.subtitle': 'Full Stack Developer · Freelance',
    'hero.description': 'I build custom web solutions for clients and personal projects. Leading development teams for businesses.',
    'hero.cta.projects': 'View projects',
    'hero.cta.cv': 'Download CV',
    'hero.cta.contact': 'Get in touch',
    'about.tag': 'About me',
    'about.p1': "I'm 23 years old and hold a <strong>Bachelor's in Applied Cybersecurity</strong> and a <strong>Systems Analyst</strong> degree from <strong>UTN Facultad Regional La Plata</strong>.",
    'about.p2': 'I work as a <strong>freelance developer</strong> building custom web solutions for clients. I also <strong>coordinate development teams</strong> on business projects.',
    'about.stat1': 'In production',
    'about.stat2': 'Technologies',
    'about.stat3': 'Clients',
    'about.diploma.title': 'B.S. Applied Cybersecurity',
    'about.diploma.inst': 'UTN Facultad Regional La Plata',
    'playground.tag': 'Playground',
    'playground.title': 'Experiment',
    'playground.desc': 'Pick an effect and play with interactive animations.',
    'playground.hint': 'Move your mouse over the canvas',
    'playground.btn.particles': 'Particles',
    'playground.btn.waves': 'Waves',
    'playground.btn.gravity': 'Gravity',
    'playground.btn.matrix': 'Matrix',
    'playground.btn.starfield': 'Starfield',
    'projects.tag': 'Projects',
    'projects.title': 'Featured work',
    'projects.badge.live': 'Live',
    'projects.badge.soon': 'Coming soon',
    'projects.other': 'Other projects',
    'project.planestudio.role': 'Personal project',
    'project.planestudio.desc': 'Web platform for university students. Interactive curriculum map, statistics and multi-degree support. Used by UNLP students.',
    'project.roxana.role': 'Personal project',
    'project.roxana.desc': 'Complete e-commerce with catalog, cart, WhatsApp checkout, admin panel, notifications and dark mode.',
    'project.estudiojob.role': 'Freelance client',
    'project.estudiojob.desc': 'Institutional website for architecture studio. Project showcase, admin panel and responsive design with Framer Motion.',
    'project.peirano.role': 'Team lead',
    'project.peirano.desc': 'Real estate platform with property catalog, advanced filters and admin panel. In development, leading the team.',
    'project.maps.desc.short': 'Insurance e-commerce with MercadoPago/Stripe payments and chatbot.',
    'project.paicat.desc.short': 'UTN FRLP enrollment management system. Attendance, grades and reports.',
    'project.tasktracker.desc.short': 'Task management with kanban view, dark mode and REST API.',
    'project.torneo.desc.short': 'Pool and foosball tournaments with brackets and physics mini-games.',
    'contact.tag': 'Contact',
    'contact.title': "Let's work together",
    'contact.available': 'Available for work',
    'contact.text': "Have a project in mind? I'd love to help you make it a reality.",
    'contact.whatsapp': 'Message me directly',
    'footer.text': 'Agustín Manrique &mdash; 2026',
    'meta.title': 'Agustín Manrique | Web Developer',
  },
};

/* ═══════════════════════════════
   PROJECT MODAL DATA
   ═══════════════════════════════ */
const projectDataI18n = {
  es: {
    planestudio: {
      role: 'Proyecto propio', title: 'Mi Plan de Estudio',
      desc: 'Plataforma web para que estudiantes universitarios visualicen su avance académico. Malla curricular interactiva con correlativas, doble promedio, filtros por estado, estadísticas y soporte multi-carrera.',
      tags: ['React', 'Vite', 'Supabase', 'Vercel', 'PostgreSQL'],
      links: [{ label: 'Web en vivo', url: 'https://miplandeestudio.com' }, { label: 'Código', url: 'https://github.com/AgustinManrique/plan-estudios' }],
      gradient: 'linear-gradient(135deg, #34d399, #059669, #10b981)',
      slides: [
        { title: 'Landing Page', desc: 'Página de inicio con presentación del producto y preview del dashboard.', image: 'images/projects/planestudio-screen1.png' },
        { title: 'Dashboard', desc: 'Panel principal con estadísticas de aprobadas, promedio y avance.', image: 'images/projects/planestudio-screen2.png' },
        { title: 'Materias por Año', desc: 'Vista de materias con badges de estado, filtros y buscador.', image: 'images/projects/planestudio-screen3.png' },
        { title: 'Malla Curricular', desc: 'Visualización de la carrera por columnas. Hover resalta correlativas.', image: 'images/projects/planestudio-screen4.png' },
        { title: 'Estadísticas', desc: 'Promedios, notas, histograma y avance por año.', image: 'images/projects/planestudio-screen5.png' },
      ],
    },
    roxana: {
      role: 'Proyecto propio', title: 'Roxana Aromaterapia',
      desc: 'E-commerce completo para regalería en La Plata. Catálogo, carrito, checkout WhatsApp, panel admin, notificaciones y modo oscuro.',
      tags: ['React', 'TypeScript', 'Supabase', 'Tailwind', 'WhatsApp API', 'Railway'],
      links: [{ label: 'Web en vivo', url: 'https://www.roxanaaromaterapia.com' }, { label: 'Código', url: 'https://github.com/AgustinManrique/roxana-aromaterapia' }],
      gradient: 'linear-gradient(135deg, #818cf8, #c084fc, #f472b6)',
      slides: [
        { title: 'Catálogo', desc: 'Grid adaptativo, filtros por categoría, búsqueda en tiempo real y modo oscuro.', icon: 'grid' },
        { title: 'Carrito', desc: 'Drawer lateral con productos, control de cantidades y cálculo de total.', icon: 'cart' },
        { title: 'Checkout WhatsApp', desc: 'Tipo de entrega, notas del pedido y envío por WhatsApp.', icon: 'cart' },
        { title: 'Gestión de Productos', desc: 'CRUD completo con subida de imágenes a Supabase Storage.', icon: 'settings' },
        { title: 'Estadísticas', desc: 'Dashboard con ingresos, pedidos, productos más vendidos y mejores clientes.', icon: 'bar-chart' },
      ],
    },
    estudiojob: {
      role: 'Cliente freelance', title: 'Estudio Juárez Ocampo Barletta',
      desc: 'Sitio institucional para estudio de arquitectura. Showcase de proyectos con galería, panel admin con autenticación y animaciones Framer Motion.',
      tags: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Prisma', 'Supabase'],
      links: [{ label: 'Web en vivo', url: 'https://estudiojob.com' }],
      gradient: 'linear-gradient(135deg, #0ea5e9, #2563eb, #1d4ed8)',
      slides: [
        { title: 'Página Principal', desc: 'Landing institucional con proyectos destacados.', icon: 'layout' },
        { title: 'Galería', desc: 'Showcase visual con filtros por categoría.', icon: 'grid' },
        { title: 'Panel Admin', desc: 'Dashboard protegido para gestionar contenido.', icon: 'settings' },
      ],
    },
    peirano: {
      role: 'Coordinación de equipo', title: 'Peirano Propiedades',
      desc: 'Plataforma inmobiliaria con catálogo de propiedades, filtros avanzados, panel administrativo y diseño premium. Coordinando equipo de desarrollo.',
      tags: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Supabase', 'Framer Motion'],
      links: [],
      gradient: 'linear-gradient(135deg, #a78bfa, #7c3aed, #6d28d9)',
      slides: [
        { title: 'Catálogo', desc: 'Propiedades con filtros avanzados por tipo, ubicación y precio.', icon: 'grid' },
        { title: 'Detalle', desc: 'Vista con galería, mapa, características y formulario de consulta.', icon: 'file-text' },
        { title: 'Panel Admin', desc: 'Gestión de propiedades, imágenes y consultas.', icon: 'settings' },
      ],
    },
    maps: {
      role: 'Proyecto académico', title: 'Maps Asesores',
      desc: 'E-commerce para aseguradora con catálogo de seguros, pagos vía MercadoPago/Stripe, chatbot integrado, panel admin y dashboard de métricas.',
      tags: ['React', 'Node.js', 'Prisma', 'Docker', 'MercadoPago', 'Stripe'],
      links: [], gradient: 'linear-gradient(135deg, #f97316, #ef4444)',
      slides: [
        { title: 'Catálogo', desc: 'Seguros organizados por categoría con comparador.', icon: 'grid' },
        { title: 'Pagos', desc: 'Checkout con MercadoPago y Stripe integrados.', icon: 'credit-card' },
        { title: 'Chatbot', desc: 'Asistente virtual para consultas y cotizaciones.', icon: 'bot' },
      ],
    },
    paicat: {
      role: 'Proyecto académico', title: 'PAICAT',
      desc: 'Sistema de gestión del ingreso para UTN FRLP. Control de asistencia, notas, reportes y administración de cursadas.',
      tags: ['Laravel', 'MariaDB', 'Tailwind', 'Alpine.js'],
      links: [], gradient: 'linear-gradient(135deg, #22d3ee, #818cf8)',
      slides: [
        { title: 'Asistencia', desc: 'Control de asistencia por comisión con vista diaria y semanal.', icon: 'clipboard-list' },
        { title: 'Notas', desc: 'Carga y gestión de notas con cálculo de promedios.', icon: 'edit-3' },
        { title: 'Reportes', desc: 'Estadísticas por comisión, materia y período.', icon: 'bar-chart' },
      ],
    },
    tasktracker: {
      role: 'Proyecto personal', title: 'TaskTracker',
      desc: 'Aplicación de gestión de tareas con vista kanban, drag & drop, modo oscuro, filtros y API REST.',
      tags: ['Django', 'DRF', 'Tailwind', 'SQLite'],
      links: [], gradient: 'linear-gradient(135deg, #34d399, #22d3ee)',
      slides: [
        { title: 'Kanban', desc: 'Vista de tareas en columnas con drag & drop.', icon: 'columns' },
        { title: 'API REST', desc: 'Endpoints documentados con Django REST Framework.', icon: 'api' },
        { title: 'Dark Mode', desc: 'Tema oscuro con toggle y persistencia.', icon: 'moon' },
      ],
    },
    torneo: {
      role: 'Proyecto personal', title: 'Torneo de Bar',
      desc: 'Plataforma para torneos de pool y fútbol con sistema de brackets, tabla de posiciones y mini-juegos con motor de físicas.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Canvas'],
      links: [], gradient: 'linear-gradient(135deg, #eab308, #f97316)',
      slides: [
        { title: 'Brackets', desc: 'Sistema de eliminación directa con actualización en tiempo real.', icon: 'trophy' },
        { title: 'Tabla', desc: 'Rankings con puntos, partidos jugados y diferencia de goles.', icon: 'table' },
        { title: 'Mini-juegos', desc: 'Juegos con motor de físicas integrado en Canvas.', icon: 'zap' },
      ],
    },
  },
  en: {
    planestudio: {
      role: 'Personal project', title: 'Mi Plan de Estudio',
      desc: 'Web platform for university students to track academic progress. Interactive curriculum map with prerequisites, dual GPA, filters, statistics, and multi-degree support.',
      tags: ['React', 'Vite', 'Supabase', 'Vercel', 'PostgreSQL'],
      links: [{ label: 'Live site', url: 'https://miplandeestudio.com' }, { label: 'Code', url: 'https://github.com/AgustinManrique/plan-estudios' }],
      gradient: 'linear-gradient(135deg, #34d399, #059669, #10b981)',
      slides: [
        { title: 'Landing Page', desc: 'Home page with product presentation and dashboard preview.', image: 'images/projects/planestudio-screen1.png' },
        { title: 'Dashboard', desc: 'Main panel with approved subjects, GPA and progress.', image: 'images/projects/planestudio-screen2.png' },
        { title: 'Subjects by Year', desc: 'Subjects with status badges, filters and search.', image: 'images/projects/planestudio-screen3.png' },
        { title: 'Curriculum Map', desc: 'Full degree visualization. Hover highlights prerequisites.', image: 'images/projects/planestudio-screen4.png' },
        { title: 'Statistics', desc: 'GPA, grades, histogram and progress by year.', image: 'images/projects/planestudio-screen5.png' },
      ],
    },
    roxana: {
      role: 'Personal project', title: 'Roxana Aromaterapia',
      desc: 'Complete e-commerce for a gift shop. Product catalog, cart, WhatsApp checkout, admin panel, email notifications and dark mode.',
      tags: ['React', 'TypeScript', 'Supabase', 'Tailwind', 'WhatsApp API', 'Railway'],
      links: [{ label: 'Live site', url: 'https://www.roxanaaromaterapia.com' }, { label: 'Code', url: 'https://github.com/AgustinManrique/roxana-aromaterapia' }],
      gradient: 'linear-gradient(135deg, #818cf8, #c084fc, #f472b6)',
      slides: [
        { title: 'Catalog', desc: 'Adaptive grid, category filters, real-time search and dark mode.', icon: 'grid' },
        { title: 'Cart', desc: 'Side drawer with quantity controls and total calculation.', icon: 'cart' },
        { title: 'WhatsApp Checkout', desc: 'Delivery type, order notes and WhatsApp summary.', icon: 'cart' },
        { title: 'Product Management', desc: 'Full CRUD with image upload to Supabase Storage.', icon: 'settings' },
        { title: 'Statistics', desc: 'Revenue, orders, best sellers and top customers dashboard.', icon: 'bar-chart' },
      ],
    },
    estudiojob: {
      role: 'Freelance client', title: 'Estudio Juárez Ocampo Barletta',
      desc: 'Institutional website for architecture studio. Project showcase with gallery, admin panel with authentication, and Framer Motion animations.',
      tags: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Prisma', 'Supabase'],
      links: [{ label: 'Live site', url: 'https://estudiojob.com' }],
      gradient: 'linear-gradient(135deg, #0ea5e9, #2563eb, #1d4ed8)',
      slides: [
        { title: 'Home Page', desc: 'Institutional landing with featured projects.', icon: 'layout' },
        { title: 'Gallery', desc: 'Visual showcase with category filters.', icon: 'grid' },
        { title: 'Admin Panel', desc: 'Protected dashboard to manage content.', icon: 'settings' },
      ],
    },
    peirano: {
      role: 'Team lead', title: 'Peirano Propiedades',
      desc: 'Real estate platform with property catalog, advanced filters, admin panel and premium design. Leading the development team.',
      tags: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Supabase', 'Framer Motion'],
      links: [], gradient: 'linear-gradient(135deg, #a78bfa, #7c3aed, #6d28d9)',
      slides: [
        { title: 'Catalog', desc: 'Properties with advanced filters by type, location and price.', icon: 'grid' },
        { title: 'Detail', desc: 'Gallery, map, features and inquiry form.', icon: 'file-text' },
        { title: 'Admin Panel', desc: 'Manage properties, images and inquiries.', icon: 'settings' },
      ],
    },
    maps: {
      role: 'Academic project', title: 'Maps Asesores',
      desc: 'Insurance e-commerce with product catalog, MercadoPago/Stripe payments, integrated chatbot, admin panel and metrics dashboard.',
      tags: ['React', 'Node.js', 'Prisma', 'Docker', 'MercadoPago', 'Stripe'],
      links: [], gradient: 'linear-gradient(135deg, #f97316, #ef4444)',
      slides: [
        { title: 'Catalog', desc: 'Insurance products by category with comparator.', icon: 'grid' },
        { title: 'Payments', desc: 'Checkout with MercadoPago and Stripe.', icon: 'credit-card' },
        { title: 'Chatbot', desc: 'Virtual assistant for quotes and inquiries.', icon: 'bot' },
      ],
    },
    paicat: {
      role: 'Academic project', title: 'PAICAT',
      desc: 'Enrollment management system for UTN FRLP. Attendance tracking, grades, reports and course administration.',
      tags: ['Laravel', 'MariaDB', 'Tailwind', 'Alpine.js'],
      links: [], gradient: 'linear-gradient(135deg, #22d3ee, #818cf8)',
      slides: [
        { title: 'Attendance', desc: 'Daily and weekly attendance tracking by section.', icon: 'clipboard-list' },
        { title: 'Grades', desc: 'Grade management with average calculation.', icon: 'edit-3' },
        { title: 'Reports', desc: 'Statistics by section, subject and period.', icon: 'bar-chart' },
      ],
    },
    tasktracker: {
      role: 'Personal project', title: 'TaskTracker',
      desc: 'Task management app with kanban view, drag & drop, dark mode, filters and REST API.',
      tags: ['Django', 'DRF', 'Tailwind', 'SQLite'],
      links: [], gradient: 'linear-gradient(135deg, #34d399, #22d3ee)',
      slides: [
        { title: 'Kanban', desc: 'Task board with drag & drop columns.', icon: 'columns' },
        { title: 'REST API', desc: 'Documented endpoints with Django REST Framework.', icon: 'api' },
        { title: 'Dark Mode', desc: 'Dark theme with toggle and localStorage persistence.', icon: 'moon' },
      ],
    },
    torneo: {
      role: 'Personal project', title: 'Torneo de Bar',
      desc: 'Platform for pool and foosball tournaments with bracket system, standings and mini-games with physics engine.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Canvas'],
      links: [], gradient: 'linear-gradient(135deg, #eab308, #f97316)',
      slides: [
        { title: 'Brackets', desc: 'Single elimination system with real-time updates.', icon: 'trophy' },
        { title: 'Standings', desc: 'Rankings with points, matches and goal difference.', icon: 'table' },
        { title: 'Mini-games', desc: 'Games with integrated Canvas physics engine.', icon: 'zap' },
      ],
    },
  },
};

let projectData = projectDataI18n[currentLang];

/* Slider labels i18n */
const sliderLabels = {
  es: { count: 'Cantidad', connectDist: 'Conexión', speed: 'Velocidad', waveCount: 'Ondas', gravity: 'Gravedad', bounce: 'Rebote', density: 'Densidad', starCount: 'Estrellas' },
  en: { count: 'Count', connectDist: 'Connection', speed: 'Speed', waveCount: 'Waves', gravity: 'Gravity', bounce: 'Bounce', density: 'Density', starCount: 'Stars' },
};

/* ═══════════════════════════════
   i18n FUNCTIONS
   ═══════════════════════════════ */
function applyTranslations(lang) {
  document.documentElement.lang = lang;
  document.title = translations[lang]['meta.title'];

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (translations[lang][key]) el.innerHTML = translations[lang][key];
  });

  projectData = projectDataI18n[lang];

  const expandLabel = lang === 'es' ? 'Ver detalles' : 'View details';
  document.querySelectorAll('.project-expand').forEach((btn) => {
    btn.setAttribute('aria-label', expandLabel);
  });

  const waCard = document.querySelector('.whatsapp-card');
  if (waCard) {
    const msg = lang === 'es'
      ? 'Hola%20Agust%C3%ADn%2C%20vi%20tu%20portfolio%20y%20me%20gustar%C3%ADa%20contactarte'
      : 'Hi%20Agust%C3%ADn%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20like%20to%20get%20in%20touch';
    waCard.href = `https://wa.me/542213045065?text=${msg}`;
  }

  document.querySelectorAll('.lang-toggle').forEach((toggle) => {
    toggle.querySelectorAll('.lang-option').forEach((opt) => {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });
  });

  /* Re-render sandbox sliders with correct language */
  if (window.__renderSandboxSliders) window.__renderSandboxSliders();

  const modal = document.getElementById('projectModal');
  if (modal && modal.classList.contains('active') && window.__currentProjectId) {
    window.__openModal(window.__currentProjectId);
  }
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('portfolio-lang', lang);
  applyTranslations(lang);
}

function initLangToggle() {
  applyTranslations(currentLang);
  document.querySelectorAll('.lang-toggle').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      setLanguage(currentLang === 'es' ? 'en' : 'es');
    });
  });
}

/* ═══════════════════════════════
   BOOT
   ═══════════════════════════════ */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
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
  initLangToggle();
  initTextScramble();
  initHeroAnimations();
  initScrollReveal();
  initProjectTilt();
  initSandbox();
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
   TEXT SCRAMBLE EFFECT
   ═══════════════════════════════ */
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}=+*^?#_アウエオカキクケコ';
    this.frameReq = null;
    this.frame = 0;
    this.queue = [];
    this.resolve = null;
  }

  setText(newText) {
    const length = newText.length;
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const to = newText[i];
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ to, start, end, char: null });
    }

    cancelAnimationFrame(this.frameReq);
    this.frame = 0;
    this._update();
    return promise;
  }

  _update() {
    let output = '';
    let complete = 0;

    for (let i = 0; i < this.queue.length; i++) {
      const { to, start, end } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += `<span class="char revealed">${to === ' ' ? '&nbsp;' : to}</span>`;
      } else if (this.frame >= start) {
        if (!this.queue[i].char || Math.random() < 0.28) {
          this.queue[i].char = this.chars[Math.floor(Math.random() * this.chars.length)];
        }
        output += `<span class="char scrambling">${this.queue[i].char}</span>`;
      } else {
        output += `<span class="char">&nbsp;</span>`;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameReq = requestAnimationFrame(() => this._update());
      this.frame++;
    }
  }
}

function initTextScramble() {
  const nameEl = document.querySelector('.hero-name');
  if (!nameEl) return;
  const originalText = nameEl.textContent.trim();
  nameEl.textContent = '';
  window.__heroScramble = { el: nameEl, text: originalText };
}

/* ═══════════════════════════════
   HERO ANIMATIONS
   ═══════════════════════════════ */
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('.hero-greeting', { opacity: 1, y: 0, duration: 0.5, delay: 0.3 });

  /* Start scramble after greeting */
  tl.call(() => {
    if (window.__heroScramble) {
      const scramble = new TextScramble(window.__heroScramble.el);
      scramble.setText(window.__heroScramble.text);
    }
  }, null, '+=0.1');

  tl.to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.6 }, '+=0.6');
  tl.to('.hero-description', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
  tl.to('.hero-cta', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');

  /* Subtle parallax fade on scroll */
  gsap.to('.hero-content', {
    y: -60,
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: '30% top', end: 'bottom top', scrub: true },
  });
}

/* ═══════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════ */
function initScrollReveal() {
  document.querySelectorAll('.reveal').forEach((el) => {
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

  document.querySelectorAll('.bento-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 30, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.7, delay: i * 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none' },
      }
    );
  });

  document.querySelectorAll('.other-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none' },
      }
    );
  });
}

/* ═══════════════════════════════
   PROJECT CARD TILT
   ═══════════════════════════════ */
function initProjectTilt() {
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      gsap.to(card, {
        rotateX: (y - 0.5) * -4,
        rotateY: (x - 0.5) * 4,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power2.out' });
    });
  });
}

/* ═══════════════════════════════
   SANDBOX EFFECTS
   ═══════════════════════════════ */

class ParticlesEffect {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.particles = [];
    this.mouse = { x: -999, y: -999 };
    this.params = { count: 80, connectDist: 120 };
  }
  init() {
    this.particles = [];
    for (let i = 0; i < this.params.count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1,
      });
    }
  }
  update() {
    const { width, height } = this.canvas;
    const { connectDist } = this.params;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, width, height);
    for (const p of this.particles) {
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) { p.vx += dx * 0.0003; p.vy += dy * 0.0003; }
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      p.vx *= 0.999; p.vy *= 0.999;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(129, 140, 248, 0.8)';
      ctx.fill();
    }
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i], b = this.particles[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < connectDist) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(129, 140, 248, ${(1 - d / connectDist) * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }
  setMouse(x, y) { this.mouse = { x, y }; }
  getSliders() {
    return [
      { name: 'count', min: 20, max: 200, value: this.params.count, step: 1 },
      { name: 'connectDist', min: 50, max: 250, value: this.params.connectDist, step: 1 },
    ];
  }
  setParam(n, v) { this.params[n] = v; if (n === 'count') this.init(); }
  needsClear() { return false; }
}

class WavesEffect {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.time = 0;
    this.mouse = { x: 0.5, y: 0.5 };
    this.params = { speed: 3, waveCount: 4 };
  }
  init() { this.time = 0; }
  update() {
    const { width, height } = this.canvas;
    const ctx = this.ctx;
    const { speed, waveCount } = this.params;
    ctx.clearRect(0, 0, width, height);
    this.time += speed * 0.005;
    const colors = [
      'rgba(129, 140, 248, 0.3)', 'rgba(192, 132, 252, 0.25)',
      'rgba(34, 211, 238, 0.2)', 'rgba(52, 211, 153, 0.2)',
      'rgba(249, 115, 22, 0.15)', 'rgba(244, 114, 182, 0.2)',
      'rgba(129, 140, 248, 0.15)', 'rgba(192, 132, 252, 0.1)',
    ];
    for (let w = 0; w < waveCount; w++) {
      ctx.beginPath();
      const amp = (this.mouse.y * 80 + 20) * (1 - w * 0.1);
      const freq = (this.mouse.x * 3 + 1) * (1 + w * 0.3);
      const yOff = height * 0.3 + w * (height * 0.12);
      for (let x = 0; x <= width; x += 2) {
        const y = yOff + Math.sin((x / width) * freq * Math.PI * 2 + this.time + w * 0.8) * amp;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = colors[w % colors.length];
      ctx.fill();
    }
  }
  setMouse(x, y) { this.mouse = { x: x / this.canvas.width, y: y / this.canvas.height }; }
  getSliders() {
    return [
      { name: 'speed', min: 1, max: 10, value: this.params.speed, step: 1 },
      { name: 'waveCount', min: 2, max: 8, value: this.params.waveCount, step: 1 },
    ];
  }
  setParam(n, v) { this.params[n] = v; }
  needsClear() { return false; }
}

class GravityEffect {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.balls = [];
    this.mouse = { x: -999, y: -999 };
    this.params = { gravity: 0.3, bounce: 0.7 };
    this.spawnTimer = 0;
  }
  init() {
    this.balls = [];
    for (let i = 0; i < 15; i++) this._spawn();
  }
  _spawn(x, y) {
    const colors = ['#818cf8', '#c084fc', '#22d3ee', '#34d399', '#f97316', '#f472b6'];
    this.balls.push({
      x: x ?? Math.random() * this.canvas.width,
      y: y ?? Math.random() * this.canvas.height * 0.3,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 2,
      r: Math.random() * 15 + 8,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
    if (this.balls.length > 50) this.balls.shift();
  }
  update() {
    const { width, height } = this.canvas;
    const ctx = this.ctx;
    const { gravity, bounce } = this.params;
    ctx.clearRect(0, 0, width, height);
    this.spawnTimer++;
    if (this.spawnTimer > 60) { this._spawn(); this.spawnTimer = 0; }
    for (const b of this.balls) {
      const dx = b.x - this.mouse.x, dy = b.y - this.mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 100 && dist > 0) { b.vx += (dx / dist) * 2; b.vy += (dy / dist) * 2; }
      b.vy += gravity; b.x += b.vx; b.y += b.vy;
      if (b.x - b.r < 0) { b.x = b.r; b.vx *= -bounce; }
      if (b.x + b.r > width) { b.x = width - b.r; b.vx *= -bounce; }
      if (b.y + b.r > height) { b.y = height - b.r; b.vy *= -bounce; }
      if (b.y - b.r < 0) { b.y = b.r; b.vy *= -bounce; }
      b.vx *= 0.999;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = b.color + '40';
      ctx.fill();
      ctx.strokeStyle = b.color;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
  setMouse(x, y) { this.mouse = { x, y }; }
  onClick(x, y) { for (let i = 0; i < 3; i++) this._spawn(x + (Math.random() - 0.5) * 20, y); }
  getSliders() {
    return [
      { name: 'gravity', min: 0.05, max: 1, value: this.params.gravity, step: 0.05 },
      { name: 'bounce', min: 0.1, max: 1, value: this.params.bounce, step: 0.05 },
    ];
  }
  setParam(n, v) { this.params[n] = v; }
  needsClear() { return false; }
}

class MatrixEffect {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.columns = [];
    this.mouse = { x: -999, y: -999 };
    this.params = { speed: 3, density: 20 };
  }
  init() {
    const numCols = Math.ceil(this.canvas.width / this.params.density);
    this.columns = Array.from({ length: numCols }, () => ({
      y: Math.random() * this.canvas.height,
      speed: Math.random() * 2 + 1,
    }));
  }
  update() {
    const { width, height } = this.canvas;
    const ctx = this.ctx;
    const { speed, density } = this.params;
    const fontSize = Math.max(12, density * 0.7);
    ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
    const chars = 'アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF';
    for (let i = 0; i < this.columns.length; i++) {
      const col = this.columns[i];
      const x = i * density;
      const char = chars[Math.floor(Math.random() * chars.length)];
      const dist = Math.hypot(x - this.mouse.x, col.y - this.mouse.y);
      ctx.fillStyle = `rgba(52, 211, 153, ${dist < 100 ? 1 : 0.6})`;
      ctx.fillText(char, x, col.y);
      col.y += col.speed * speed;
      if (col.y > height) { col.y = 0; col.speed = Math.random() * 2 + 1; }
    }
  }
  setMouse(x, y) { this.mouse = { x, y }; }
  getSliders() {
    return [
      { name: 'speed', min: 1, max: 8, value: this.params.speed, step: 1 },
      { name: 'density', min: 10, max: 30, value: this.params.density, step: 1 },
    ];
  }
  setParam(n, v) { this.params[n] = v; if (n === 'density') this.init(); }
  needsClear() { return true; }
}

class StarfieldEffect {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.stars = [];
    this.mouse = { x: 0.5, y: 0.5 };
    this.params = { speed: 3, starCount: 300 };
  }
  init() {
    this.stars = Array.from({ length: this.params.starCount }, () => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random(),
    }));
  }
  update() {
    const { width, height } = this.canvas;
    const ctx = this.ctx;
    const { speed } = this.params;
    const cx = width * this.mouse.x;
    const cy = height * this.mouse.y;
    ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
    ctx.fillRect(0, 0, width, height);
    for (const s of this.stars) {
      s.z -= speed * 0.003;
      if (s.z <= 0) { s.x = Math.random() * 2 - 1; s.y = Math.random() * 2 - 1; s.z = 1; }
      const sx = cx + (s.x / s.z) * (width * 0.5);
      const sy = cy + (s.y / s.z) * (height * 0.5);
      const r = (1 - s.z) * 3;
      if (sx < 0 || sx > width || sy < 0 || sy > height) continue;
      ctx.beginPath();
      ctx.arc(sx, sy, Math.max(0.5, r), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${1 - s.z})`;
      ctx.fill();
    }
  }
  setMouse(x, y) { this.mouse = { x: x / this.canvas.width, y: y / this.canvas.height }; }
  getSliders() {
    return [
      { name: 'speed', min: 1, max: 10, value: this.params.speed, step: 1 },
      { name: 'starCount', min: 100, max: 600, value: this.params.starCount, step: 10 },
    ];
  }
  setParam(n, v) { this.params[n] = v; if (n === 'starCount') this.init(); }
  needsClear() { return true; }
}

/* ═══════════════════════════════
   SANDBOX CONTROLLER
   ═══════════════════════════════ */
function initSandbox() {
  const canvas = document.getElementById('sandboxCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const viewport = canvas.closest('.sandbox-viewport');
  const slidersEl = document.getElementById('sandboxSliders');

  function resize() {
    canvas.width = viewport.clientWidth;
    canvas.height = viewport.clientHeight;
  }
  resize();

  const effects = {
    particles: new ParticlesEffect(canvas, ctx),
    waves: new WavesEffect(canvas, ctx),
    gravity: new GravityEffect(canvas, ctx),
    matrix: new MatrixEffect(canvas, ctx),
    starfield: new StarfieldEffect(canvas, ctx),
  };

  let current = effects.particles;
  let currentName = 'particles';
  current.init();

  function renderSliders() {
    const sliders = current.getSliders();
    const labels = sliderLabels[currentLang] || sliderLabels.es;
    slidersEl.innerHTML = sliders.map((s) => `
      <div class="sandbox-slider-group">
        <div class="sandbox-slider-header">
          <span class="sandbox-slider-label">${labels[s.name] || s.name}</span>
          <span class="sandbox-slider-value" data-slider="${s.name}">${s.value}</span>
        </div>
        <input type="range" class="sandbox-slider" data-param="${s.name}"
          min="${s.min}" max="${s.max}" value="${s.value}" step="${s.step || 1}">
      </div>
    `).join('');

    slidersEl.querySelectorAll('.sandbox-slider').forEach((slider) => {
      slider.addEventListener('input', () => {
        const val = parseFloat(slider.value);
        current.setParam(slider.dataset.param, val);
        const ve = slidersEl.querySelector(`[data-slider="${slider.dataset.param}"]`);
        if (ve) ve.textContent = val;
      });
    });
  }
  renderSliders();
  window.__renderSandboxSliders = renderSliders;

  /* Mouse tracking */
  viewport.addEventListener('mousemove', (e) => {
    const rect = viewport.getBoundingClientRect();
    current.setMouse(e.clientX - rect.left, e.clientY - rect.top);
  });

  viewport.addEventListener('click', (e) => {
    const rect = viewport.getBoundingClientRect();
    if (current.onClick) current.onClick(e.clientX - rect.left, e.clientY - rect.top);
  });

  viewport.addEventListener('touchmove', (e) => {
    const rect = viewport.getBoundingClientRect();
    const t = e.touches[0];
    current.setMouse(t.clientX - rect.left, t.clientY - rect.top);
  }, { passive: true });

  viewport.addEventListener('touchstart', (e) => {
    const rect = viewport.getBoundingClientRect();
    const t = e.touches[0];
    if (current.onClick) current.onClick(t.clientX - rect.left, t.clientY - rect.top);
  }, { passive: true });

  /* Effect switching */
  document.querySelectorAll('.sandbox-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sandbox-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentName = btn.dataset.effect;
      current = effects[currentName];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      current.init();
      renderSliders();
    });
  });

  /* Resize handler */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      current.init();
    }, 150);
  });

  /* Animation loop with IntersectionObserver for perf */
  let animId = null;
  let isVisible = false;

  function animate() {
    current.update();
    if (isVisible) animId = requestAnimationFrame(animate);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible && !animId) {
        animId = requestAnimationFrame(animate);
      } else if (!isVisible && animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    },
    { threshold: 0.05 }
  );
  observer.observe(viewport);
}

/* ═══════════════════════════════
   PROJECT MODAL
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
  window.__currentProjectId = null;

  const icons = {
    grid: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    cart: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>',
    'credit-card': '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="22" height="16" x="1" y="4" rx="2"/><path d="M1 10h22"/></svg>',
    settings: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/></svg>',
    moon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></svg>',
    bot: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>',
    layout: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
    'clipboard-list': '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>',
    'bar-chart': '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>',
    'file-text': '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>',
    'edit-3': '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
    columns: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>',
    api: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>',
    trophy: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
    table: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/></svg>',
    zap: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>',
  };

  /* Inject expand buttons */
  document.querySelectorAll('.project-card[data-project]').forEach((card) => {
    const btn = document.createElement('button');
    btn.className = 'project-expand';
    btn.setAttribute('aria-label', 'Ver detalles');
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>';
    card.querySelector('.project-body').appendChild(btn);
  });

  function openModal(projectId) {
    currentProject = projectData[projectId];
    if (!currentProject) return;
    window.__currentProjectId = projectId;
    currentSlide = 0;

    document.getElementById('modalRole').textContent = currentProject.role;
    document.getElementById('modalTitle').textContent = currentProject.title;
    document.getElementById('modalDesc').textContent = currentProject.desc;

    document.getElementById('modalTags').innerHTML = currentProject.tags.map((t) => `<span>${t}</span>`).join('');

    const linksEl = document.getElementById('modalLinks');
    if (currentProject.links.length > 0) {
      linksEl.innerHTML = currentProject.links.map((l) => `<a href="${l.url}" target="_blank" rel="noopener">${l.label} &#8599;</a>`).join('');
      linksEl.style.display = 'flex';
    } else {
      linksEl.style.display = 'none';
    }

    track.innerHTML = currentProject.slides
      .map((slide) => slide.image
        ? `<div class="gallery-slide"><img class="gallery-slide-img" src="${slide.image}" alt="${slide.title}" loading="lazy"/></div>`
        : `<div class="gallery-slide"><div class="gallery-slide-bg" style="background:${currentProject.gradient}"></div><div class="gallery-slide-icon">${icons[slide.icon] || ''}</div><span class="gallery-slide-label">${slide.title}</span></div>`
      ).join('');

    dotsEl.innerHTML = currentProject.slides.map((_, i) => `<button class="gallery-dot${i === 0 ? ' active' : ''}" data-index="${i}"></button>`).join('');

    goToSlide(0);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.__lenis) window.__lenis.stop();
  }

  window.__openModal = openModal;

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    window.__currentProjectId = null;
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

  /* Card + other-card clicks */
  document.querySelectorAll('.project-card[data-project]').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      openModal(card.dataset.project);
    });
  });

  document.querySelectorAll('.other-card[data-project]').forEach((card) => {
    card.addEventListener('click', () => openModal(card.dataset.project));
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  dotsEl.addEventListener('click', (e) => {
    const dot = e.target.closest('.gallery-dot');
    if (dot) goToSlide(parseInt(dot.dataset.index));
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
    if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
  });

  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? goToSlide(currentSlide + 1) : goToSlide(currentSlide - 1);
  }, { passive: true });
}

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', boot);

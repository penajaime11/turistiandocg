

// Multi-image swap cycling on hover
function initMultiSwap() {
  document.querySelectorAll('.mi-swap').forEach(function(el) {
    const imgs = Array.from(el.querySelectorAll('img'));
    const dots = Array.from(el.querySelectorAll('.swap-dot'));
    if (imgs.length < 2) return;
    let cur = 0, timer = null;

    function show(idx) {
      imgs[cur].classList.remove('visible');
      if(dots[cur]) dots[cur].classList.remove('active');
      cur = (idx + imgs.length) % imgs.length;
      imgs[cur].classList.add('visible');
      if(dots[cur]) dots[cur].classList.add('active');
    }

    el.addEventListener('mouseenter', function() {
      timer = setInterval(function() { show(cur + 1); }, 1000);
    });
    el.addEventListener('mouseleave', function() {
      clearInterval(timer);
      show(0);
    });
  });
}
document.addEventListener('DOMContentLoaded', initMultiSwap);


// Floating particles in hero
function initParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'hero-particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    const size = Math.random() * 3 + 1;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.animationDuration = (Math.random() * 12 + 8) + 's';
    p.style.animationDelay = (Math.random() * 8) + 's';
    p.style.opacity = Math.random() * 0.5;
    container.appendChild(p);
  }
}
document.addEventListener('DOMContentLoaded', initParticles);

let curZone = null;

function goHome() {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('p-home').classList.add('active');
  document.getElementById('nav-back').style.display = 'none';
  document.getElementById('nav-links').style.display = 'flex';
  document.getElementById('nav').classList.remove('solid');
  curZone = null;
  window.scrollTo({top:0, behavior:'smooth'});
}

function openZone(z) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('p-' + z).classList.add('active');
  document.getElementById('nav-back').style.display = 'flex';
  document.getElementById('nav-links').style.display = 'none';
  document.getElementById('nav').classList.add('solid');
  curZone = z;
  window.scrollTo({top:0, behavior:'instant'});
  const page = document.getElementById('p-' + z);
  const btns = page.querySelectorAll('.tab-btn');
  const panels = page.querySelectorAll('.tab-panel');
  btns.forEach((b,i) => b.classList.toggle('active', i===0));
  panels.forEach((p,i) => { p.style.display = i===0?'block':'none'; p.classList.toggle('active',i===0); });
  setTimeout(initMultiSwap, 80);
}

function switchTab(z, tid, btn) {
  const page = document.getElementById('p-' + z);
  page.querySelectorAll('.tab-panel').forEach(p => { p.style.display='none'; p.classList.remove('active'); });
  const target = document.getElementById(z + '-' + tid);
  if (target) { target.style.display='block'; target.classList.add('active'); }
  page.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const tw = document.querySelector('#p-' + z + ' .tabs-wrap');
  if (tw) window.scrollTo({top: tw.offsetTop - 65, behavior:'smooth'});
}

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (!curZone) nav.classList.toggle('scrolled', window.scrollY > 80);
});
// ── LANGUAGE SWITCHER ──
const translations = {
  es: {
    // Nav
    'Inicio': 'Inicio',
    'La Sierra': 'La Sierra',
    // Hero
    'home-tagline': 'Donde el pasado <em>respira</em>',
    'hero-cta': 'Explorar la región',
    'zones-title': 'Elige tu <span>Destino</span>',
    'zone-btn': 'Explorar →',
    // Tabs
    'tab-lugares': '📍 Lugares',
    'tab-hospedaje': '🏨 Hospedaje',
    'tab-gastro': '🍽️ Gastronomía',
    'tab-arte': '🏺 Artesanías',
    'tab-camping': '🏕️ Camping',
    'tab-restaurantes': '🍽️ Restaurantes',
    // Zone hero descs
    'cg-desc': 'Cuna de la civilización Paquimé, arte en cerámica y tradición norteña.',
    'cj-desc': 'Fundada por colonos mormones en 1885. Tirolesa, río, puente de los candados y más.',
    'mo-desc': '400 artesanos que resucitaron la cerámica paquimé. La artesanía más fina de América del Norte.',
    'ls-desc': 'Cañones, ríos cristalinos, arqueología en acantilados y camping bajo las estrellas.',
    'sd-desc': 'Un rincón histórico del municipio con la imponente Hacienda de San Diego.',
    // Zone card tags
    'cg-tag': 'Pueblo Mágico',
    'cj-tag': 'Colonia Histórica · 1885',
    'mo-tag': 'Arte & Cerámica',
    'ls-tag': 'Naturaleza & Aventura',
    'sd-tag': 'Historia & Campo',
    // Back button
    'nav-back': '← Inicio',
    // Footer
    'footer-desc': 'Tu guía de turismo en el municipio de Casas Grandes, Chihuahua.',
    // intro text
    'hero-intro': 'Hace más de <strong>700 años</strong>, una civilización extraordinaria construyó en el desierto chihuahuense la ciudad más sofisticada del norte de América: <strong>Paquimé</strong>. Con agua potable, drenaje y comercio que llegaba hasta el Pacífico, su legado vive hoy en cada olla de barro de Mata Ortiz, en cada piedra de Colonia Juárez y en el horizonte infinito de la sierra.',
  },
  en: {
    'Inicio': 'Home',
    'La Sierra': 'The Sierra',
    'home-tagline': 'Where the past <em>breathes</em>',
    'hero-cta': 'Explore the region',
    'zones-title': 'Choose your <span>Destination</span>',
    'zone-btn': 'Explore →',
    'tab-lugares': '📍 Places',
    'tab-hospedaje': '🏨 Lodging',
    'tab-gastro': '🍽️ Gastronomy',
    'tab-arte': '🏺 Crafts',
    'tab-camping': '🏕️ Camping',
    'tab-restaurantes': '🍽️ Restaurants',
    'cg-desc': 'Birthplace of the Paquimé civilization, ceramic art and northern tradition.',
    'cj-desc': 'Founded by Mormon settlers in 1885. Zip line, river, lock bridge and more.',
    'mo-desc': '400 artisans who revived Paquimé ceramics. The finest craft in North America.',
    'ls-desc': 'Canyons, crystal-clear rivers, cliff archaeology and camping under the stars.',
    'sd-desc': 'A historic corner of the municipality with the imposing Hacienda de San Diego.',
    'cg-tag': 'Magic Town',
    'cj-tag': 'Historic Colony · 1885',
    'mo-tag': 'Art & Ceramics',
    'ls-tag': 'Nature & Adventure',
    'sd-tag': 'History & Countryside',
    'nav-back': '← Home',
    'footer-desc': 'Your tourism guide in the municipality of Casas Grandes, Chihuahua.',
    'hero-intro': 'Over <strong>700 years ago</strong>, an extraordinary civilization built the most sophisticated city in northern America in the Chihuahuan desert: <strong>Paquimé</strong>. With running water, drainage and trade reaching the Pacific, its legacy lives today in every clay pot of Mata Ortiz, every stone of Colonia Juárez and the infinite Sierra horizon.',
  }
};

let currentLang = 'es';

function setLang(lang) {
  currentLang = lang;
  const t = translations[lang];

  // Nav buttons active state
  document.getElementById('btn-es').classList.toggle('active', lang === 'es');
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');

  // All elements with data-es / data-en
  document.querySelectorAll('[data-es]').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (val !== null) el.innerHTML = val;
  });

  // Home tagline
  const tagline = document.querySelector('.home-tagline');
  if (tagline) tagline.innerHTML = t['home-tagline'];

  // Hero intro
  const intro = document.querySelector('.hero-intro-text');
  if (intro) intro.innerHTML = t['hero-intro'];

  // Zones title
  const zt = document.querySelector('.zones-title');
  if (zt) zt.innerHTML = t['zones-title'];

  // Zone hero descriptions
  const descs = {
    'p-cg': 'cg-desc', 'p-cj': 'cj-desc', 'p-mo': 'mo-desc',
    'p-ls': 'ls-desc', 'p-sd': 'sd-desc'
  };
  Object.entries(descs).forEach(([pageId, key]) => {
    const el = document.querySelector('#' + pageId + ' .zone-hero-desc');
    if (el) el.textContent = t[key];
  });

  // Zone card tags in home grid
  const tagMap = {
    'cg': 'cg-tag','cj': 'cj-tag','mo': 'mo-tag','ls': 'ls-tag','sd': 'sd-tag'
  };
  document.querySelectorAll('.zone-tag').forEach(el => {
    const card = el.closest('[onclick]');
    if (!card) return;
    const match = card.getAttribute('onclick').match(/'(\w+)'/);
    if (match && tagMap[match[1]]) el.textContent = t[tagMap[match[1]]];
  });

  // Zone card buttons
  document.querySelectorAll('.zone-btn').forEach(el => {
    el.textContent = t['zone-btn'];
  });

  // Nav back
  const nb = document.getElementById('nav-back');
  if (nb) nb.innerHTML = t['nav-back'];

  // Tab buttons
  const tabMap = {
    'lugares': 'tab-lugares', 'hospedaje': 'tab-hospedaje',
    'gastro': 'tab-gastro', 'arte': 'tab-arte',
    'camping': 'tab-camping', 'restaurantes': 'tab-restaurantes'
  };
  document.querySelectorAll('.tab-btn').forEach(btn => {
    const onclick = btn.getAttribute('onclick') || '';
    const match = onclick.match(/'(\w+)'\s*,\s*'(\w+)'/);
    if (match && tabMap[match[2]]) btn.innerHTML = t[tabMap[match[2]]];
  });
}

// Init on load
document.addEventListener('DOMContentLoaded', () => setLang('es'));

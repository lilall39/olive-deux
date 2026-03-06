import './style.css'

// Initialisation du site premium
console.log('Huiles d\'Olives d\'Algérie - Site Vitrine chargé.');

// Gestion du header sticky au scroll
const header = document.getElementById('main-header');
const logo = document.getElementById('header-logo');

// Remove no-transition class after first paint to enable smooth scrolling transitions
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    header.classList.remove('no-transition');
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
    header.classList.remove('menu-open');
  }
});

logo.addEventListener('click', () => {
  if (header.classList.contains('scrolled')) {
    header.classList.toggle('menu-open');
  }
});

// Animation compteur sur les chiffres des graphiques
function formatCount(value, decimals = 2) {
  return value.toFixed(decimals).replace('.', ',');
}

function getDecimals(num) {
  const s = String(num);
  const dot = s.indexOf('.');
  return dot >= 0 ? s.length - dot - 1 : 0;
}

function animateCount(el, target, suffix, duration = 1500) {
  const start = performance.now();
  const startVal = 0;
  const decimals = getDecimals(target);

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = startVal + (target - startVal) * eased;
    el.textContent = formatCount(current, decimals) + suffix;

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const CHART_DURATION = 2200;
const CHART_PAUSE = 1800;

function animateChartBars(container, duration = CHART_DURATION) {
  const bars = container.querySelectorAll('.chart-bar');
  bars.forEach((bar) => {
    const targetHeight = parseFloat(bar.dataset.barHeight);
    const targetY = parseFloat(bar.dataset.barY);
    const base = parseFloat(bar.dataset.barBase) ?? 110;
    if (isNaN(targetHeight)) return;

    bar.setAttribute('height', 0);
    bar.setAttribute('y', base);

    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const h = targetHeight * eased;
      const y = base - h;
      bar.setAttribute('height', h);
      bar.setAttribute('y', y);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

function runChartAnimation(section) {
  animateChartBars(section, CHART_DURATION);

  const counters = section.querySelectorAll('[data-count-to]');
  counters.forEach((el) => {
    const target = parseFloat(el.dataset.countTo);
    const suffix = el.dataset.countSuffix || '';
    if (!isNaN(target)) {
      el.textContent = '0' + suffix;
      animateCount(el, target, suffix, CHART_DURATION);
    }
  });
}

const chartSection = document.getElementById('marche-investissement');
let chartInterval = null;

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const section = entry.target;

      runChartAnimation(section);

      chartInterval = setInterval(() => {
        runChartAnimation(section);
      }, CHART_DURATION + CHART_PAUSE);

      counterObserver.unobserve(section);
    });
  },
  { threshold: 0.3 }
);

if (chartSection) counterObserver.observe(chartSection);

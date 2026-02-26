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

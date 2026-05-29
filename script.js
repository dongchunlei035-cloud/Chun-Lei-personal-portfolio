const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
const header = document.querySelector('[data-header]');
const revealItems = document.querySelectorAll('.reveal, .reveal-section');

const closeMenu = () => {
  siteNav.classList.remove('show');
  document.body.classList.remove('nav-open');
  menuToggle.setAttribute('aria-expanded', 'false');
};

menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('show');
  document.body.classList.toggle('nav-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

const updateHeaderState = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 12);
};

updateHeaderState();
window.addEventListener('scroll', updateHeaderState, { passive: true });

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -8% 0px',
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

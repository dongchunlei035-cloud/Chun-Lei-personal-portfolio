const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
const header = document.querySelector('[data-header]');
const progressBar = document.querySelector('[data-progress]');
const navLinks = [...siteNav.querySelectorAll('a')];
const heroRevealItems = document.querySelectorAll('.hero-reveal');
const revealSections = document.querySelectorAll('.reveal-section');
const sections = document.querySelectorAll('[data-section]');

const closeMenu = () => {
  siteNav.classList.remove('show');
  document.body.classList.remove('nav-open');
  menuToggle.setAttribute('aria-expanded', 'false');
};

const openMenu = () => {
  siteNav.classList.add('show');
  document.body.classList.add('nav-open');
  menuToggle.setAttribute('aria-expanded', 'true');
};

menuToggle.addEventListener('click', (event) => {
  event.stopPropagation();

  if (siteNav.classList.contains('show')) {
    closeMenu();
  } else {
    openMenu();
  }
});

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');

    if (targetId && targetId.startsWith('#')) {
      event.preventDefault();
      document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', targetId);
    }

    closeMenu();
  });
});

document.addEventListener('click', (event) => {
  const clickedOutsideMenu = !siteNav.contains(event.target) && !menuToggle.contains(event.target);
  const clickedMenuBackdrop = event.target === siteNav;

  if (siteNav.classList.contains('show') && (clickedOutsideMenu || clickedMenuBackdrop)) {
    closeMenu();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

const updateScrollUI = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

  header.classList.toggle('is-scrolled', window.scrollY > 12);
  progressBar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
};

const setActiveNav = (activeId) => {
  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${activeId}`);
  });
};

window.addEventListener('scroll', updateScrollUI, { passive: true });
window.addEventListener('resize', updateScrollUI);
updateScrollUI();

window.addEventListener('load', () => {
  heroRevealItems.forEach((item) => item.classList.add('is-visible'));
});

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
      threshold: 0.14,
      rootMargin: '0px 0px -10% 0px',
    }
  );

  revealSections.forEach((section) => revealObserver.observe(section));

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    },
    {
      threshold: 0.36,
      rootMargin: '-18% 0px -52% 0px',
    }
  );

  sections.forEach((section) => navObserver.observe(section));
} else {
  heroRevealItems.forEach((item) => item.classList.add('is-visible'));
  revealSections.forEach((section) => section.classList.add('is-visible'));
}

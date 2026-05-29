const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');

menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('show');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// 点击导航后在移动端自动收起菜单
siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('show');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

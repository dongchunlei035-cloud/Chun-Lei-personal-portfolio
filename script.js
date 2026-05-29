const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');

if (menuToggle && siteNav) {
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

  // 点击菜单外区域时自动关闭
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const clickedInsideNav = siteNav.contains(target);
    const clickedToggle = menuToggle.contains(target);

    if (!clickedInsideNav && !clickedToggle) {
      siteNav.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

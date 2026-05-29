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

// 作品图片后续替换即可；如果图片暂未上传，隐藏破图并保留占位画面。
document.querySelectorAll('.work-media img').forEach((image) => {
  const showPlaceholder = () => {
    image.closest('.work-media').classList.add('is-empty');
    image.setAttribute('aria-hidden', 'true');
  };

  image.addEventListener('error', showPlaceholder);

  if (image.complete && image.naturalWidth === 0) {
    showPlaceholder();
  }
});

let position = window.scrollY;
window.addEventListener('scroll', () => {
  let scroll = window.scrollY;
  const header = document.querySelector('.header');
  const body = document.querySelector('body');
  const headerUp = header?.querySelector('.header__up');
  if (header) {
    if (window.scrollY >= 100 && window.innerWidth > 1023) {
      header.querySelector('.menu').classList.add('menu--hidden');
      headerUp.classList.add('header__up-fixed');
      if (scroll > position) {
        header.classList.remove('header-fixed');
        if (!header.classList.contains('header--active')) {
          setTimeout(() => {
            header.classList.add('header--fixed');
          }, 100);
        } else {
          header.classList.add('header--fixed');
        }
      } else {
        header.classList.add('header-fixed');
        header.classList.remove('header--fixed');
      }
      header.classList.add('header--active');
      body.classList.add('body--fixed')
    } else {
      header.classList.remove('header--fixed');
      header.classList.remove('header--active');
      header.classList.remove('header-fixed');
      headerUp.classList.remove('header__up-fixed');
      header.querySelector('.menu').classList.remove('menu--hidden');
      body.classList.remove('body--fixed')
    }
    position = scroll;
  }
});

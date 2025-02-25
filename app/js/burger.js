const burger = document.querySelector('.burger');

if (burger) {
  const burgerBtn = burger.querySelector('.burger__btn');
  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('burger__btn--active')
    burger.querySelector('.burger__modal').classList.toggle('burger__modal--active');
    document.querySelector('body').classList.toggle('body--active')
  });
}

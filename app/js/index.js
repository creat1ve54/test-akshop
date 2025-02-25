//// ================================ Imports ======================================
//scss
// import 'bootstrap/dist/css/bootstrap-grid.css';
import 'nouislider/dist/nouislider.css';

import './btnToggle.js';
import './burger.js';
import './headerFixed.js';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import 'choices.js/src/styles/choices.scss';

import '../scss/index.scss';
//js
// import $ from 'jquery';
import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';
// import { Fancybox, Carousel, Panzoom } from '@fancyapps/ui';
// import IMask from 'imask';
// import autoComplete from '@tarekraafat/autocomplete.js';
// import validate from 'validate.js';
// import ApexCharts from 'apexcharts';
// import { rippleEffect, Ripple } from 'data-ripple';
import noUiSlider from 'nouislider';
// import Scrollbar from 'smooth-scrollbar';

import { createPopper } from '@popperjs/core';

//// ================================ Code ======================================

new Swiper('.main-slider', {
  modules: [Navigation, Pagination],

  pagination: {
    el: '.main-slider-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.main-slider-next',
    prevEl: '.main-slider-prev',
  },
  breakpoints: {
    0: {
      slidesPerView: 1.01,
      spaceBetween: 10,
    },
    768: {
      spaceBetween: 20,
      slidesPerView: 1,
    },
  },
});

new Swiper('.menu__items-swiper', {
  modules: [Navigation],
  allowTouchMove: true,
  breakpoints: {
    0: {
      allowTouchMove: true,
      spaceBetween: 16,
      slidesPerView: 'auto',
    },
    1023: {
      allowTouchMove: true,
      spaceBetween: 16,
      slidesPerView: 'auto',
    },
    1439: {
      allowTouchMove: false,
      slidesPerView: 'auto',
    },
  },
  navigation: {
    nextEl: '.menu__items-swiper-next',
    prevEl: '.menu__items-swiper-prev',
  },
});

new Swiper('.catalog-slider', {
  modules: [Navigation],
  slidesPerView: 'auto',
  spaceBetween: 4,

  navigation: {
    nextEl: '.catalog-slider__array-next',
    prevEl: '.catalog-slider__array-prev',
  },
});

const swiperCardDetailThumbs = new Swiper('.card-detail__swiper-two', {
  spaceBetween: 12,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});

new Swiper('.card-detail__swiper-one', {
  modules: [Thumbs, Navigation, Pagination],
  spaceBetween: 10,
  navigation: {
    nextEl: '.card-detail__swiper-one-next',
    prevEl: '.card-detail__swiper-one-prev',
  },
  pagination: {
    el: '.card-detail__swiper-pagination',
    clickable: true,
  },
  thumbs: {
    swiper: swiperCardDetailThumbs,
  },
});

const slide = document.querySelector('.js-slide');

const slideInputOne = document.querySelector('.js-slide__one');
const slideInputTwo = document.querySelector('.js-slide__two');
const minValue = 0;

if (slide) {
  slideInputOne.innerHTML = minValue;
  noUiSlider.create(slide, {
    connect: [true, false],
    format: {
      to: function (value) {
        return Math.floor(value);
      },
      from: function (value) {
        return Math.floor(value);
      },
    },
    range: {
      min: [minValue, 20],
      max: [10000, 20],
    },
    start: [minValue],
  });

  slide.noUiSlider.on('update', function (values, handle) {
    slideInputTwo.innerHTML = values[handle];
  });
}

new Swiper('.js-time-delivery', {
  modules: [Navigation],
  spaceBetween: 12,
  slidesPerView: 'auto',
  navigation: {
    nextEl: '.js-time-delivery-next',
    prevEl: '.js-time-delivery-prev',
  },
});

new Swiper('.js-stocks', {
  spaceBetween: 10,
  slidesPerView: 1.05,
  breakpoints: {
    768: {
      slidesPerView: 'auto',
      spaceBetween: 20,
    },
  },
});

document?.querySelectorAll('.card__down-btn').forEach((item) => {
  item?.addEventListener('click', () => {
    item?.nextElementSibling.classList.add('counter--active');
  });
  item?.nextElementSibling?.querySelector('.counter__btn--minus').addEventListener('click', () => {
    item?.nextElementSibling.classList.remove('counter--active');
  });
});

const cardsSwiper = document.querySelectorAll('.cards-swiper__container');

if (cardsSwiper) {
  cardsSwiper.forEach((card) => {
    new Swiper(card.querySelector('.js-cards-swiper'), {
      modules: [Navigation],
      spaceBetween: 10,
      slidesPerView: 'auto',
      navigation: {
        nextEl: card.querySelector('.js-cards-swiper-next'),
        prevEl: card.querySelector('.js-cards-swiper-prev'),
      },
      breakpoints: {
        768: {
          slidesPerView: 'auto',
          spaceBetween: 20,
        },
      },
    });
  });
}

const element = document.querySelector('.order__result');
const fixed = document.querySelector('.js-fixed');

let Visible = function (target) {
  let targetPosition = {
      top: window.scrollY + target.getBoundingClientRect().top,
      bottom: window.scrollY + target.getBoundingClientRect().top,
    },
    windowPosition = {
      top: window.scrollY,
      bottom: window.scrollY + document.documentElement.clientHeight,
    };

  if (targetPosition.top < windowPosition.bottom) {
    fixed.classList.add('js-fixed-hiden');
  } else {
    fixed.classList.remove('js-fixed-hiden');
  }
};

if (element && fixed) {
  window.addEventListener('scroll', function () {
    Visible(element);
  });
  Visible(element);
}

const selects = document.querySelectorAll('.js-select');

const selectPopper = (select) => {
  const button = select.querySelector('.custom-select__header ');
  const tooltip = select.querySelector('.custom-select__case');
  let click = true;
  const popperInstance = createPopper(button, tooltip, {
    placement: 'bottom-start',
  });

  function show() {
    button.setAttribute('data-show', '');
    click = !click;
    popperInstance.update();
  }

  function hide() {
    button.removeAttribute('data-show');
    click = !click;
    popperInstance.update();
  }

  button.addEventListener('click', () => {
    if (click) {
      show();
    } else {
      hide();
    }
  });

  window.addEventListener('click', (e) => {
    if (!tooltip.contains(e.target) && !button.contains(e.target) && !click) {
      hide();
    }
  });
};

if (selects) {
  selects.forEach((select) => {
    selectPopper(select);
    //     select.firstElementChild.addEventListener('click', () => {
    //       select.lastElementChild.classList.toggle('custom-select__case--active');
    //       select.firstElementChild.classList.toggle('custom-select__header--active');
    //       if (select.lastElementChild.classList.contains('custom-select__case--active')) {
    //         select.lastElementChild.style.maxHeight = select.lastElementChild.scrollHeight + 'px';
    //       } else {
    //         select.lastElementChild.style.maxHeight = 0;
    //       }
    //     });
  });
}

const cardHistory = document.querySelectorAll('.order-history__card');

if (cardHistory) {
  cardHistory.forEach((card) => {
    new Swiper(card.querySelector('.order-history__card-items'), {
      modules: [Navigation],
      spaceBetween: 4,
      slidesPerView: 'auto',
      navigation: {
        nextEl: card.querySelector('.js-cards-swiper-next'),
        prevEl: card.querySelector('.js-cards-swiper-prev'),
      },
      breakpoints: {
        768: {
          slidesPerView: 'auto',
          spaceBetween: 4,
        },
      },
    });
  });
}

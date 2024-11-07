import Swiper, { Navigation } from 'swiper';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, CustomEase);

const swiperProgress = new Swiper('.swiper-progress', {
  modules: [Navigation],
  speed: 1000,
  slidesPerView: 1,
  spaceBetween: 8,
  breakpoints: {
    // 360: {
    //   slidesPerView: 1.1,
    //   spaceBetween: 8,
    // },
    // 768: {
    //   slidesPerView: 2,
    //   //   spaceBetween: 20,
    // },
    // 1366: {
    //   // spaceBetween: 20,
    //   slidesPerView: 3,
    // },
  },

  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
  on: {
    init: function(sw) {
      const active = document.querySelector('.js-active-number');
      active.innerHTML =
        String(sw.activeIndex + 1).length > 1
          ? sw.activeIndex + 1
          : '0' + String(sw.activeIndex + 1);
      const total = document.querySelector('.js-total-number');
      total.innerHTML =
        String(sw.slides.length).length > 1 ? sw.slides.length : '0' + sw.slides.length;
    },
    slideChange: function(sw) {
      const active = document.querySelector('.js-active-number');
      active.innerHTML =
        String(sw.activeIndex + 1).length > 1
          ? sw.activeIndex + 1
          : '0' + String(sw.activeIndex + 1);
      const total = document.querySelector('.js-total-number');
      total.innerHTML =
        String(sw.slides.length).length > 1 ? sw.slides.length : '0' + sw.slides.length;
    },
  },
});

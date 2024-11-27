import Swiper, { Navigation } from 'swiper';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, CustomEase);

document.addEventListener('DOMContentLoaded', () => {
  const loadTl = gsap
    .timeline({ paused: true })
    .fromTo(
      '.page-hero > .about__title-wrap > *',
      {
        opacity: 0,
        y: -300,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
      },
    )
    .fromTo(
      '.page-hero > .single-progress__content',
      {
        opacity: 0,
        y: 300,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
      },
      '<',
    )
    .fromTo(
      '.breadcrumbs',
      {
        opacity: 0,
        x: -100,
      },
      {
        opacity: 1,
        x: 0,
      },
    );

  window.addEventListener('finishLoader', () => {
    loadTl.play();
  });
});

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

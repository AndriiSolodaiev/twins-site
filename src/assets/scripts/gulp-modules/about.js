import Swiper, { Navigation } from 'swiper';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';

import googleMap from '../modules/map/map';

googleMap();

gsap.registerPlugin(ScrollTrigger, CustomEase);
const swiperAbout = new Swiper('.swiper-about', {
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
      '.page-hero > .page-hero__wrapper > *',
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

const aboutTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.about__title-wrap',
    start: 'top top+=160px', // when the top of the trigger hits the top of the viewport
    end: 'bottom top', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    scrub: 1,
    // markers: true,
  },
});
aboutTl.fromTo(
  '.about-title',
  {
    ease: 'none',
    xPercent: 0,
  },
  {
    xPercent: -150,
    ease: 'none',
  },
);
if (window.innerWidth > 1365) {
  const heroAboutTextTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.page-hero__wrapper',
      start: 'top center', // when the top of the trigger hits the top of the viewport
      end: 'center top', // end after scrolling 500px beyond the start
      // smooth scrubbing, takes 1 second to "catch up" to the
      scrub: 1,
      // markers: true,
    },
  });
  heroAboutTextTl.fromTo(
    '.page-hero-descr',
    {
      ease: 'none',
      yPercent: 0,
    },
    {
      yPercent: 100,
      ease: 'none',
    },
  );
}
const heroAboutTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.page-hero__wrapper',
    start: 'top center', // when the top of the trigger hits the top of the viewport
    end: 'center top', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    scrub: 1,
    // markers: true,
  },
});
heroAboutTl.fromTo(
  '.page-hero__about-img-wrap .about__text-block',
  {
    ease: 'none',
    yPercent: 30,
  },
  {
    yPercent: 0,
    ease: 'none',
  },
);

function textAppear(selector) {
  gsap.from(selector, {
    scrollTrigger: {
      trigger: selector, // Той самий блок
      start: 'top bottom', // Паралакс ефект починається, коли блок доходить до низу вікна
      end: 'bottom bottom', // Закінчується, коли блок виходить з екрану
      // Плавне скролювання
      // markers: true,
      // scrub: 1,
    },
    yPercent: 50, // Зміщуємо блок на -50 пікселів по осі Y
    opacity: 0,
    duration: 1,
  });
}
document.querySelectorAll('[data-anim-appear]').forEach(block => {
  textAppear(block);
});

// textAppear('.about-arcitecture__img-wrap');

const imgContTL = gsap.timeline({
  scrollTrigger: {
    trigger: '.about-arcitecture__img-container', // Той самий блок
    start: 'top bottom', // Паралакс ефект починається, коли блок доходить до низу вікна
    end: 'bottom top', // Закінчується, коли блок виходить з екрану
    // Плавне скролювання
    // markers: true,
    scrub: 1,
  },
});
imgContTL.to('.about-arcitecture__img-container img', {
  ease: 'none',
  yPercent: 20, // Зміщуємо блок на -50 пікселів по осі Y
});

const imgCont2TL = gsap.timeline({
  scrollTrigger: {
    trigger: '.about-arcitecture__img-container2', // Той самий блок
    start: 'top bottom', // Паралакс ефект починається, коли блок доходить до низу вікна
    end: 'bottom top', // Закінчується, коли блок виходить з екрану
    // Плавне скролювання
    // markers: true,
    scrub: 1,
  },
});
imgCont2TL.to('.about-arcitecture__img-container2 img', {
  ease: 'none',
  yPercent: 20, // Зміщуємо блок на -50 пікселів по осі Y
});

const secondCardTL = gsap.timeline({
  scrollTrigger: {
    trigger: '.about-safety__card.second-card', // Той самий блок
    start: 'top bottom', // Паралакс ефект починається, коли блок доходить до низу вікна
    end: 'bottom bottom', // Закінчується, коли блок виходить з екрану
    // Плавне скролювання
    // markers: true,
    // scrub: 1,
  },
});
secondCardTL
  .from('.about-safety__card.second-card', {
    yPercent: 50, // Зміщуємо блок на -50 пікселів по осі Y
    opacity: 0,
    duration: 1,
  })
  .from(
    '.about-safety__card.second-card .elips',
    {
      scale: 0.7,
    },
    '<+=0.2',
  )
  .from(
    '.about-safety__card.second-card img',
    {
      yPercent: 20,
      opacity: 0,
    },
    '<+=0.2',
  );

const locationTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.about-location .about__title-wrap',
    start: 'top bottom', // when the top of the trigger hits the top of the viewport
    end: 'bottom top', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    scrub: 1,
    // markers: true,
  },
});
locationTl.fromTo(
  '.location-title',
  {
    ease: 'none',
    xPercent: 50,
  },
  {
    xPercent: -100,
    ease: 'none',
  },
);

const safetyTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.about-safety .about__title-wrap',
    start: 'top bottom', // when the top of the trigger hits the top of the viewport
    end: 'bottom top', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    scrub: 1,
    // markers: true,
  },
});
safetyTl.fromTo(
  '.safety-title',
  {
    ease: 'none',
    xPercent: 50,
  },
  {
    xPercent: -100,
    ease: 'none',
  },
);

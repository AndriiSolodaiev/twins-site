import Swiper, { Autoplay, Navigation, Pagination, EffectCreative } from 'swiper';

// import 'swiper/css/effect-creative';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';

// import '../modules/helpers/imgParallax';
// import "../modules/property/filter"

import { initSmoothScrolling } from '../modules/scroll/leniscroll';

initSmoothScrolling();
gsap.registerPlugin(ScrollTrigger, CustomEase);

const swiperHero = new Swiper('.swiper-hero', {
  modules: [Autoplay, Pagination, EffectCreative],
  speed: 1500,
  effect: 'creative',
  loop: true,
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, '-50%', 0],
      perspective: true,
    },
    next: {
      scale: 1.5,
      translate: [0, '100%', 0],
      perspective: true,
    },
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  slidesPerView: 1,
  autoplay: { delay: 4000 },
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
});

const about = gsap.timeline({
  scrollTrigger: {
    trigger: '.about-title',
    start: 'top bottom', // when the top of the trigger hits the top of the viewport
    end: 'bottom top', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    scrub: 1,
    // markers: true,
  },
});
about.fromTo(
  '.about-title',
  {
    xPercent: 50,
  },
  {
    xPercent: -100,
  },
);
const aboutImg = gsap.timeline({
  scrollTrigger: {
    trigger: '.about ', // Блок, до якого прив'язуємо анімацію
    start: 'top top', // Коли починається анімація
    end: 'bottom top', // Коли закінчується
    scrub: true, // Плавна анімація
    // markers: true,
    pin: true, // Затримка (пінінг) блока
    // pinSpacing: false,
    onLeave: () => ScrollTrigger.refresh(), // Оновлення при виході з пінінгу
  },
});
aboutImg
  .to('.about-img-wrap', {
    scale: 1.7, // Збільшуємо картинку до 1.5
    borderRadius: '10%',
    ease: 'none', // Лінійна анімація без ефектів
  })
  .to(
    '.about-img',
    {
      borderRadius: '10%',
      // scale: 1.2,
      ease: 'none',
    },
    '<',
  );

// Паралакс ефект для фонового блоку

gsap.to('.about-img', {
  scrollTrigger: {
    trigger: '.about-content ', // Той самий блок
    start: 'top bottom', // Паралакс ефект починається, коли блок доходить до низу вікна
    end: 'top top', // Закінчується, коли блок виходить з екрану
    scrub: true, // Плавне скролювання
    // markers: true,
  },
  yPercent: 40, // Зміщуємо блок на -50 пікселів по осі Y
  ease: 'none',
});

function textAppear(selector) {
  console.log(selector);
  gsap.from(`${selector}`, {
    scrollTrigger: {
      trigger: `${selector}`, // Той самий блок
      start: 'top bottom', // Паралакс ефект починається, коли блок доходить до низу вікна
      end: 'bottom bottom', // Закінчується, коли блок виходить з екрану
      // Плавне скролювання
      // markers: true,
      // scrub: 1,
    },
    yPercent: 50, // Зміщуємо блок на -50 пікселів по осі Y

    opacity: 0,
  });
}
textAppear('.about-content__title-1');
textAppear('.about-content__text-1');
textAppear('.about-content__title-2');
textAppear('.about-content__text-2');
textAppear('.about-video');
textAppear('.about-btn-wrap');

const tlPanorama = gsap.timeline({
  scrollTrigger: {
    trigger: '.fake-section',
    start: 'top bottom',
    end: `bottom top`,
    scrub: 0.1,
    // pin: true, // Пінінг другого блоку
    // pinSpacing: false,
  },
});

tlPanorama // Анімація для зображення в другому блоці
  .to(
    '.bg-img',
    {
      scale: 1.2, // Збільшуємо масштаб зображення до 1.2 (можеш змінити на 1.5, якщо потрібно)
    },
    '<',
  );

gsap.to('.panorama-btn-wrap path', {
  scrollTrigger: {
    trigger: '.fake-section', // Елемент, який активує анімацію
    start: 'top 80%', // Коли верх SVG доходить до 80% вікна
    end: 'bottom bottom', // Коли нижня частина SVG доходить до 50% вікна
    scrub: true, // Плавна анімація під час скролу
    markers: true,
  },
  strokeDashoffset: 0, // Плавно відмалювати весь контур
  duration: 2, // Тривалість анімації (опціонально, за допомогою scrub буде плавний контроль)
  ease: 'none', // Лінійна анімація без прискорення або уповільнення
});

//location

const location = gsap.timeline({
  scrollTrigger: {
    trigger: '.location-title',
    start: 'top bottom', // when the top of the trigger hits the top of the viewport
    end: 'bottom top', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    scrub: 1,
    // markers: true,
  },
});
location.fromTo(
  '.location-title',
  {
    xPercent: 50,
  },
  {
    xPercent: -100,
  },
);
const locationImg = gsap.timeline({
  scrollTrigger: {
    trigger: '.location ', // Блок, до якого прив'язуємо анімацію
    start: 'top top', // Коли починається анімація
    end: 'bottom top', // Коли закінчується
    scrub: true, // Плавна анімація
    // markers: true,
    pin: true, // Затримка (пінінг) блока
    // pinSpacing: false,
    onLeave: () => ScrollTrigger.refresh(), // Оновлення при виході з пінінгу
  },
});
locationImg
  .to('.location-img-wrap', {
    scale: 1.7, // Збільшуємо картинку до 1.5
    borderRadius: '10%',
    ease: 'none', // Лінійна анімація без ефектів
  })
  .to(
    '.location-img',
    {
      borderRadius: '10%',
      // scale: 1.2,
      ease: 'none',
    },
    '<',
  );

// Паралакс ефект для фонового блоку

gsap.to('.location-img', {
  scrollTrigger: {
    trigger: '.location-content ', // Той самий блок
    start: 'top bottom', // Паралакс ефект починається, коли блок доходить до низу вікна
    end: 'top top', // Закінчується, коли блок виходить з екрану
    scrub: true, // Плавне скролювання
    // markers: true,
  },
  yPercent: 40, // Зміщуємо блок на -50 пікселів по осі Y
  ease: 'none',
});

textAppear('.location-content__title-1');
textAppear('.location-content__text-1');

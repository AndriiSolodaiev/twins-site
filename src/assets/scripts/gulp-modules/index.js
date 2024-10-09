import Swiper, { Autoplay, Navigation, Pagination, EffectCreative } from 'swiper';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import { initSmoothScrolling } from '../modules/scroll/leniscroll';
import googleMap from '../modules/map/map';

googleMap();
initSmoothScrolling();
gsap.registerPlugin(ScrollTrigger, CustomEase);
window.addEventListener('DOMContentLoaded', () => {
  const swiperHero = new Swiper('.swiper-hero', {
    modules: [Autoplay, Pagination, EffectCreative],
    speed: 1500,
    effect: 'creative',
    loop: true,
    delay: 3000,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

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
  swiperHero.autoplay.stop();
  setTimeout(() => swiperHero.autoplay.start(), 2000);
});

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => swiperHero.autoplay.start(), 2000);
});
const about = gsap.timeline({
  scrollTrigger: {
    trigger: '.about-title',
    start: 'top bottom', // when the top of the trigger hits the top of the viewport
    end: 'bottom+=400% top', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    scrub: 1,
  },
});
about.fromTo(
  '.about-title',
  {
    ease: 'none',
    xPercent: 50,
  },
  {
    ease: 'none',
    xPercent: -100,
  },
);
const aboutImg = gsap.timeline({
  scrollTrigger: {
    trigger: '.about', // Блок, до якого прив'язуємо анімацію
    start: 'top top', // Коли починається анімація
    end: 'bottom center', // Коли закінчується
    scrub: true, // Плавна анімація
    // markers: true,
    pin: true, // Затримка (пінінг) блока
    // pinSpacing: false,
    // onLeave: () => ScrollTrigger.refresh(), // Оновлення при виході з пінінгу
  },
});
aboutImg
  .to('.about-big-wrap', {
    scale: 2.2,

    // ease: 'none',
  })
  .to(
    '.about-img',

    {
      // height: '80%',
      scale: 0.7,
      // ease: 'none',
    },
    '<',
  );

// gsap.to('.about-big-wrap ', {
//   scrollTrigger: {
//     trigger: '.about-content ', // Той самий блок
//     start: 'top bottom', // Паралакс ефект починається, коли блок доходить до низу вікна
//     end: 'top top', // Закінчується, коли блок виходить з екрану
//     scrub: true, // Плавне скролювання
//   },
//   yPercent: 20, // Зміщуємо блок на -50 пікселів по осі Y
//   // ease: 'none',
// });

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
      scale: 1.4, // Збільшуємо масштаб зображення до 1.2 (можеш змінити на 1.5, якщо потрібно)
    },
    '<',
  );

gsap.to('.panorama-btn-wrap path', {
  scrollTrigger: {
    trigger: '.fake-section', // Елемент, який активує анімацію
    start: 'top center', // Коли верх SVG доходить до 80% вікна
    end: 'bottom bottom', // Коли нижня частина SVG доходить до 50% вікна
    scrub: true, // Плавна анімація під час скролу
    // markers: true,
  },
  strokeDashoffset: 0, // Плавно відмалювати весь контур
  // duration: 2, // Тривалість анімації (опціонально, за допомогою scrub буде плавний контроль)
  ease: 'none', // Лінійна анімація без прискорення або уповільнення
});

//location

const location = gsap.timeline({
  scrollTrigger: {
    trigger: '.location-title',
    start: 'top bottom', // when the top of the trigger hits the top of the viewport
    end: 'bottom+=400% top', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    scrub: 1,
  },
});
location.fromTo(
  '.location-title',
  {
    xPercent: 50,
    ease: 'none',
  },
  {
    xPercent: -100,
    ease: 'none',
  },
);
const locationImg = gsap.timeline({
  scrollTrigger: {
    trigger: '.location', // Блок, до якого прив'язуємо анімацію
    start: 'top top', // Коли починається анімація
    end: 'bottom center', // Коли закінчується
    scrub: true, // Плавна анімація
    // markers: true,
    pin: true, // Затримка (пінінг) блока
    // pinSpacing: false,
    // onLeave: () => ScrollTrigger.refresh(), // Оновлення при виході з пінінгу
  },
});
locationImg
  .to('.location-big-wrap', {
    scale: 2.2, // Збільшуємо картинку до 1.5

    // ease: 'none', // Лінійна анімація без ефектів
  })
  .to(
    '.location-img',

    {
      // height: '100%',
      scale: 0.7,
      // ease: 'none',
    },
    '<',
  );

// Паралакс ефект для фонового блоку

// gsap.to('.location-img', {
//   scrollTrigger: {
//     trigger: '.location-content ', // Той самий блок
//     start: 'top bottom', // Паралакс ефект починається, коли блок доходить до низу вікна
//     end: 'top top', // Закінчується, коли блок виходить з екрану
//     scrub: true, // Плавне скролювання
//     // markers: true,
//   },
//   yPercent: 20, // Зміщуємо блок на -50 пікселів по осі Y
//   // ease: 'none',
// });

textAppear('.location-content__title-1');
textAppear('.location-content__text-1');

//tour
const tourTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.tour-title',
    start: 'top bottom', // when the top of the trigger hits the top of the viewport
    end: 'bottom top', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    scrub: 1,
    // markers: true,
  },
});
tourTl
  .fromTo(
    '.tour-title',
    {
      ease: 'none',
      xPercent: 50,
    },
    {
      xPercent: -50,
      ease: 'none',
    },
  )
  .to(
    '.tour-lamp',
    {
      yPercent: 30,
    },
    '<',
  );

//property
const tlProperty = gsap.timeline({
  scrollTrigger: {
    trigger: '.property-img-wrap',
    start: 'top bottom',
    end: `bottom top`,
    scrub: 0.1,
    // pin: true, // Пінінг другого блоку
    // pinSpacing: false,
  },
});

tlProperty // Анімація для зображення в другому блоці
  .to(
    '.property-img',
    {
      scale: 1.2, // Збільшуємо масштаб зображення до 1.2 (можеш змінити на 1.5, якщо потрібно)
    },
    '<',
  );
const propertyRight = gsap.timeline({
  scrollTrigger: {
    trigger: '.property-title-wrap .right',
    start: 'top bottom', // when the top of the trigger hits the top of the viewport
    end: 'bottom top', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    scrub: 1,
    // markers: true,
  },
});
propertyRight.fromTo(
  '.property-title-wrap .right',
  {
    xPercent: 50,
    ease: 'none',
  },
  {
    xPercent: -50,
    ease: 'none',
  },
);

const propertyLeft = gsap.timeline({
  scrollTrigger: {
    trigger: '.property-title-wrap .left',
    start: 'top bottom', // when the top of the trigger hits the top of the viewport
    end: 'bottom+=400% top', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    scrub: 1,
    // markers: true,
  },
});
propertyLeft.fromTo(
  '.property-title-wrap .left',
  {
    ease: 'none',
    xPercent: -50,
  },
  {
    xPercent: 50,
    ease: 'none',
  },
);

//footer - contacts

const footerTitle = gsap.timeline({
  scrollTrigger: {
    trigger: '.footer-title',
    start: 'top bottom', // when the top of the trigger hits the top of the viewport
    end: 'bottom top', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    scrub: 1,
    // markers: true,
  },
});
footerTitle.fromTo(
  '.footer-title',
  {
    ease: 'none',
    xPercent: 50,
  },
  {
    xPercent: -50,
    ease: 'none',
  },
);

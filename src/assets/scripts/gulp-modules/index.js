import Swiper, { Autoplay, Navigation, Pagination, EffectCreative } from 'swiper';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
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
    // markers: true,
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
      xPercent: 50,
    },
    {
      xPercent: -100,
    },
  )
  .to(
    '.tour-lamp',
    {
      yPercent: 30,
    },
    '<',
  );

//advantage

// let cards = gsap.utils.toArray('.advantage-card');

// let stickDistance = 0;

// let lastCardST = ScrollTrigger.create({
//   trigger: cards[cards.length - 1],
//   start: 'center center',
// });
// let offsetY = 10;
// cards.forEach((card, index) => {
//   let scaleDown = gsap.to(card, {
//     // 'transform-origin': '"50% ' + (lastCardST.start + stickDistance) + '"',
//     // scale: 0.9,
//     // y: index * 20,
//   });

//   ScrollTrigger.create({
//     trigger: card,
//     start: 'top 20%',
//     end: () => lastCardST.start + stickDistance,
//     pin: true,
//     pinSpacing: false,
//     ease: 'none',
//     // animation: scaleDown,
//     toggleActions: 'restart none none reverse',
//     // markers: true,
//     onEnter: () => {
//       // Зміщуємо картку по Y відповідно до індексу
//       gsap.set(card, { y: index * offsetY });
//     },
//     // onLeave: () => {
//     //   // Зміщуємо картку по Y відповідно до індексу
//     //   gsap.set(card, { y: index * offsetY });
//     // },
//   });
// });

// ScrollTrigger.create({
//   trigger: '.advantages-title',
//   start: 'top 10%', // Пінінг починається, коли назва дійде до верхнього краю екрану
//   end: () => lastCardST.start + stickDistance, // Тривалість пінінгу (можна налаштувати)
//   pin: true, // Фіксуємо заголовок
//   pinSpacing: false,
// });

//property
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
  },
);

const propertyLeft = gsap.timeline({
  scrollTrigger: {
    trigger: '.property-title-wrap .left',
    start: 'top bottom', // when the top of the trigger hits the top of the viewport
    end: 'bottom top', // end after scrolling 500px beyond the start
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
    xPercent: 100,
  },
  {
    xPercent: -50,
  },
);

const missionSection = document.querySelector('.advantages');
// const container = document.querySelector('.advantages-list');

// if (missionSection) {
//   // Настройка ScrollTrigger и GSAP
//   function setupScrollTrigger() {
//     const missionWrapperWidth = container.scrollWidth;
//     const amountToScroll = missionWrapperWidth - window.innerWidth;

//     // Анимация GSAP для горизонтального скролла
//     const tween = gsap.to('.advantage-card', {
//       // x: `-${amountToScroll}px`,
//       // duration: 3,
//       // ease: 'none',
//       x: index => {
//         return `${20 * index}`;
//       },
//       duration: 1,
//       scale: index => {
//         const initialScale = 1; // Начальное значение масштаба
//         const increment = 0.01; // Значение, на которое увеличивается масштаб
//         return `${initialScale + increment * index}`;
//       },
//       onUpdate: function() {},
//       transformOrigin: 'top left',
//       stagger: 1 / document.querySelectorAll('.advantage-card').length,
//     });

//     // ScrollTrigger для привязки анимации
//     gsap.set(missionSection, {
//       height: window.innerHeight * 4,
//     });
//     ScrollTrigger.create({
//       trigger: missionSection,
//       start: 'top top',
//       // end: `+=${amountToScroll}`,
//       end: 'bottom bottom',
//       // pin: true,

//       pin: '.advantages',
//       animation: tween,
//       scrub: 1,
//       onUpdate: self => {
//         // Прокрутка элемента .mission__list в зависимости от скролла страницы
//         const scrollPercent = self.progress; // Процент прокрутки
//         const maxScroll = container.scrollWidth - container.clientWidth; // Максимальная прокрутка
//         // Схлопування досягається за рахунок position: sticky
//         container.scrollLeft = scrollPercent * maxScroll;
//       },
//     });
//   }

// function setupScrollTriggerVertical() {
//   const missionRight = document.querySelector('.advantages');
//   const missionList = document.querySelector('.advantages-list');

//   // Убедитесь, что высота элемента `mission__list` установлена
//   missionList.style.height = `${missionRight.offsetHeight}px`;

//   // Создаем ScrollTrigger
//   ScrollTrigger.create({
//     trigger: missionSection,
//     start: 'bottom bottom',
//     end: () => '+=' + missionRight.offsetHeight * 5,
//     // end: 'bottom top',
//     // pin: true,
//     pin: '.advantages-wrapper',
//     // pinSpacing: true,
//     // anticipatePin: 1,
//     scrub: true,
//     // markers: true,

//     // Обновление при скролле
//     onUpdate: self => {
//       // Прокрутка элемента .mission__list в зависимости от скролла страницы
//       const scrollPercent = self.progress; // Процент прокрутки
//       const maxScroll = missionList.scrollHeight - missionList.clientHeight; // Максимальная прокрутка
//       missionList.scrollTop = scrollPercent * maxScroll;
//     },
//   });
// }

// setupScrollTriggerVertical();
// }

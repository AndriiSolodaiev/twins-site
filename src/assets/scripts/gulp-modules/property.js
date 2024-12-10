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
      '.page-hero > .property-hero__img-descr-wrap > *',
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

const heroTitleTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.property-hero .about__title-wrap',
    start: 'top center', // when the top of the trigger hits the top of the viewport
    end: 'center top', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    scrub: 1,
    // markers: true,
  },
});
heroTitleTl
  .fromTo(
    '.property-title-1',
    {
      ease: 'none',
      xPercent: 75,
    },
    {
      xPercent: -75,
      ease: 'none',
    },
  )
  .fromTo(
    '.property-title-2',
    {
      ease: 'none',
      xPercent: -125,
    },
    {
      xPercent: 0,
      ease: 'none',
    },
    '<',
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

function aboutAnim() {
  if (window.innerWidth > 1366 || window.innerWidth > window.innerHeight) {
    const aboutImg = gsap.timeline({
      scrollTrigger: {
        pinType: 'fixed',
        trigger: '.about', // Блок, до якого прив'язуємо анімацію
        start: 'top top', // Коли починається анімація
        end: 'bottom top', // Коли закінчується
        scrub: true, // Плавна анімація
        // markers: true,
        // pin: '.about-wrap', // Затримка (пінінг) блока
        pin: '.about-wrap', // Затримка (пінінг) блока
        onLeaveBack: () => {
          // aboutImg.reverse();
        },
        // pinSpacing: false,
        // onLeave: () => ScrollTrigger.refresh(), // Оновлення при виході з пінінгу
      },
    });
    const path = document.querySelector('[data-about-img-path]');
    const defaultState = path.getAttribute('d');
    // const activeState = 'M 1921 0 H 0 V 970 H 1921 V 0 Z M -1 487 C -12 1024 -70 971 967 971 C 2021 968 1917 1048 1917 481 C 1920 -93 2021 -1 960 -1 C -109 3 0 -93 -1 487 Z';
    const activeState =
      'M 1921 0 H 0 V 970 H 1921 V 0 Z M -409 491 C -407 964 -6 1169 951 1159 C 1928 1157 2362 959 2362 472 C 2362 -1 1902 -182 956 -177 C 6 -182 -400 4 -407 491 Z';
    const percentOfCircleOpeningAnimation = 0.5;
    aboutImg
      .fromTo(
        path,
        {
          attr: {
            d: defaultState,
          },
        },
        {
          attr: {
            d: activeState,
          },
          duration: percentOfCircleOpeningAnimation,
          ease: 'none',
        },
      )
      .from(
        '.about-img',
        {
          scale: 1,
          duration: 0.4,
          transformOrigin: 'top',
        },
        '<',
      )
      .to(
        '.page-hero-descr',
        {
          yPercent: 100,
        },
        '<',
      )
      .to(path.parentElement, {
        scale: 1.1,
        duration: 1 - percentOfCircleOpeningAnimation,
      });
  } else {
    const aboutImgMob = gsap.timeline({
      scrollTrigger: {
        pinType: 'fixed',
        trigger: '.about', // Блок, до якого прив'язуємо анімацію
        start: 'top top', // Коли починається анімація
        end: 'bottom top', // Коли закінчується
        // scrub: true, // Плавна анімація
        // markers: true,
        // pin: '.about-wrap', // Затримка (пінінг) блока
        pin: '.about-wrap', // Затримка (пінінг) блока
        onLeaveBack: () => {
          aboutImgMob.reverse();
        },
        // pinSpacing: false,
        // onLeave: () => ScrollTrigger.refresh(), // Оновлення при виході з пінінгу
      },
    });

    const path = document.querySelector('[data-about-img-path-mob]');
    const defaultState = path.getAttribute('d');
    // const activeState = 'M 1921 0 H 0 V 970 H 1921 V 0 Z M -1 487 C -12 1024 -70 971 967 971 C 2021 968 1917 1048 1917 481 C 1920 -93 2021 -1 960 -1 C -109 3 0 -93 -1 487 Z';
    const activeState =
      'M 375 0 H 0 V 635 H 375 V 0 Z M 192 733 C 431 732 483 483 484 330 C 483 151 414 -95 192 -95 C -37 -95 -118 152 -118 331 C -117 486 -42 733 192 733 Z';
    const percentOfCircleOpeningAnimation = 0.5;
    aboutImgMob
      .fromTo(
        path,
        {
          attr: {
            d: defaultState,
          },
        },
        {
          attr: {
            d: activeState,
          },
          duration: percentOfCircleOpeningAnimation,
          ease: 'none',
        },
      )
      .fromTo(
        '.about-img',
        {
          scale: 1,
          // duration: 0.4,
          transformOrigin: 'center',
        },
        {
          scale: 1.2,
        },
        '<',
      );
  }
}
aboutAnim();

// const heroImgTl = gsap.timeline({
//   scrollTrigger: {
//     trigger: '.property-hero__img-descr-wrap',
//     start: 'top center', // when the top of the trigger hits the top of the viewport
//     end: 'center top', // end after scrolling 500px beyond the start
//     // smooth scrubbing, takes 1 second to "catch up" to the
//     scrub: 1,
//     // markers: true,
//   },
// });
// heroImgTl
//   .fromTo(
//     '.property-hero__img-descr-wrap img',
//     {
//       ease: 'none',
//       yPercent: 0,
//     },
//     {
//       yPercent: -20,
//       ease: 'none',
//     },
//   )
//   .fromTo(
//     '.page-hero-descr',
//     {
//       yPercent: 0,
//     },
//     {
//       yPercent: -20,
//     },
//     '<',
//   );

const fillerText1Tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.property-filler .property-filler__img-wrap ',
    start: 'top bottom', // when the top of the trigger hits the top of the viewport
    end: 'center top', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    scrub: 1,
    // markers: true,
  },
});
fillerText1Tl
  .fromTo(
    '.property-filler__text-block',
    {
      ease: 'none',

      yPercent: 20,
    },
    {
      yPercent: 0,
      ease: 'none',
    },
  )
  .fromTo(
    '.property-filler__text-block-2',
    {
      ease: 'none',

      yPercent: 20,
    },
    {
      yPercent: 0,
      ease: 'none',
    },
    '<+=0.2',
  );

const fillerText1FirstTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.property-filler__text-block',
    start: 'top bottom', // when the top of the trigger hits the top of the viewport
    end: 'center top', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    // scrub: 1,
    // markers: true,
  },
});
fillerText1FirstTl.fromTo(
  '.property-filler__text-block',
  {
    autoAlpha: 0,
    xPercent: 20,
  },
  {
    xPercent: 0,

    autoAlpha: 1,
    duration: 1,
  },
);

const fillerText1SecondtTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.property-filler__text-block-2 ',
    start: 'top bottom', // when the top of the trigger hits the top of the viewport
    end: 'center top', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    // scrub: 1,
    // markers: true,
  },
});
fillerText1SecondtTl.fromTo(
  '.property-filler__text-block-2',
  {
    autoAlpha: 0,
    xPercent: -20,
  },
  {
    xPercent: 0,

    autoAlpha: 1,
    duration: 1,
  },
);

function instaIndicator() {
  if (navigator.userAgent.includes('Instagram') && device.iphone()) {
    let screenHeight = screen.height;

    document.querySelector('.about').setAttribute('style', 'height:' + screenHeight * 1.5 + 'px');
    document
      .querySelector('.about__anim-svg-mob')
      .setAttribute('style', 'height:' + screenHeight + 'px');
    document.querySelector('.about-wrap').setAttribute('style', 'height:' + screenHeight + 'px');
    document.querySelector('.about-img').setAttribute('style', 'height:' + screenHeight + 'px');
  }
}

instaIndicator();

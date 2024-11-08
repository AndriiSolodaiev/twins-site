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

const heroImgTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.property-hero__img-descr-wrap',
    start: 'top center', // when the top of the trigger hits the top of the viewport
    end: 'center top', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    scrub: 1,
    // markers: true,
  },
});
heroImgTl
  .fromTo(
    '.property-hero__img-descr-wrap img',
    {
      ease: 'none',
      yPercent: 0,
    },
    {
      yPercent: -20,
      ease: 'none',
    },
  )
  .fromTo(
    '.page-hero-descr',
    {
      yPercent: 0,
    },
    {
      yPercent: -20,
    },
    '<',
  );

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

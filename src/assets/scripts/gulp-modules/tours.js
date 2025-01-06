import { gsap, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

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
      '.page-hero > .tours-section > *',
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

const tourTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.tours-hero .about__title-wrap',
    start: 'top top+=160px', // when the top of the trigger hits the top of the viewport
    end: 'bottom top', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    scrub: 1,
    // markers: true,
  },
});
tourTl
  .fromTo(
    '.tours-title',
    {
      ease: 'none',
      xPercent: 0,
    },
    {
      xPercent: -100,
      ease: 'none',
    },
  )
  .fromTo(
    '.lamp-img-wrap',
    {
      yPercent: -20,
    },
    {
      yPercent: 20,
    },
    '<',
  );

const filterBtnFirst = document.querySelector('[data-tour]');
const filterBtn = document.querySelectorAll('[data-tour]');
const tourIframe = document.querySelector('.tour-iframe');
const tourTitle = document.querySelector('.tour__text-wrap h3 span');
const tourDescr = document.querySelector('.tour__text-wrap p');
const flatLink = document.querySelector('.tour__text-wrap .general-btn');

filterBtn.forEach(item => item.classList.remove('active'));
filterBtnFirst.classList.add('active');
tourIframe.src = filterBtnFirst.dataset.src;
textChange(tourTitle, filterBtnFirst.dataset.tour);
textChange(tourDescr, filterBtnFirst.dataset.descr);
textChange(flatLink, filterBtnFirst.dataset.link);

filterBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!btn.classList.contains('active')) {
      filterBtn.forEach(item => item.classList.remove('active'));
      btn.classList.add('active');
      tourIframe.src = btn.dataset.src;
      textChange(tourTitle, btn.dataset.tour);
      textChange(tourDescr, btn.dataset.descr);
      textChange(flatLink, btn.dataset.link);
      textChange('.tour__text-wrap .general-btn');
    }
  });
});

function textChange(selector, newText) {
  gsap
    .timeline()
    .to(selector, { opacity: 0, yPercent: 20, duration: 0.3 })
    .add(() => {
      if (!newText) return;

      if (newText.includes('http')) {
        selector.href = newText;
      } else {
        selector.textContent = newText;
      }
    })
    .to(selector, { opacity: 1, yPercent: 0, duration: 0.3 });
}

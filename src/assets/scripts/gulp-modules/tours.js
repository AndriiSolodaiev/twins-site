import { gsap, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);
const tourTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.tours-title',
    start: 'top center', // when the top of the trigger hits the top of the viewport
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
      xPercent: 50,
    },
    {
      xPercent: -50,
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

filterBtn.forEach(item => item.classList.remove('active'));
filterBtnFirst.classList.add('active');
tourIframe.src = filterBtnFirst.dataset.src;
textChange(tourTitle, filterBtnFirst.dataset.tour);
textChange(tourDescr, filterBtnFirst.dataset.descr);

filterBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!btn.classList.contains('active')) {
      filterBtn.forEach(item => item.classList.remove('active'));
      btn.classList.add('active');
      tourIframe.src = btn.dataset.src;
      textChange(tourTitle, btn.dataset.tour);
      textChange(tourDescr, btn.dataset.descr);
    }
  });
});

function textChange(selector, newText) {
  gsap
    .timeline()
    .to(selector, { opacity: 0, yPercent: 20, duration: 0.3 })
    .add(() => {
      selector.textContent = newText;
    })
    .to(selector, { opacity: 1, yPercent: 0, duration: 0.3 });
}
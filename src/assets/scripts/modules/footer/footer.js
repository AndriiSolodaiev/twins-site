// import '../form';
// import 'intl-tel-input/build/css/intlTelInput.css';
// import intlTelInput from 'intl-tel-input';

// const input = document.querySelector('#phone');
// intlTelInput(input, {
//   utilsScript: 'path/to/utils.js',
// });

import { initSmoothScrolling } from '../scroll/leniscroll';
import { contactFormFooter } from './contactFormFooter';
import { gsap, ScrollTrigger } from 'gsap/all';

initSmoothScrolling();

// document.querySelector('.up-btn-wrap').addEventListener('click', () => {
//   window.scrollTo({
//     top: 0,
//     behavior: 'smooth',
//   });
// });
const footer = document.querySelector('footer');
gsap.registerPlugin(ScrollTrigger);
const initFooter = () => {
  const createFormValidRef = document.querySelectorAll('[contact-form-js]');
  createFormValidRef.forEach(el => {
    contactFormFooter(el);
  });
};

if (footer) {
  initFooter();
}
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
    xPercent: 25,
  },
  {
    xPercent: -50,
    ease: 'none',
  },
);

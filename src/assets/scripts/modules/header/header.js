import '../../loader';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import device from 'current-device';
if (device.iphone()) {
  document.querySelector('html').style.overscrollBehavior = 'none';
}

const header = document.querySelector('.header-bg');

window.addEventListener('scroll', function headerSquosh() {
  const scrollPosition = window.scrollY;
  if (scrollPosition > 20) {
    header.classList.add('scroll-down');
  } else {
    header.classList.remove('scroll-down');
  }
});

document.body.addEventListener('click', function(evt) {
  const close = evt.target.closest('[data-call-us-modal-close]');
  const form = evt.target.closest('[data-call-us-modal]');
  const btn = evt.target.closest('[data-call-us-btn]');
  const overflow = document.querySelector('[data-call-us__overflow]');

  const countryList = evt.target.closest('.iti__country-list');

  const btnUp = evt.target.closest('[data-btn-up]');

  const btnMenuTarget = evt.target.closest('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');
  if (btnMenuTarget) {
    menu.classList.toggle('hidden');
    header.classList.toggle('menu-is-open');
    menuAnimation();
    return;
  }
  // if (btnUp) {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // }
  if (btn) {
    if (overflow.classList.contains('hidden')) {
      window.dispatchEvent(new Event('stop-scroll'));
      return overflow.classList.remove('hidden');
    }
    return;
  }
  if (close) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflow.classList.add('hidden');
  }
  if (evt.target === overflow) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflow.classList.add('hidden');
  }
});

function menuAnimation() {
  const menuIsOpen = document.querySelector('.header-bg').classList.contains('menu-is-open');
  const tl = gsap.timeline();
  if (window.innerWidth > 1365) {
    if (menuIsOpen) {
      // Forward animation when menuIsOpen is true
      tl.fromTo(
        '.menu-item',
        { opacity: 0, xPercent: -50, delay: 0.3 },
        { opacity: 1, xPercent: 0, stagger: 0.1, duration: 0.8, delay: 0.3 },
      )
        .fromTo(
          '.menu-block:first-child',
          { opacity: 0, yPercent: 40 },
          { opacity: 1, yPercent: 0, stagger: -0.2, duration: 0.8 },
          '<',
        )
        .fromTo(
          '.menu-img__wrap.house img',
          { opacity: 0, scale: 1.5, duration: 0.8 },
          { opacity: 1, duration: 0.8, scale: 1 },
          '<',
        )
        .fromTo(
          '.menu-block:last-child',
          { opacity: 0, yPercent: -40 },
          { opacity: 1, yPercent: 0, stagger: 0.2, duration: 0.8 },
          '<',
        )
        .fromTo(
          '.menu-img__wrap.girl img',
          { opacity: 0, yPercent: 30, duration: 0.8 },
          { opacity: 1, yPercent: 0, duration: 0.8 },
          '<',
        )
        .fromTo(
          '.menu-contact-block ',
          { opacity: 0, yPercent: 80 },
          { opacity: 1, yPercent: 0, stagger: 0.2, duration: 0.8 },
          '<+=0.2',
        );
    } else {
      // Reverse animation when menuIsOpen is false
      tl.fromTo(
        ' .menu-item',
        { opacity: 1, xPercent: 0 },
        { opacity: 0, xPercent: -50, stagger: 0.1, duration: 0.4 },
      )
        .fromTo(
          '.menu-block:first-child',

          { opacity: 1, yPercent: 0, stagger: -0.2, duration: 0.8 },
          { opacity: 0, yPercent: 40 },
          '<',
        )
        .fromTo(
          '.menu-block:last-child',

          { opacity: 1, yPercent: 0, stagger: 0.2, duration: 0.8 },
          { opacity: 0, yPercent: -40 },
          '<',
        )
        .fromTo(
          '.menu-contact-block ',

          { opacity: 1, yPercent: 0, stagger: 0.2, duration: 0.8 },
          { opacity: 0, yPercent: 80 },
          '<',
        );
    }
  } else {
    if (menuIsOpen) {
      // Forward animation when menuIsOpen is true
      tl.fromTo(
        '.left-block .menu-item',
        { opacity: 0, yPercent: 20, delay: 0.3 },
        { opacity: 1, yPercent: 0, stagger: 0.1, duration: 0.4, delay: 0.3 },
      )

        .fromTo(
          '.right-block .menu-item',
          { opacity: 0, yPercent: 20 },
          { opacity: 1, yPercent: 0, stagger: 0.1, duration: 0.4 },
          '<+=0.3',
        )
        .fromTo(
          '.menu-block:first-child',
          { opacity: 0, yPercent: 20 },
          { opacity: 1, yPercent: 0, stagger: 0.2, duration: 0.4 },
          '<+=0.6',
        )
        .fromTo(
          '.menu-img__wrap.house',
          { opacity: 0, xPercent: 30 },
          { opacity: 1, xPercent: 0, duration: 0.8 },
          '<+=0.2',
        )
        .fromTo(
          '.menu-block:last-child',
          { opacity: 0, yPercent: 20 },
          { opacity: 1, yPercent: 0, stagger: 0.2, duration: 0.4 },
          '<',
        )
        .fromTo(
          '.menu-img__wrap.girl',
          { opacity: 0, xPercent: -30 },
          { opacity: 1, xPercent: 0, duration: 0.8 },
          '<+=0.2',
        )
        .fromTo(
          '.menu-contact-block ',
          { opacity: 0, yPercent: 80 },
          { opacity: 1, yPercent: 0, stagger: 0.2, duration: 0.4 },
          '<',
        );
    } else {
      // Reverse animation when menuIsOpen is false
      tl.fromTo(
        '.left-block .menu-item',

        { opacity: 1, yPercent: 0, stagger: 0.1, duration: 0.4, delay: 0.3 },
        { opacity: 0, yPercent: 20, delay: 0.3 },
      ).fromTo(
        '.right-block .menu-item',

        { opacity: 1, yPercent: 0, stagger: 0.1, duration: 0.4 },
        { opacity: 0, yPercent: 20 },
        '<+=0.3',
      );
    }
  }
}
//iframe modal
const iframePopUp = document.querySelector('[data-iframe-modal]');
const iframeOpen = document.querySelector('[data-iframe-open]');
const iframeClose = document.querySelector('[data-iframe-close]');
const iframeDayBtn = document.querySelectorAll('[data-day]');
const iframeWindow = document.querySelector('.iframe-window');
const iframeWindowStatic = document.querySelector('.iframe-window.static');
if (iframeOpen) {
  iframeOpen.addEventListener('click', function() {
    window.dispatchEvent(new Event('stop-scroll'));
    iframePopUp.classList.add('oppened');
    iframeWindow.src = 'https://apartment-tours.smartorange.com.ua/twins-day-floors/?scene=5';
  });
}

if (iframeClose) {
  iframeClose.addEventListener('click', function() {
    window.dispatchEvent(new Event('start-scroll'));
    console.log('close');
    iframePopUp.classList.remove('oppened');
    iframeWindow.src = '';
  });
}

if (iframeDayBtn[0]) {
  iframeDayBtn.forEach(btn =>
    btn.addEventListener('click', function() {
      iframeDayBtn.forEach(btn => btn.classList.remove('active'));
      btn.classList.add('active');
      if (btn.dataset.day == 'day') {
        iframeWindowStatic.src =
          'https://apartment-tours.smartorange.com.ua/twins-day-floors/?scene=5';
        iframeWindow.src = 'https://apartment-tours.smartorange.com.ua/twins-day-floors/?scene=5';
      }
      if (btn.dataset.day == 'night') {
        iframeWindowStatic.src =
          'https://apartment-tours.smartorange.com.ua/twins-night-floors/?scene=2';
        iframeWindow.src = 'https://apartment-tours.smartorange.com.ua/twins-night-floors/?scene=2';
      }
      if (btn.dataset.day == 'sunset') {
        iframeWindowStatic.src =
          'https://apartment-tours.smartorange.com.ua/twins-sunset-floors/?scene=5';
        iframeWindow.src =
          'https://apartment-tours.smartorange.com.ua/twins-sunset-floors/?scene=5';
      }
    }),
  );
}

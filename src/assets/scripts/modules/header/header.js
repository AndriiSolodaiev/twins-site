import '../../loader';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
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

//iframe modal
const iframePopUp = document.querySelector('[data-iframe-modal]');
const iframeOpen = document.querySelector('[data-iframe-open]');
const iframeClose = document.querySelector('[data-iframe-close]');
const iframeDayBtn = document.querySelectorAll('[data-day]');
const iframeWindow = document.querySelector('.iframe-window');
if (iframeOpen) {
  iframeOpen.addEventListener('click', function() {
    iframePopUp.classList.add('oppened');
    iframeWindow.src = 'https://apartment-tours.smartorange.com.ua/twins-day-floors/?scene=5';
  });
}

if (iframeClose) {
  iframeClose.addEventListener('click', function() {
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
        iframeWindow.src = 'https://apartment-tours.smartorange.com.ua/twins-day-floors/?scene=5';
      }
      if (btn.dataset.day == 'night') {
        iframeWindow.src = 'https://apartment-tours.smartorange.com.ua/twins-night-floors/?scene=2';
      }
      if (btn.dataset.day == 'sunset') {
        iframeWindow.src =
          'https://apartment-tours.smartorange.com.ua/twins-sunset-floors/?scene=5';
      }
    }),
  );
}

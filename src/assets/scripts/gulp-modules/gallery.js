import $ from 'jquery';
import 'slick-carousel';
import Swiper from 'swiper';
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
      '.page-hero > .gallery > *',
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

const aboutTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.page-hero .about__title-wrap',
    start: 'top top+=160px', // when the top of the trigger hits the top of the viewport
    end: 'bottom top', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    scrub: 1,
    // markers: true,
  },
});
aboutTl.fromTo(
  '.gallery-title',
  {
    ease: 'none',
    xPercent: 0,
  },
  {
    xPercent: -50,
    ease: 'none',
  },
);

let $slider = $('.slideshow .slider');
let maxItems = $('.item', $slider).length;
let dragging = false;
let tracking;
let rightTracking;

let $sliderRight = $('.slideshow')
  .clone()
  .addClass('slideshow-right')
  .appendTo($('.split-slideshow'));

let rightItems = $('.item', $sliderRight).toArray();
let reverseItems = rightItems.reverse();
$('.slider', $sliderRight).html('');
for (let i = 0; i < maxItems; i++) {
  $(reverseItems[i]).appendTo($('.slider', $sliderRight));
}

$slider.addClass('slideshow-left');
$('.slideshow-left')
  .slick({
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    infinite: true,
    dots: true,
    speed: 1000,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
  })
  .on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    if (currentSlide > nextSlide && nextSlide == 0 && currentSlide == maxItems - 1) {
      $('.slideshow-right .slider').slick('slickGoTo', -1);
      $('.slideshow-text').slick('slickGoTo', maxItems);
    } else if (currentSlide < nextSlide && currentSlide == 0 && nextSlide == maxItems - 1) {
      $('.slideshow-right .slider').slick('slickGoTo', maxItems);
      $('.slideshow-text').slick('slickGoTo', -1);
    } else {
      $('.slideshow-right .slider').slick('slickGoTo', maxItems - 1 - nextSlide);
      $('.slideshow-text').slick('slickGoTo', nextSlide);
    }
  })
  .on('mousewheel', function(event) {
    event.preventDefault();
    if (event.deltaX > 0 || event.deltaY < 0) {
      $(this).slick('slickNext');
    } else if (event.deltaX < 0 || event.deltaY > 0) {
      $(this).slick('slickPrev');
    }
  })
  .on('mousedown touchstart', function() {
    dragging = true;
    tracking = $('.slick-track', $slider).css('transform');
    tracking = parseInt(tracking.split(',')[5]);
    rightTracking = $('.slideshow-right .slick-track').css('transform');
    rightTracking = parseInt(rightTracking.split(',')[5]);
  })
  .on('mousemove touchmove', function() {
    if (dragging) {
      let newTracking = $('.slideshow-left .slick-track').css('transform');
      newTracking = parseInt(newTracking.split(',')[5]);
      let diffTracking = newTracking - tracking;
      $('.slideshow-right .slick-track').css({
        transform: 'matrix(1, 0, 0, 1, 0, ' + (rightTracking - diffTracking) + ')',
      });
    }
  })
  .on('mouseleave touchend mouseup', function() {
    dragging = false;
  });

$('.slideshow-right .slider').slick({
  swipe: false,
  vertical: true,
  arrows: false,
  infinite: true,
  speed: 950,
  cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
  initialSlide: maxItems - 1,
});

$('.slick-arrow-up').on('click', function() {
  $('.slideshow-left').slick('slickPrev');
});
$('.slick-arrow-down').on('click', function() {
  $('.slideshow-left').slick('slickNext');
});
// $('.slideshow-text').slick({
//   swipe: false,
//   vertical: true,
//   arrows: false,
//   infinite: true,
//   speed: 900,
//   cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
// });
// setTimeout(() => {
//   document.querySelectorAll('.slick-dots').textContent = '';
// }, 0);

function instaIndicator() {
  if (navigator.userAgent.includes('Instagram') && device.iphone()) {
    let screenHeight = screen.height;

    document
      .querySelector('.split-slideshow ')
      .setAttribute('style', 'height:' + screenHeight + 'px');
    document.querySelector('.slideshow ').setAttribute('style', 'height:' + screenHeight + 'px');

    document
      .querySelectorAll('.slider .item')
      .forEach(item => item.setAttribute('style', 'height:' + screenHeight + 'px'));
  }
}

instaIndicator();

async function imgRendering() {
  // Перевіряємо чи це localhost
  const isLocalhost =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.includes('localhost');

  if (isLocalhost) {
    // Повертаємо статичні дані для localhost
    return [
      {
        type: 'complex',
        type_gallery: 'gallery',
        gallery: [
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/0001.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/0002.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/0003.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/0004.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/0005.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/0006.webp' },
        ],
        img: false,
      },
      {
        type: 'entrance',
        type_gallery: 'gallery',
        gallery: [
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/1-9.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/2-10.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/3-9.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/4-8.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/7-8.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/8-6.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/9-6.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/10-5.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/11-3.webp' },
        ],
        img: false,
      },
      {
        type: 'park',
        type_gallery: 'gallery',
        gallery: [
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/6-3.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/8-1.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/1-3.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/7-1.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/9-1.webp' },
        ],
        img: false,
      },
      {
        type: 'flats-first',
        type_gallery: 'secret',
        gallery: [{ img: 'https://montblan.dp.ua/wp-content/uploads/2023/06/7.png' }],
        img: 'https://montblan.dp.ua/wp-content/uploads/2023/06/1-3.png',
      },
      {
        type: 'flats-second',
        type_gallery: 'secret',
        gallery: [
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/Garderobna.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/Kabinet.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/Kabinet-2-Vitalnya.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/Kuhnya.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/Spalnya.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/Stolova.webp' },
          { img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/Vanna.webp' },
        ],
        img: 'https://montblan.dp.ua/wp-content/uploads/2023/07/Planirovka-1.webp',
      },
    ];
  } else {
    // Відправляємо реальний AJAX запит для production
    const sendData = new FormData();
    sendData.append('action', 'gallery');

    try {
      let response = await fetch('/wp-admin/admin-ajax.php', {
        method: 'POST',
        body: sendData,
      });

      if (response.ok) {
        let data = await response.json();
        return data;
      } else {
        console.error('AJAX request failed');
        return null;
      }
    } catch (error) {
      console.error('AJAX request failed:', error);
      return null;
    }
  }
}

window.addEventListener('DOMContentLoaded', async function() {
  function sideSwitchArrow(swiper, arrowArgs, conArgs) {
    const arrow = arrowArgs;
    const container = conArgs;
    console.log(arrow);
    console.log(container);
    const mediumCordValue = document.documentElement.clientWidth / 2;
    document.body.append(arrow);
    container.style.cursor = 'none';
    arrow.style.cursor = 'none';
    arrow.style.zIndex = 10;
    arrow.__proto__.hide = function some() {
      this.style.opacity = '0';
      this.style.pointerEvents = 'none';
    };
    arrow.__proto__.show = function some() {
      this.style.opacity = '1';
    };
    arrow.dataset.side = 'leftSide';
    arrow.hide();
    container.addEventListener('mousemove', desktopNavButtonHandler);
    container.addEventListener('mouseenter', () => {
      arrow.show();
    });
    container.addEventListener('mouseleave', () => {
      arrow.hide();
    });
    if (document.documentElement.clientWidth < 1024) {
      window.removeEventListener('mousemove', desktopNavButtonHandler);
      arrow.remove();
    }

    function desktopNavButtonHandler(evt) {
      arrow.style.left = `${evt.clientX - 18}px`;
      arrow.style.top = `${evt.clientY - 18}px`;
      getCursorSide(evt.clientX);
    }

    function getCursorSide(x) {
      if (x < mediumCordValue) {
        arrow.classList.add('left-side');
        arrow.dataset.side = 'leftSide';
      } else {
        arrow.classList.remove('left-side');
        arrow.dataset.side = 'rightSide';
      }
    }
    container.addEventListener('click', () => {
      switchGallerySlide(arrow.dataset.side);
    });

    const navigate = {
      leftSide: () => {
        if (swiper.isBeginning) return; // Перевірка, чи це перший слайд
        swiper.slidePrev();
      },
      rightSide: () => {
        if (swiper.isEnd) return; // Перевірка, чи це останній слайд
        swiper.slideNext();
      },
    };

    function switchGallerySlide(side) {
      if (side === 'leftSide' && swiper.isBeginning) {
        // Якщо це перший слайд і користувач хоче перейти з першого на останній
        swiper.slideTo(swiper.slides.length - 1); // Перехід на останній слайд
      } else if (side === 'rightSide' && swiper.isEnd) {
        // Якщо це останній слайд і користувач хоче перейти з останнього на перший
        swiper.slideTo(0); // Перехід на перший слайд
      } else {
        // В інших випадках виконуємо звичайні дії
        navigate[side]();
      }
    }
  }

  const slider = new Swiper('.gallery-section-1-swiper', {
    loop: false,
    pagination: {
      el: '.gallery-section-1-swiper-pagination-mobile',
      clickable: true,
    },
    preloadImages: false,
    lazy: {
      loadPrevNext: true,
      loadOnTransitionStart: true,
    },
    speed: 400,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
  });

  const currentSlideShow = [document.querySelector('[data-first-digit]')];

  if (currentSlideShow[0]) {
    currentSlideShow[0].textContent = (slider.activeIndex || 0) + 1;
  }

  const totalElement = document.querySelector('[data-total]');
  if (totalElement) {
    totalElement.textContent = document.querySelectorAll(
      '.gallery-section-1-swiper .swiper-slide',
    ).length;
  }

  slider.on('slideChange', function() {
    if (currentSlideShow[0]) {
      const activeIndex = this.activeIndex || 0;
      const splitedIndex = (activeIndex + 1).toString().split('');
      const firstDigit = splitedIndex.join('');

      if (typeof gsap !== 'undefined') {
        gsap
          .timeline()
          .fromTo(currentSlideShow[0], { yPercent: 0 }, { yPercent: 100 })
          .add(() => {
            currentSlideShow[0].textContent = firstDigit;
          })
          .fromTo(currentSlideShow[0], { yPercent: -100 }, { yPercent: 0 });
      } else {
        currentSlideShow[0].textContent = firstDigit;
      }
    }
  });

  const arrowElement = document.querySelector('.moving-arrow');
  const swiperElement = document.querySelector('.gallery-section-1-swiper');

  if (arrowElement && swiperElement) {
    sideSwitchArrow(slider, arrowElement, swiperElement);
  }

  const buttons = document.querySelectorAll('button[data-view]');
  const flatsButton = document.querySelector('.flats-btn');

  if (flatsButton) {
    flatsButton.addEventListener('click', () => {
      flatsButton.classList.add('active');

      buttons.forEach(button => {
        if (!button.classList.contains('flats-btn-btn')) {
          button.classList.remove('active');
        }
      });
    });
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const view = button.dataset.view;
      initializeSliderWithImages(view, slider);

      if (flatsButton) {
        flatsButton.classList.remove('active');
      }

      button.classList.add('active');
    });
  });

  const popup = document.querySelector('.gallery-popup');
  const popupImage = document.querySelector('.gallery-popup-image');
  const closeButton = document.querySelector('.gallery-popup-close');

  const galleryData = await imgRendering();

  if (!galleryData) {
    console.error('Failed to load gallery data');
    return;
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const view = button.dataset.view;
      const galleryItem = galleryData.find(item => item.type === view);

      // Перевіряємо чи це "secret" тип галереї
      if (galleryItem && galleryItem.type_gallery === 'secret') {
        showPopup(view, galleryData);
      } else {
        hidePopup();
      }
    });
  });

  function showPopup(view, galleryData) {
    if (!popup || !popupImage) return;

    let imageUrl = '';

    const galleryItem = galleryData.find(item => item.type === view);
    if (galleryItem && galleryItem.img && galleryItem.img !== false) {
      imageUrl = galleryItem.img;
    }

    popupImage.src = imageUrl;
    popup.classList.add('active');

    popupImage.addEventListener('click', () => {
      popup.classList.add('open');
    });
  }

  if (closeButton) {
    closeButton.addEventListener('click', () => {
      if (popup) {
        popup.classList.remove('open');
      }
    });
  }

  function hidePopup() {
    if (popup) {
      popup.classList.remove('active');
    }
  }

  async function initializeSliderWithImages(view, slider) {
    buttons.forEach(button => button.classList.remove('active'));

    const currentButton = document.querySelector(`button[data-view="${view}"]`);
    if (currentButton) currentButton.classList.add('active');

    if (!slider.wrapperEl) return;
    slider.wrapperEl.innerHTML = ''; // очищаємо слайдер

    const galleryData = await imgRendering();
    if (!galleryData) {
      console.error('Failed to load gallery data');
      return;
    }

    // Знаходимо галерею за типом
    const galleryItem = galleryData.find(item => item.type === view);
    if (!galleryItem) return;

    let slides = [];

    if (galleryItem.type_gallery === 'gallery' && galleryItem.gallery) {
      // Якщо звичайна галерея, беремо всі елементи gallery
      slides = galleryItem.gallery.map(
        item => `
      <div class="swiper-slide">
        <img class="swiper-slide_front swiper-lazy" src="${item.img}"  alt="">
        <img class="swiper-slide_back swiper-lazy" src="${item.img}"  alt="">
        <div class="swiper-lazy-preloader"></div>
      </div>
    `,
      );
    } else if (galleryItem.type_gallery === 'secret') {
      // Для secret типу беремо спершу gallery, а потім основне img
      if (galleryItem.gallery) {
        slides = galleryItem.gallery.map(
          item => `
        <div class="swiper-slide">
          <img class="swiper-slide_front swiper-lazy" src="${item.img}"  alt="">
          <img class="swiper-slide_back swiper-lazy" src="${item.img}"  alt="">
          <div class="swiper-lazy-preloader"></div>
        </div>
      `,
        );
      }
      // додаємо основне img в кінець слайдів, якщо воно є
      if (galleryItem.img) {
        slides.push(`
        <div class="swiper-slide">
          <img class="swiper-slide_front swiper-lazy" src="${galleryItem.img}"  alt="">
          <img class="swiper-slide_back swiper-lazy" src="${galleryItem.img}"  alt="">
          <div class="swiper-lazy-preloader"></div>
        </div>
      `);
      }
    }

    slider.wrapperEl.innerHTML = slides.join('');
    slider.update();
    slider.slideTo(0, 0); // миттєво на перший слайд

    // Оновлюємо лічильники
    if (currentSlideShow[0]) currentSlideShow[0].textContent = 1;
    const totalElement = document.querySelector('[data-total]');
    if (totalElement) totalElement.textContent = slides.length;
  }

  // Ініціалізуємо з 'complex' за замовчуванням
  initializeSliderWithImages('complex', slider);
});

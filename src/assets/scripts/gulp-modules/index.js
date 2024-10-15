import Swiper, {
  Autoplay,
  Navigation,
  Pagination,
  EffectCreative,
  Thumbs,
  Controller,
} from 'swiper';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import { initSmoothScrolling } from '../modules/scroll/leniscroll';
import googleMap from '../modules/map/map';
import device from 'current-device';
googleMap();
initSmoothScrolling();
gsap.registerPlugin(ScrollTrigger, CustomEase);

function initSwiperHero() {
  const swiperHero = new Swiper('.swiper-hero', {
    modules: [Autoplay, Pagination, EffectCreative],
    speed: 1500,
    effect: 'creative',
    loop: true,
    delay: 2000,
    autoplay: {
      delay: 2000,
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
  setTimeout(() => swiperHero.autoplay.start(), 1000);

  // const swiperHeroPc = new Swiper('.swiper-hero-pc', {
  //   modules: [Autoplay, Pagination, Navigation, Controller],
  //   speed: 1500,
  //   slidesPerView: 1,
  //   loop: true,
  //   // delay: 2000,
  //   spaceBetween: 20,
  //   autoplay: {
  //     delay: 2000,
  //     disableOnInteraction: false,
  //   },
  // });
  const ANIMATION_DURATION = 0.5;
  const swiperHeroPcThumb = new Swiper('.swiper-hero-pc--thumb', {
    modules: [Autoplay, Pagination, Navigation, Thumbs, Controller],
    slidesPerView: 3.5,
    speed: ANIMATION_DURATION * 1000,
    initialSlide: 1,
    loop: true,
    spaceBetween: 20,
    on: {
      init: (swiper) => {
        const imageLeft = document.querySelector('[data-prev-container]');
        const prevPrevImage = swiper.slides[0].querySelector('img');
        const prevPrevcopied = prevPrevImage.cloneNode(true);
        imageLeft.innerHTML = '';
        imageLeft.insertAdjacentElement('afterbegin', prevPrevcopied);
      }
    },
    pagination: {
      el: '.swiper-pagination-pc',
      clickable: true,
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  swiperHeroPcThumb.on('slideNextTransitionStart', function(swiper) {
    const impossibleSlider = document.querySelector('[data-impossible-slider]');
    const impossibleSliderContainer = impossibleSlider.closest('.swiper-hero-pc');
    const containerWidth = impossibleSliderContainer.getBoundingClientRect().width;
    const imageLeft = document.querySelector('[data-prev-container]');
    const imageRight = document.querySelector('[data-next-container]');
    const prevImage = swiper.slides[swiper.previousIndex].querySelector('img');
    const prevPrevImage = swiper.slides[swiper.previousIndex - 1]
      ? swiper.slides[swiper.previousIndex - 1].querySelector('img')
      : swiper.slides[swiper.slides.length - 1].querySelector('img');
    const copied = prevImage.cloneNode(true);
    const prevPrevcopied = prevPrevImage.cloneNode(true);
    imageLeft.innerHTML = '';
    imageLeft.insertAdjacentElement('afterbegin', prevPrevcopied);
    imageRight.innerHTML = '';
    imageRight.insertAdjacentElement('afterbegin', copied);

    gsap
      .timeline({
        defaults: {
          ease: 'none',
        },
      })
      .set(impossibleSlider, {
        x: 0,
      })
      .set(imageRight, {
        scaleX: scaleLargeImageToSmall(prevImage, imageRight).scaleX,
        scaleY: scaleLargeImageToSmall(prevImage, imageRight).scaleY,
        y: 80,
        transformOrigin: 'top right',
      })
      .fromTo(
        impossibleSlider,
        {
          x: 0,
        },
        {
          x: containerWidth * -1,
          duration: ANIMATION_DURATION,
        },
        
      )
      .fromTo(
        '.swiper-hero-pc--thumb .swiper-slide-prev img',
        {
          opacity: 1,
        },
        {
          opacity: 0,
          clearProps: 'all',
          duration: ANIMATION_DURATION * 0.75,
          transformOrigin: 'top right',
        },
        '<',
      )

      .fromTo(
        imageRight,
        {
          scaleX: scaleLargeImageToSmall(prevImage, imageRight).scaleX,
          scaleY: scaleLargeImageToSmall(prevImage, imageRight).scaleY,
          y: 80,
          filter: 'grayscale(100%)',
        },
        {
          scaleX: 1,
          scaleY: 1,
          y: 0,
          duration: ANIMATION_DURATION*0.75,
          ease: 'power1.out',
          filter: 'grayscale(0)',
          transformOrigin: 'top right',
          clearProps: 'all',
        },
        '>30%',
      )
    // .fromTo()
  });
  swiperHeroPcThumb.on('slidePrevTransitionStart', function(swiper) {
    const impossibleSlider = document.querySelector('[data-impossible-slider]');
    const impossibleSliderContainer = impossibleSlider.closest('.swiper-hero-pc');
    const containerWidth = impossibleSliderContainer.getBoundingClientRect().width;
    const imageLeft = document.querySelector('[data-prev-container]');
    const imageRight = document.querySelector('[data-next-container]');
    const prevImage = swiper.slides[swiper.previousIndex - 1].querySelector('img');
    const prevPrevImage = swiper.slides[swiper.previousIndex - 2]
      ? swiper.slides[swiper.previousIndex - 2].querySelector('img')
      : swiper.slides[0].querySelector('img');
    const copied = prevImage.cloneNode(true);
    const prevPrevcopied = prevPrevImage.cloneNode(true);
    imageLeft.innerHTML = '';
    imageLeft.insertAdjacentElement('afterbegin', prevPrevcopied);
    imageRight.innerHTML = '';
    imageRight.insertAdjacentElement('afterbegin', copied);

    gsap
      .timeline({
        defaults: {
          ease: 'none',
        },
      })
      .set(impossibleSlider, {
        x: containerWidth * -1,
      })
      .fromTo(
        imageRight,
        {
          scaleX: 1,
          scaleY: 1,
          y: 0,
          filter: 'grayscale(0)',
        },
        {
          scaleX: scaleLargeImageToSmall(prevImage, imageRight).scaleX,
          scaleY: scaleLargeImageToSmall(prevImage, imageRight).scaleY,
          filter: 'grayscale(100%)',
          y: 80,
          duration: ANIMATION_DURATION,
          ease: 'power2.out',
          transformOrigin: 'top right',
        },
      )
      .fromTo(
        impossibleSlider,
        {
          x:  containerWidth * -1,
        },
        {
          x: 0,
          duration: ANIMATION_DURATION,
          ease: 'power2.out',
        },
        '<50%'
      )
      .fromTo(
        '.swiper-hero-pc--thumb .swiper-slide-active img',
        {
          opacity: 0,
        },
        {
          opacity: 1,
          clearProps: 'all',
          duration: ANIMATION_DURATION,
          transformOrigin: 'top right',
        },
        '<',
      );
  });



  // swiperHeroPcThumb.controller.control = swiperHeroPc;
  // swiperHeroPc.controller.control = swiperHeroPcThumb;
}

function scaleLargeImageToSmall(smallImage, largeImage) {

  // Отримуємо видимі розміри малого зображення
  const smallWidth = smallImage.offsetWidth;
  const smallHeight = smallImage.offsetHeight;

  // Отримуємо видимі розміри великого зображення
  const largeWidth = largeImage.offsetWidth;
  const largeHeight = largeImage.offsetHeight;

  // Обчислюємо коефіцієнт масштабування
  const scaleX = smallWidth / largeWidth;
  const scaleY = smallHeight / largeHeight;

  // Застосовуємо масштабування за допомогою CSS трансформацій
  return {
    scaleX,
    scaleY,
  }
}

window.addEventListener('finishLoader', () => {
  initSwiperHero();
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
    xPercent: -110,
  },
);
const aboutImg = gsap.timeline({
  scrollTrigger: {
    trigger: '.about', // Блок, до якого прив'язуємо анімацію
    start: 'top top', // Коли починається анімація
    end: 'bottom center+=20%', // Коли закінчується
    scrub: true, // Плавна анімація
    // markers: true,
    pin: '.about-wrap', // Затримка (пінінг) блока
    // pinSpacing: false,
    // onLeave: () => ScrollTrigger.refresh(), // Оновлення при виході з пінінгу
  },
});
if (window.innerWidth < 1366 || window.innerWidth < window.innerHeight) {
  aboutImg
    .to('.about-big-wrap', {
      scale: 2.4,

      ease: 'none',
    })
    .to(
      '.about-img',

      {
        scale: 0.7,
        ease: 'none',
      },
      '<',
    );
} else {
  aboutImg
    .to('.about-big-wrap', {
      scale: 2.7,

      ease: 'none',
    })
    .to(
      '.about-img',

      {
        scale: 0.7,
        ease: 'none',
      },
      '<',
    );
}

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
    xPercent: -110,
    ease: 'none',
  },
);
const locationImg = gsap.timeline({
  scrollTrigger: {
    trigger: '.location', // Блок, до якого прив'язуємо анімацію
    start: 'top top', // Коли починається анімація
    // end: 'bottom top', // Коли закінчується
    end: 'bottom center+=20%',
    scrub: true, // Плавна анімація
    // markers: true,
    pin: '.location-wrap', // Затримка (пінінг) блока
    // pinSpacing: false,
    // onLeave: () => ScrollTrigger.refresh(), // Оновлення при виході з пінінгу
  },
});
locationImg
  .to('.location-big-wrap', {
    scale: 2.4, // Збільшуємо картинку до 1.5

    ease: 'none', // Лінійна анімація без ефектів
  })
  .to(
    '.location-img',

    {
      // height: '100%',
      scale: 0.7,
      ease: 'none',
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

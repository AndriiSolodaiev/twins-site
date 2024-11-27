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
      '.page-hero > .progress-filter > *',
      {
        opacity: 0,
        x: 100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
      },
      '<',
    )
    .fromTo(
      '.page-hero > .line-margin ',
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
      '.page-hero > .progress-list > * ',
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

const progressTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.progress .about__title-wrap',
    start: 'top top+=160px', // when the top of the trigger hits the top of the viewport
    end: 'bottom top', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    scrub: 1,
    // markers: true,
  },
});
progressTl.fromTo(
  '.progress-title',
  {
    ease: 'none',
    xPercent: 0,
  },
  {
    xPercent: -150,
    ease: 'none',
  },
);

const filterBtnFirst = document.querySelector('[data-progress]');
const filterBtn = document.querySelectorAll('[data-progress]');
const progressCards = document.querySelectorAll('.progress-card');
filterBtn.forEach(item => item.classList.remove('active'));
filterBtnFirst.classList.add('active');

filterBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtn.forEach(item => item.classList.remove('active'));
    btn.classList.add('active');
    const btnDataset = btn.dataset.progress;
    if (btn.dataset.progress == 'all') {
      gsap
        .timeline()
        .to('.progress-card', { opacity: 0, yPercent: 20, duration: 0.3 })
        .add(() => {
          progressCards.forEach(card => {
            if (card.dataset.progressCard !== btnDataset) {
              card.style.display = 'none';
            }
          });
        })
        .to(`.progress-card`, {
          display: 'block',
          opacity: 1,
          yPercent: 0,
          duration: 0.3,
          stagger: 0.1,
        });
    } else {
      gsap
        .timeline()
        .to('.progress-card', { opacity: 0, yPercent: 20, duration: 0.3 })
        .add(() => {
          progressCards.forEach(card => {
            if (card.dataset.progressCard !== btnDataset) {
              card.style.display = 'none';
            }
          });
        })
        .to(`[data-progress-card="${btnDataset}"]`, {
          display: 'block',
          opacity: 1,
          yPercent: 0,
          duration: 0.3,
          stagger: 0.1,
        });
    }
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 0);
  });
});

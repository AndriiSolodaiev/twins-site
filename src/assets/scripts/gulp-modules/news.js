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
      '.page-hero > .news-filter > *',
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
      '.page-hero > .news-list > * ',
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
    trigger: '.news .about__title-wrap',
    start: 'top center', // when the top of the trigger hits the top of the viewport
    end: 'center top', // end after scrolling 500px beyond the start
    // smooth scrubbing, takes 1 second to "catch up" to the
    scrub: 1,
    // markers: true,
  },
});
heroTitleTl
  .fromTo(
    '.news-title-1',
    {
      ease: 'none',
      xPercent: 25,
    },
    {
      xPercent: -25,
      ease: 'none',
    },
  )
  .fromTo(
    '.news-title-2',
    {
      ease: 'none',
      xPercent: -25,
    },
    {
      xPercent: 25,
      ease: 'none',
    },
    '<',
  );

const filterBtnFirst = document.querySelector('[data-news]');
const filterBtn = document.querySelectorAll('[data-news]');
const newsCards = document.querySelectorAll('.news-card');
filterBtn.forEach(item => item.classList.remove('active'));
filterBtnFirst.classList.add('active');

filterBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtn.forEach(item => item.classList.remove('active'));
    btn.classList.add('active');
    const btnDataset = btn.dataset.news;
    if (btn.dataset.news == 'all') {
      gsap
        .timeline()
        .to('.news-card', { opacity: 0, yPercent: 20, duration: 0.3 })
        .add(() => {
          newsCards.forEach(card => {
            if (card.dataset.newsCard !== btnDataset) {
              card.style.display = 'none';
            }
          });
        })
        .to(`.news-card`, {
          display: 'block',
          opacity: 1,
          yPercent: 0,
          duration: 0.3,
          stagger: 0.1,
        });
    } else {
      gsap
        .timeline()
        .to('.news-card', { opacity: 0, yPercent: 20, duration: 0.3 })
        .add(() => {
          newsCards.forEach(card => {
            if (card.dataset.newsCard !== btnDataset) {
              card.style.display = 'none';
            }
          });
        })
        .to(`[data-news-card="${btnDataset}"]`, {
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

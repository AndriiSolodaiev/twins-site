import { gsap, ScrollTrigger } from 'gsap/all';

// gsap.registerPlugin(ScrollTrigger);
// const progressTl = gsap.timeline({
//   scrollTrigger: {
//     trigger: '.progress-title',
//     start: 'top center', // when the top of the trigger hits the top of the viewport
//     end: 'bottom top', // end after scrolling 500px beyond the start
//     // smooth scrubbing, takes 1 second to "catch up" to the
//     scrub: 1,
//     // markers: true,
//   },
// });
// progressTl.fromTo(
//   '.progress-title',
//   {
//     ease: 'none',
//     xPercent: 150,
//   },
//   {
//     xPercent: -150,
//     ease: 'none',
//   },
// );

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

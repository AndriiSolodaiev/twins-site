import { gsap, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);
const progressTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.progress-title',
    start: 'top center', // when the top of the trigger hits the top of the viewport
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
    xPercent: 150,
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

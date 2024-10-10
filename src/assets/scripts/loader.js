import gsap from 'gsap';

console.log('loader');

const loader = document.querySelector('.loader-wrap');
let loaderProgress = document.getElementById('loader-progress');
let loaderNumbers = document.getElementById('loader-numbers');
let progress = 0;
let delay = 10;
let isPaused = false;

function updateLoader() {
  if (progress < 75 && !isPaused) {
    progress++;
    loaderProgress.style.transform = `translateX(${progress}%)`;
    loaderNumbers.textContent = `${progress}`;

    if (progress == 1) {
      gsap.from('.loader-numbers', {
        xPercent: 100,
        opacity: 0,
        duration: 0.7,
      });
    }

    setTimeout(updateLoader, delay);
  }
}

function continueLoader() {
  if (progress < 100) {
    progress++;
    loaderProgress.style.transform = `translateX(${progress}%)`;
    loaderNumbers.textContent = `${progress}`;

    if (progress == 99) {
      gsap.to('.loader-numbers', {
        xPercent: -100,
        opacity: 0,
        duration: 0.7,
        delay: 0.1,
      });
    }

    setTimeout(continueLoader, delay);
  }
}
// window.onload = function() {
//   updateLoader();
// };

document.addEventListener('DOMContentLoaded', () => {
  updateLoader();
  window.onload = function() {
    isPaused = true;
    continueLoader();
    setTimeout(() => {
      loader.classList.add('loaded');
      gsap.from('header', {
        yPercent: -100,
        opacity: 0,
        duration: 0.7,
        delay: 0.2,
      });
      gsap.from('.hero-content', {
        yPercent: 100,
        opacity: 0,
        duration: 0.7,
        delay: 0.2,
      });
    }, 1000);
  };
});

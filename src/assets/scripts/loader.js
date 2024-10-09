import gsap from 'gsap';

console.log('loader');

const loader = document.querySelector('.loader-wrap');

let loaderProgress = document.getElementById('loader-progress');
let loaderNumbers = document.getElementById('loader-numbers');
let progress = 0;
let delay = 10;
function updateLoader() {
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
  if (progress == 75) {
    delay = 20;
    gsap.to('.loader-numbers', {
      xPercent: -100,
      opacity: 0,
      duration: 0.7,
      delay: 0.1,
    });
  }
  if (progress == 76) {
    delay = 10;
  }
  if (progress < 100) {
    setTimeout(updateLoader, delay); // Час між оновленнями, можна налаштувати
  }
}

// window.onload = function() {
//   updateLoader();
// };
document.addEventListener('DOMContentLoaded', () => {
  window.onload = function() {
    updateLoader();
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
    }, 1500);
  };
});

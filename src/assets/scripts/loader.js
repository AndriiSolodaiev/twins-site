import gsap from 'gsap';
console.log(
  '%c З Новим 2025 Роком! ☃',
  'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)',
);
const loader = document.querySelector('.loader-wrap');
let loaderProgress = document.getElementById('loader-progress');
let loaderNumbers = document.getElementById('loader-numbers');
let progress = 0;
let delay = 10;

let domLoaded = false;
let finishAnimation = false;

function updateLoader() {
  if (progress < 100) {
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
    if (progress == 99) {
      gsap.to('.loader-numbers', {
        xPercent: -100,
        opacity: 0,
        duration: 0.7,
        delay: 0.1,
      });
    }
    if (progress == 100) {
      finishAnimation = true;
    }
    setTimeout(updateLoader, delay);
  }
}
updateLoader();

document.addEventListener('DOMContentLoaded', () => {
  domLoaded = true;
});
function checkLoadAndFinish() {
  if (domLoaded && finishAnimation) {
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
    window.dispatchEvent(new Event('finishLoader'));
    clearInterval(intervalCheck);
  }
}
let intervalCheck = setInterval(checkLoadAndFinish, 100);
// loader.classList.add('loaded');
// gsap.from('header', {
//   yPercent: -100,
//   opacity: 0,
//   duration: 0.7,
//   delay: 0.2,
// });
// gsap.from('.hero-content', {
//   yPercent: 100,
//   opacity: 0,
//   duration: 0.7,
//   delay: 0.2,
// });

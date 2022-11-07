const header = document.querySelector('.header');

window.onscroll = function() {
  let top = window.scrollY;

  if (top >= 100) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
}

const splash = document.querySelector('.splash');

document.addEventListener('DOMContentLoaded', (e) => {
  setTimeout(() => {
    splash.classList.add('display-none');
  }, 2000);
})
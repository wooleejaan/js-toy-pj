let header = document.querySelector('.header');
let site = document.querySelector('.site');
let cta = document.querySelector('.cta');

let imageOverlay = document.querySelector('.image-container').children[0];
let mainImage = document.querySelector('.image-container').children[1];

let links = Array.from(document.querySelectorAll('.link'));

function animate() {

  setTimeout(() => {
    header.classList.add('active');
    imageOverlay.style.animation = 'slide 1s forwards';
    mainImage.style.animation = 'slide-perm 1s forwards';
  }, 2000);

  setTimeout(() => {
    site.classList.add('active');
    cta.classList.add('active');
  }, 3000);

  links.forEach((link,idx) => {
    setTimeout(() => {
      link.classList.add('active');
    }, (idx * 200) + 2500)
  });
}

animate();
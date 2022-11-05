let images = Array.from(document.querySelectorAll('.image'));

window.addEventListener('DOMContentLoaded', (e) => {
  images.forEach((image, idx) => {
    setTimeout(() => {
      image.classList.add('active');
    }, idx * 100)
  })
})
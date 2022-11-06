let mainImage = document.querySelector('.main-image');
let prevBtn = document.querySelector('.previous');
let nextBtn = document.querySelector('.next');

prevBtn.addEventListener('click', (e) => {
  // console.log(parseInt(mainImage.src.slice(-5,-4)));
  let num = parseInt(mainImage.src.slice(-5,-4));

  if (num === 1) {
    mainImage.src = `./images/image-${4}.jpg`;  
  } else {
    mainImage.src = `./images/image-${num - 1}.jpg`;
  }

  mainImage.classList.add('fade-in');

  setTimeout(() => {
    mainImage.classList.remove('fade-in');
  }, 500);
})

nextBtn.addEventListener('click', (e) => {
  // console.log(parseInt(mainImage.src.slice(-5,-4)));
  let num = parseInt(mainImage.src.slice(-5,-4));

  if (num === 4) {
    mainImage.src = `./images/image-${1}.jpg`;  
  } else {
    mainImage.src = `./images/image-${num + 1}.jpg`;
  }

  mainImage.classList.add('fade-in');

  setTimeout(() => {
    mainImage.classList.remove('fade-in');
  }, 500);
})
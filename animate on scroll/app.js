let aosElements = Array.from(document.querySelectorAll('.aos'));

// aosElements.forEach(element => {
//   console.log(element.getBoundingClientRect());
// })

window.addEventListener('scroll', _.throttle(scanElements, 50));

function scanElements(e) {
  console.count(e);
  aosElements.forEach(element => {
    if (isVisable(element)) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  })
}

function isVisable(element) {
  const elementDiv = element.getBoundingClientRect();
  let distanceFromTop = -300;
  return elementDiv.top - window.innerHeight < distanceFromTop ? true : false;
}

// function throttle(fn, delay) {
//   let lastCall = 0;
//   return (...args) => {
//     let context = this;
//     let current = new Date().getTime();

//     if (current - lastCall < delay) {
//       return
//     }
//     lastCall = current;
//     return fn.apply(context, ...args);
//   }
// }
const container = document.querySelector('.container');

window.onscroll = () => {
  container.style.left = `${-window.scrollY}px`;
} 

let currentPos = container.getBoundingClientRect().left;

const callDistort = () => {
  console.log('called');
  let newPos = container.getBoundingClientRect().left;
  let diff = newPos - currentPos;
  let speed = diff * 0.35;

  container.style.transform = `skewX(${speed}deg)`;

  currentPos = newPos;

  requestAnimationFrame(callDistort);
}
callDistort();
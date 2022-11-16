let pos = document.documentElement;
let uvLight = document.querySelector('.uv-light');

console.log(pos);

pos.style.setProperty('--x', '0px');

document.body.addEventListener('mousemove', function(e) {
  pos.style.setProperty('--x', e.clientX + 'px');
  uvLight.style.left = `${e.clientX - 15}px`;
})
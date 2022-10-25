const container = document.querySelector('.container')
const URL = 'https://i.pravatar.cc/500?img='


function getRandNum(){
  return Math.floor(Math.random() * 70) // 0~69
}

function loadImages(numImages = 10){
  let i=0;
  while (i < numImages){
    const img = document.createElement('img')
    img.src = `${URL}${getRandNum()}`
    container.appendChild(img)
    i++
  }
}

loadImages()

window.addEventListener('scroll', () => {
  // console.log(window.scrollY)
  // console.log(window.innerHeight)

  // if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
  if (window.scrollY + window.innerHeight >= document.body.clientHeight){
    loadImages()
  }
})
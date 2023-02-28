const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#colors 
 * ctx.strokeStyle = color (외곽선에 색상 넣기) 
 * ctx.fillStyle = color (도형 안에 색상 채워넣기)
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#drawing_paths 
 * ctx.beginPath() : path를 생성한다. 
 * ctx.stroke() : 윤곽선을 이용해서 도형을 그린다. 
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#moving_the_pen 
 * ctx.moveTo(x, y) : 펜을 (x,y) 좌표로 이동시킨다. 
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#lines 
 * ctx.lineTo(x, y) : 현재 드로잉 위치에서 (x,y) 좌표까지 선을 그린다. 
 */

let particles = []
let randomMaxSpeed = 5

class Particle {
  constructor(){
    this.reset() 
    this.speedY = Math.random() > .5 ? (Math.random() * randomMaxSpeed) * -1 : (Math.random() * randomMaxSpeed)
    this.speedX = Math.random() > .5 ? (Math.random() * randomMaxSpeed) * -1 : (Math.random() * randomMaxSpeed)
  }

  reset(){
    this.coordinates = {
      x: Math.random() * canvas.width, 
      y: Math.random() * canvas.height,
    }
  }

  move(){
    if(this.coordinates.x >= canvas.width || this.coordinates.x <= 0){
      this.speedX = this.speedX * -1 
    }
    if(this.coordinates.y >= canvas.height || this.coordinates.y <= 0){
      this.speedY = this.speedY * -1 
    }
    // if(this.coordinates.x <= 0){
    //   this.speedX = this.speedX * -1 
    // }
    // if(this.coordinates.y <= 0){
    //   this.speedY = this.speedY * -1 
    // }

    for(let i=0; i<particles.length; i++){
      let { x, y } = this.coordinates

      if(Math.abs(x - particles[i].coordinates.x) <= 200 && Math.abs(y - particles[i].coordinates.y) <= 200){
        
        ctx.strokeStyle = `#03c0ff25`
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(particles[i].coordinates.x, particles[i].coordinates.y)
        ctx.stroke()
      }
    }

    this.coordinates.x += this.speedX
    this.coordinates.y += this.speedY
  }
}

/**
 * https://developer.mozilla.org/ko/docs/Web/API/Window/innerWidth
 * window.innerWidth : 픽셀로 창 내부의 너비를 반환 (더 정확히는, layout viewport의 너비 반환)
 * Window.devicePixelRatio : 현재 표시 장치의 물리적 픽셀과 css 픽셀 비율을 반환. (css 픽셀 크기 / 물리적 픽셀 크기)
 */

function setDimensions(){
  particles = [] 

  canvas.width = window.innerWidth * window.devicePixelRatio
  canvas.height = window.innerHeight * window.devicePixelRatio
  canvas.style.width = `100%`
  canvas.style.height = `100%`

  let w = window.innerWidth
  let particleTotal = w > 1000 ? 300 : 150 

  for(let i=0; i<particleTotal; i++){
    let particle = new Particle() 
    particles.push(particle)
  }
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#drawing_rectangles
 * ctx.clearRect(x, y, width, height) : 특정 부분을 지우는 직사각형, 이 지워진 부분은 완전히 투명해진다.
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#arcs 
 * 호나 원을 그리기 위해서는 arc() 혹은 arcTo() 메서드를 사용한다.
 * arc(x, y, radius, startAngle, endAngle, anticlockwise)
 * : (x,y) 위치에 원점을 두고, 반지름 r을 가지고 startAngle에서 시작해서 endAngle에서 끝나며, 주어진 anticlockwise 방향으로 (기본값은 시계 방향)
 * 
 * Math.PI 는 원의 둘레와 지름의 비율인 약 3.14159 의 값을 가진다. 
 * Math.PI / 180 이 1도, Math.PI는 180도. 여기에 2를 곱하니까 360도 
 * 
 * https://developer.mozilla.org/ko/docs/Web/API/window/requestAnimationFrame 
 * window.requestAnimationFrame() 
 *   브라우저에게 수행하기를 원하는 애니메이션을 알리고 다음 리페인트가 진행되기 전에 해당 애니메이션을 업데이트하는 함수를 호출
 */

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for(let i=0; i<particles.length; i++){

    let { x, y } = particles[i].coordinates

    particles[i].move()
    ctx.beginPath()
    ctx.arc(x, y, 3, 0, 2 * Math.PI)
    ctx.stroke()
  }

  requestAnimationFrame(animate)
}

export {
  setDimensions,
  animate,
  particles
}
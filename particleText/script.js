window.addEventListener('load', function(){
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d', {
    /*
    하드웨어가속은 컴퓨팅에서 일부 기능을 CPU에서 구동하는 소프트웨어 방식보다 더 빠르게 수행할 수 있는 
    하드웨어의 사용을 말하는 거임. 근데 willReadFrequently 속성을 사용하면, 하드웨어 가속 대신에 
    2D 캔버스에게 소프트웨어의 사용을 강제하는 거임. getImageData를 자주 사용할 때 메모리를 줄일수있다함. 

    This will force the use of a software (instead of hardware accelerated) 2D canvas and 
    can save memory when calling getImageData() frequently. 
    라고 나와 있는데 이게 뭔말이냐면, 캔버스는 CPU로부터 생성되고 그려지고 읽어져야 한다는 의미임. 
    getContext는 기본값으로, GPU로부터의 완충 역할(buffer on)을 함. 
    컴퓨팅에서 버퍼란 데이터를 한곳에서 다른 한곳으로 전송하는 동안 일시적으로 데이터를 보관하는 데이터 영역이래. 
    그래서 캔버스 호출이 실행되면 GPU로 가기 전에 이미 getContext에 데이터가 있다는 의미인거지. 
    근데 캔버스는 또 실행되면 getContext로 안 가고 GPU로 또 가는 거야. 
    이때 willReadFrequently를 적용하면 이전 캔버스를 그대로 사용하니까 메모리를 아낄 수 있지. 
    https://stackoverflow.com/questions/74101155/chrome-warning-willreadfrequently-attribute-set-to-true 
    */
    willReadFrequently: true 
  })
  canvas.width = window.innerWidth 
  canvas.height = window.innerHeight
  // console.log(ctx)

  class Particle {
    // Math.random() 을 지우면 성능 최적화를 할 수 있다. 
    constructor(effect, x, y, color){
      this.effect = effect 
      // this.x = Math.random() * this.effect.canvasWidth  
      this.x = this.effect.canvasWidth  
      this.y = this.effect.canvasHeight
      this.color = color 
      this.originX = x 
      this.originY = y 
      // 설정한 gap이 각 Particle의 사이즈가 된다. 
      this.size = this.effect.gap
      this.dx = 0
      this.dy = 0 
      this.vx = 0 
      this.vy = 0 
      this.force = 0 
      this.angle = 0 
      this.distance = 0 
      // this.friction = Math.random() * 0.6 + 0.15
      this.friction = 0.9 // friction은 마찰, 틈 을 의미함. 
      // this.ease = Math.random() * 0.1 + 0.005
      this.ease = 0.2 // 안락, 용이함, 편함. 약간 friction이 안쪽이라면 ease는 바깥쪽 
    }
    draw(){
      this.effect.context.fillStyle = this.color
      // 각 particle은 fillRect로 그려준다. 
      this.effect.context.fillRect(this.x, this.y, this.size, this.size)
    }
    update(){
      // 마우스 움직임에 따라서 각 particle들이 지워질꺼니까
      this.dx = this.effect.mouse.x - this.x
      this.dy = this.effect.mouse.y - this.y 
      // 거리는 피타고라스 정리 a^2 + b^2 = c^2 
      this.distance = this.dx * this.dx + this.dy * this.dy 
      this.force = -this.effect.mouse.radius / this.distance 

      if(this.distance < this.effect.mouse.radius){
        /*
        두 점 사이의 절대 각도를 재는 atan2. 
        arctangent는 역탄젠트(탄젠트의 역함수)임. 

        atan은 두 점 사이의 탄젠트값을 받아 -90 ~ 90도로 반환하고 
        atan2는 두 점 사이의 상대좌표(y,x)를 받아서 -180 ~ 180도로 반환함. 
        
        <atan2 함수를 사용하는 이유>
        atan2 함수는 점A로부터 점B가 상대적으로 어느 위치에 있는지 파라미터로 받는다. 상대적인 위치이므로 x나 y가 음수값이 될 수 있다. 
        반면 atan 함수는 파라미터가 직선의 기울기이므로 결과값은 방향 개념이 상실된 두 점의 각도가 되어버림. 
        https://spiralmoon.tistory.com/entry/프로그래밍-이론-두-점-사이의-절대각도를-재는-atan2 
        */
        this.angle = Math.atan2(this.dy, this.dx)

        // 삼각함수는 동경의 크기에 따라 변화하는 함수. 
        // 동경 위 점과 원점, x축에 내린 발이 직각 삼각형을 이루기 때문에 삼각함수라고 부른다. 
        // 삼각함수는 똑같은 현상이 반복되는, 즉 주기적인 현상에 자주 쓰인다. 
        // 특히 물체의 왕복 운동 같은. 그래서 위치 추적할 때 삼각함수 사용 

        // 어쨌든, 삼각함수로 이동하는 마우스 좌표의 값을 구한다. 
        
        this.vx += this.force * Math.cos(this.angle)
        this.vy += this.force * Math.sin(this.angle)
      }
      // 마우스 움직일 때 지워지는 범위를 말하는 듯 하다. 
      // this.friction 값이 낮으면 그만큼 지워지는 원의 크기도 작아진다. 
      this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease 
      this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease
    }
  }

  class Effect {
    constructor(context, canvasWidth, canvasHeight, firstColor, secondColor, thirdColor){
      this.context = context 
      this.canvasWidth = canvasWidth
      this.canvasHeight = canvasHeight
      this.firstColor = firstColor
      this.secondColor = secondColor
      this.thirdColor = thirdColor
      this.textX = this.canvasWidth / 2 
      this.textY = this.canvasHeight / 2
      this.fontSize = 200
      this.lineHeight = this.fontSize * 1.1 
      this.maxTextWidth = this.canvasWidth * 0.8 
      this.textInput = document.getElementById('textInput')
      // 컴퓨터과학에서 오프셋은, 일반적으로 동일한 객체 안에서 객체 처음부터 주어진 요소나 지점까지의 변위차를 나타내는 정수형임.
      this.verticalOffset = 0 
      // keyup, keydown 이벤트는 어느 키가 눌러졌는지 가리키는 반면, keypress는 어떤 문자가 들어왔는지 가리킴. 
      // 그래서 소문자 a는 keydown, keyup에서는 65로 인식되지만, keypress에서는 97로 인식됨. 
      // keyup은 키를 놓을 때 발생한다. 
      // 키보드 이벤트는 오직 Input, textarea, summary 태그에서만 발생함. 
      this.textInput.addEventListener('keyup', (e) => { // function(){} 으로 하면 this.context가 안 읽히니까 주의 
        if(e.key !== ' '){ // 뭔가를 눌렀다면 컨텍스트를 초기화하고 WrapText를 사용해서 그림을 그린다. 
          // CanvasRenderingContext2D.clearRect() : clearRect(x, y, width, height)
          // 지정한 직사각형 영역을 투명한검은색(transparent black) (rgba(0,0,0,0)) 으로 설정함. 
          this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
          this.wrapText(e.target.value)
        }
      })

      // particle text 
      this.particles = []
      this.gap = 5
      this.mouse = {
        // i need to use a large value here for optimization reason, because i won't be using performance expensive 
        // square root when calculating distance 
        radius: 20000,
        x: 0,
        y: 0 
      }
      // 현재 마우스의 좌표를 찾아서 this.mouse에 저장해둔다. 
      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.x 
        this.mouse.y = e.y 
      })
      
    }
    wrapText(text){
      // canvas settings 

      // The CanvasRenderingContext2D.createLinearGradient() method of the Canvas 2D API creates a gradient along the line connecting two given coordinates.
      // createLinearGradient(x0, y0, x1, y1) 
      // (x0, y0) 에서 (x1, y1) 까지의 gradient 를 제공해줌 
      const gradient = this.context.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight)
      // 3가지 color stops를 작성하고 fillStyle에 gradient를 적용하고 fillRect 같은 fill 메서드를 사용해서 그리면 됨. 나는 fillText로 텍스트 그릴거임. 
      // CanvasGradient.addColorStop() 은 addColorStop(offset, color) 형태임. 
      // 물론 당연히 3개 이상으로 줄 수도 있음. 
      gradient.addColorStop(0.3, this.firstColor)
      gradient.addColorStop(0.5, this.secondColor)
      gradient.addColorStop(0.7, this.thirdColor)
      this.context.fillStyle = gradient
      // The CanvasRenderingContext2D.textAlign property of the Canvas 2D API specifies the current text alignment used when drawing text.
      // left, right, center, start, end 등 값 쓸 수 있고 Default값은 start 임. 
      // 예를 들어 center 값을 사용하면 텍스트의 왼쪽 모서리 는 x - (textWidth / 2) 값을 가진다. 
      this.context.textAlign = 'center'
      // The CanvasRenderingContext2D.textBaseline property of the Canvas 2D API specifies the current text baseline used when drawing text.
      // 기본값은 alphabetic임. top, hanging, middle, ideographic, bottom 등의 값을 가짐. 
      this.context.textBaseline = 'middle'
      // The CanvasRenderingContext2D.lineWidth property of the Canvas 2D API sets the thickness of lines.
      this.context.lineWidth = 3
      // The CanvasRenderingContext2D.strokeStyle property of the Canvas 2D API specifies the color, gradient, or pattern to use for the strokes (outlines) around shapes. The default is #000 (black).
      // 외곽선의 스타일을 지정하는 건데, 기본값은 #000 (black) 이고 color 말고도 gradient, pattern 도 설정할 수 있음. 
      this.context.strokeStyle = 'orange'
      this.context.font = this.fontSize + 'px Bangers'

      // break multiline text
      let linesArray = [] 
      let words = text.split(' ')
      let lineCounter = 0
      let line = '' 
      for(let i=0; i<words.length; i++){
        let testLine = line + words[i] + ' '
        // The CanvasRenderingContext2D.measureText() method returns a TextMetrics object that contains information about the measured text (such as its width, for example).
        if(this.context.measureText(testLine).width > this.maxTextWidth){
          line = words[i] + ' ' // 크면 해당 단어만 남기고 줄바꿈 
          lineCounter++  // 줄바꿈 횟수 
        } else {
          line = testLine // 아니라면 계속 오른쪽에 붙여 나가고 
        }
        linesArray[lineCounter] = line // 줄을 인덱스로 넣으면 해당 줄에 들어갈 문자열을 배치할 수 있다. 
      }
      let textHeight = this.lineHeight * lineCounter // 텍스트 높이는 (줄 하나 높이) * (줄 개수) 
       
      this.textY = this.canvasHeight/2 - textHeight/2 + this.verticalOffset // 텍스트 위치를 다시 잡아주고

      // 줄 하나씩 그려내는데, 
      // x 위치는 고정으로 하고 y 위치만 index에 맞게 증가하도록 하면서 그리는 거야. 
      linesArray.forEach((el, index) => {
        this.context.fillText(el, this.textX, this.textY + (index * this.lineHeight))
        // this.context.strokeText(el, this.textX, this.textY + (index * this.lineHeight))
      })

      // 다 그렸으면 이제 particles로 변환해줄거야. 
      this.convertToParticles()
    }
    convertToParticles(){
      this.particles = [] // particles를 초기화해주고
      // 지금 컨텍스트에서 이미지 데이터를 가져와서 pixels 에 저장해둔다. 
      // 데이터들에는 4가지 정보가 순서대로 있음 (red, blue, green, alpha)
      const pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data 

      // 컨텍스트를 다시 초기화해주고 (기존에 선으로 그렸던 걸 지우고 particles로 채워넣어야 하니까)
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      
      // 위에서 설정해놓은 gap 만큼 간격으로 for문을 반복한다. 
      for(let y = 0; y < this.canvasHeight; y += this.gap){
        for(let x = 0; x < this.canvasWidth; x += this.gap){
          const index = (y * this.canvasWidth + x) * 4 
          const alpha = pixels[index + 3]
          if(alpha > 0){ // 투명도가 0 이상이면 어쨌든 보인다는 거니까 
            const red = pixels[index]
            const green = pixels[index + 1]
            const blue = pixels[index + 2]
            const color = 'rgb(' + red + ',' + green + ',' + blue + ')'

            // 각각의 색상을 particle로 만들어서 particles 배열에 넣어준다. 
            this.particles.push(new Particle(this, x, y, color))
          }
        }
      }
      // console.log(this.particles)
    } 
    render(){
      // particle들을 업데이트하고 그려준다. 
      this.particles.forEach(particle => {
        particle.update() 
        particle.draw()
      })
    }
    // 사이즈가 변하면 그 사이즈에 맞게 해당 값들을 재할당해준다. 
    resize(width, height){
      this.canvasWidth = width 
      this.canvasHeight = height
      this.textX = this.canvasWidth / 2
      this.textY = this.canvasHeight / 2
      this.maxTextWidth = this.canvasWidth * 0.8 
    }
  }

  const effect = new Effect(ctx, canvas.width, canvas.height, '#fff', '#000', 'blue')
  effect.wrapText(effect.textInput.placeholder)
  effect.render() 
   
  function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    effect.render()
    requestAnimationFrame(animate)
  }
  animate()

  // resize 될 때마다 그려줘야 한다. 안 그러면 새로고침해야만 뜨므로 
  window.addEventListener('resize', function(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    effect.resize(canvas.width, canvas.height)
    effect.wrapText(effect.textInput.value)
    // console.log('resize')
  })
})
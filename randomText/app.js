const h1Elements = []
const h1Array = [...document.querySelectorAll('h1')]
const specialChars = [...'!#@$%^&*()_-+={}[];<>?qwertyuiopasdfghjklzxcvbnm'.split('')]

class Header {
  constructor(id, element){
    this.id = id 
    this.idx = 0
    this.frame = 0 
    this.element = element 
    this.element.className = `${id}`
    this.originalString = element.innerText 
    this.innerHTML = ''
    this.intersecting = false 
    this.createSpans()
  }

  createSpans(){
    for(let i=0; i<this.originalString.length; i++){
      this.innerHTML += `<span>${this.originalString[i]}</span>`
    }
    this.element.innerHTML = this.innerHTML 
    this.spans = [...this.element.querySelectorAll('span')]
  }

  animate(){
    // idx가 계속 증가하다가 원본 문자열의 길이에 도달하면 종료 
    if(this.idx !== this.originalString.length && this.intersecting){
      this.spans[this.idx].style.opacity = 1
      this.spans[this.idx].style.transform = `translateX(0)`

      if(this.frame % 3 == 0 && this.spans[this.idx].innerText !== ' '){
        // 랜덤한 문자들을 반복해준다.
        this.spans[this.idx].innerText = specialChars[Math.floor(Math.random() * specialChars.length)]
      }
      if(this.frame % 15 == 0 && this.frame !== 0){
        // 원래 문자열을 돌려주고 한칸 이동한다.
        this.spans[this.idx].innerText = this.originalString[this.idx]
        this.idx++
      }
      this.frame++ 
      // bind()는 새로운 함수 반환, 
      // Function.bind(thisArg, [arg1, arg2, ...])
      // 첫번째 인자는 this가 가리킬 객체를 지정한다. 
      // 두번째 인자부터는 함수의 인자로 전달할 값들이다. 
      // 여기에 this를 삽입하면, 새로운 함수가 이 Header라는 클래스를 똑같이 가리키도록 할 수 있다.
      // 함수를 실행하지 않고 함수를 생성한 후 반환한다는 점에서 call(), apply()와 차이점을 지닌다.
      // 예를 들어 react에서 props로 함수를 전달해야 할 때, 함수와 인자를 모두 전달해야 하기 위해 불필요하게 함수를 추가하지 않아도 됨
      requestAnimationFrame(this.animate.bind(this))
    } else {
      console.log('done')
    }
  }

  reset(){
    this.idx = 0 
    this.frame = 0 
    this.intersecting = false 
    this.spans.forEach(span => {
      span.style.opacity = 0 
      span.style.transform = `translateX(-10px)`
    })
  }
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    h1Array.forEach((header, idx) => {
      h1Elements[idx] = new Header(idx, header)
    })

    let options = {
      // root의 기본값은 브라우저 뷰포트 
      rootMargin: '0px', // root가 가진 여백 
      threshold: 0.0 // observer의 콜백이 실행될 대상의 요소 가시성 퍼센티지. 
      // 50%만큼 요소가 보였을 때 탐지하고 싶으면 값을 0.5로 하면 됨(0.0~1.0) 

    }
    let callback = (entries) => {
      entries.forEach(entry => {
        // Each entry describes an intersection change for one observed
        // target element:
        //   entry.boundingClientRect
        //   entry.intersectionRatio
        //   entry.intersectionRect
        //   entry.isIntersecting
        //   entry.rootBounds
        //   entry.target
        //   entry.time
        if(entry.isIntersecting){
          h1Elements[+entry.target.className].intersecting = true 
          h1Elements[+entry.target.className].animate()
        } else {
          h1Elements[+entry.target.className].reset()
        }
      })
    }

    /**
     * Intersection Observer API는 
     * 타겟 요소와 상위 요소 또는 최상위 document 의 viewport 사이의 intersection 내의 변화를 비동기적으로 관찰하는 방법이다.
     * new IntersectionObserver(callback, options)
     * 
     * https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API 
     */
    let observer = new IntersectionObserver(callback, options)

    h1Elements.forEach(instance => {
      observer.observe(instance.element)
      instance.element.style.opacity = 1 
    })
  })
})

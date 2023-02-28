import { setDimensions, animate } from "./particles.js"

const splashScreen = document.querySelector('.splash__screen')
const splashLeft = document.querySelector('.left')
const splashRight = document.querySelector('.right')
const progressBar = document.querySelector('.progress__bar')
const percentage = document.querySelector('.percentage')

let loading = true 

/**
 * https://inpa.tistory.com/entry/jQuery-📚-브라우저-resize-이벤트-사용법-최적화
 */

window.addEventListener('resize', setDimensions)

setDimensions()
animate()

let timeoutList = []

// function setup(){
//   timeoutList[0] = setTimeout(() => {
//     progressBar.style.height = '40%'
//   }, 2000)
//   timeoutList[1] = setTimeout(() => {
//     progressBar.style.height = '80%'
//   }, 4000)
//   timeoutList[2] = setTimeout(() => {
//     progressBar.style.height = '100%'
//   }, 5000)
//   timeoutList[3] = setTimeout(() => {
//     splashLeft.classList.add('active')
//     splashRight.classList.add('active')
//     progressBar.classList.add('complete')
//     splashScreen.classList.add('complete')
//     loading = false 
//     clearTimeoutList()
//   }, 6000)
// }

let setup = new Promise((resolve, reject) => {
  timeoutList[0] = setTimeout(() => {
    progressBar.style.height = '40%'
  }, 2000)
  timeoutList[1] = setTimeout(() => {
    progressBar.style.height = '80%'
  }, 4000)
  timeoutList[2] = setTimeout(() => {
    progressBar.style.height = '100%'
  }, 5000)
  timeoutList[3] = setTimeout(() => {
    splashLeft.classList.add('active')
    splashRight.classList.add('active')
    progressBar.classList.add('complete')
    splashScreen.classList.add('complete')
    loading = false 
    resolve('complete randing') // 내가 원하는 시점은 여기이므로
  }, 6000)
})

async function clearTimeoutList(){
  try {
    let result = await setup
    // console.log(result)
    // console.log(timeoutList)
    for(let i=0; i<timeoutList.length; i++){
      window.clearTimeout(timeoutList[i])
    }
    timeoutList = []
    // console.log(timeoutList)
  } catch {
    console.log('setTimeout 함수를 삭제하지 못했습니다.')
  }
}

function percentageTracker(){
  // console.log(loading) 100번 실행됨 
  if(loading){
    let { height, top } = progressBar.getBoundingClientRect()
    let p = Math.ceil((height / window.innerHeight) * 100)
    percentage.textContent = `${p}%`
    percentage.style.transform = `translateY(calc(${top - window.innerHeight}px))`
    requestAnimationFrame(percentageTracker)
  }
}

// setup()
clearTimeoutList()
percentageTracker()
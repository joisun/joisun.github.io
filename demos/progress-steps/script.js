window.onload = () => {
  const PROGRESS_BAR = document.querySelector(
    '.progress-mask-bar'
  )
  const STEPS = document.querySelectorAll(
    '.progress-step'
  )

  let n = STEPS.length - 1 // 移动步长
  let k = 0 // 点亮step圈的index
  const pre = document.querySelector('.pre')
  const next = document.querySelector('.next')

  function move(direction) {
    if (direction === 'next') {
      if (n > 0) {
        PROGRESS_BAR.style.left = `calc(${--n} * (100% / -${
          STEPS.length - 1
        }))`
      }
      if (k < STEPS.length - 1) {
        STEPS[
          ++k
        ].style.borderColor = `rgb(0, 218, 134)`
      }
    } else {
      if (n <= 3) {
        PROGRESS_BAR.style.left = `calc(${++n} * (100% / -${
          STEPS.length - 1
        }))`
      }
      if (k >= 1) {
        STEPS[k].style.borderColor = `#dfdfdf`
        k--
      }
      console.log('[n,k]: ', n, k)
    }
  }

  next.addEventListener('click', () =>
    move('next')
  )
  pre.addEventListener('click', () =>
    move('left')
  )
}

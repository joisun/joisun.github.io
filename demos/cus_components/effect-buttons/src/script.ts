const rippleBtn = document.querySelector(
  '.cus-btn--ripple'
) as HTMLButtonElement
function clickHandler() {
  console.log('clicked')
}
const ripple = document.createElement(
  'div'
) as HTMLDivElement
ripple.classList.add('cus-ripple')
rippleBtn.addEventListener('click', (e) => {
  const { offsetLeft, offsetTop } = rippleBtn
  const { clientX, clientY } = e
  const x = clientX - offsetLeft
  const y = clientY - offsetTop
  ripple.style.left = x + 'px'
  ripple.style.top = y + 'px'
  rippleBtn.appendChild(ripple)
  setTimeout(() => {
    rippleBtn.removeChild(ripple)
  }, 300)

  clickHandler()
})

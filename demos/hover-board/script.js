const container =
  document.querySelector('.container')
const SQUARE_SIZE = 16
const BOARD_HEIGHT = container.offsetHeight
const BOARD_WIDTH = container.offsetWidth
const GAP = 1
const COL = Math.floor(
  BOARD_WIDTH / (SQUARE_SIZE + GAP)
)
const ROW = Math.floor(
  BOARD_HEIGHT / (SQUARE_SIZE + GAP)
)
const COUNTS = COL * ROW

container.style.gap = GAP + 'px'
let fragment = document.createDocumentFragment()
let tempInnerHtml = ''
for (let i = 0; i < COUNTS; i++) {
  const square = "<div class='square'></div>"
  tempInnerHtml += square
}

container.innerHTML = tempInnerHtml
const style = document.createElement('style')
style.textContent = `
.square{
  width:${SQUARE_SIZE}px;
  height:${SQUARE_SIZE}px;
  background-color:#1a1a1a;
}`

function attachEvent(square) {
  square.addEventListener('mouseover', () => {
    square.style.backgroundColor =
      '#' +
      Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padEnd(6, '0')
    square.style.transition = 'unset'
  })
  square.addEventListener('mouseout', () => {
    square.style.backgroundColor = '#1a1a1a'
    square.style.transition = 'all 2.5s ease-out'
  })
}
const squares =
  document.querySelectorAll('.square')
squares.forEach((square) => {
  attachEvent(square)
})
document.body.appendChild(style)

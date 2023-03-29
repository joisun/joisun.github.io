const papares = document.querySelectorAll(
  '.emojis .cell'
)
const cells = document.querySelectorAll(
  '.container .cell'
)

papares.forEach((emoji) => {
  emoji.addEventListener('dragstart', dragStart)
  emoji.addEventListener('dragend', dragEnd)
})

cells.forEach((cell) => {
  cell.addEventListener('dragenter', dragEnter)
  cell.addEventListener('dragover', dragOver)
  cell.addEventListener('dragleave', dragLeave)
  cell.addEventListener('drop', drop)
})

function dragStart(ev) {
  ev.dataTransfer.dropEffect = 'move'
}
function dragEnd() {}
function dragEnter() {}
function dragOver() {}
function dragLeave() {}
function drop() {}

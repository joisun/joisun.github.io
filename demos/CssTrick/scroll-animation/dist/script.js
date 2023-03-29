const boxes = document.querySelectorAll('.box')

buildInnerHtml()
function buildInnerHtml() {
  boxes.forEach((it, index) => {
    const img = new Image()
    img.src = `https://picsum.photos/300/200?random=${
      index + 1
    }`
    const content = document.createElement('div')
    content.textContent = `
      Lorem ipsum dolor, sit amet consectetur
      adipisicing elit. Sed necessitatibus
      facilis, velit iusto accusamus impedit
      quisquam laudantium odit deleniti
      laboriosam commodi mollitia autem suscipit
      beatae incidunt temporibus enim veritatis
      optio?Lorem ipsum dolor sit, amet
      consectetur adipisicing elit. Nihil neque
      ea rerum consequuntur et laborum esse,
      numquam quia dolor id.
    `
    it.appendChild(img)
    it.appendChild(content)
  })
}

window.addEventListener('scroll', checkBoxes)

checkBoxes()

function checkBoxes() {
  const triggerBottom =
    (window.innerHeight / 5) * 4

  boxes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top

    if (boxTop < triggerBottom) {
      box.classList.add('show')
    } else {
      box.classList.remove('show')
    }
  })
}

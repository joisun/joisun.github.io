const radioContent = document.querySelector(
  '.radio-content'
)

const radioGroup = document.querySelectorAll(
  '.radio-group input[type="radio"]'
)

radioGroup.forEach((radio) => {
  radio.addEventListener(
    'change',
    handleRadioChange
  )
})
const CONTENTS = {
  tab1: `<h2>Tab1 Content</h2><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, maiores!</p>`,
  tab2: `<h2>Tab2 Content</h2><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, delectus!</p>`,
  tab3: `<h2>Tab3 Content</h2><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, voluptatum.</p>`,
}

function handleRadioChange(e: Event) {
  const { id } = e.target as HTMLInputElement
  const labels = document.querySelectorAll(
    `.radio-group label`
  ) as NodeListOf<HTMLLabelElement>
  labels.forEach((label, index) => {
    /**
     * 规则，当前项的前一个label的::after设为-1
     * 当前项的 ::before + ::after 设为 1
     * 当前项的后一个了label 的::before 设为-1
     */
    if (label.htmlFor === id) {
      // 当前项设为

      label.className = 'active' //active 项的 before + after z-index都为1
      labels[index - 1] &&
        (labels[index - 1].className =
          'pre-in-active')
      labels[index + 1] &&
        (labels[index + 1].className =
          'next-in-active')
    } else {
      label.classList.remove('active')

      // label.cl = ''
    }
  })
  refreshContent(id)
}

function refreshContent(tab: string) {
  radioContent.innerHTML = CONTENTS[tab]
}

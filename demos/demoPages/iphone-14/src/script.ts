const RADIOS = document.querySelectorAll(
  '.colornav-item input[type=radio]'
)
const wrapper = document.querySelector(
  '.iphone14-wrapper'
) as HTMLDivElement
const figures = document.querySelectorAll(
  'figure.iphone14'
) as NodeListOf<HTMLPictureElement>

const text = document.querySelector('.indicator')
RADIOS.forEach((RADIO) => {
  RADIO.addEventListener(
    'change',
    handleRadioChange
  )
})

const styleRules = {
  'colornav-item-midnight': {
    transform:
      'matrix(1.24651, 1.43395, -1.43395, 1.24651, -109.06, 498.232)',
    text: '午夜色',
  },
  'colornav-value-starlight': {
    transform:
      'matrix(1.50347, 1.10184, -1.10184, 1.50347, -224.817, 414.932)',
    text: '星光色',
  },
  'colornav-value-red': {
    transform:
      'matrix(1.64561, 0.755092, -0.755092, 1.64561, -364.436, 307.051)',
    text: '红色',
  },
  'colornav-value-blue': {
    transform:
      'matrix(1.60574, 0.269279, -0.269279, 1.60574, -510.662, 196.845)',
    text: '蓝色',
  },
  'colornav-value-purple': {
    transform:
      'matrix(1.3532, -0.192071, 0.192071, 1.3532, -649.839, 140.245)',
    text: '紫色',
  },
  'colornav-value-yellow': {
    transform:
      'matrix(1.04327, -0.464493, 0.464493, 1.04327, -768.586, 130.872)',
    text: '黄色',
  },
}
function handleRadioChange(e: Event) {
  const { id } = e.target as HTMLInputElement
  RADIOS.forEach((RADIO, index) => {
    if (RADIO.id !== id) {
      RADIO.classList.remove('active')
    } else {
      RADIO.classList.add('active')
      updateViews(id as typesID, index)
    }
  })
}
type typesID =
  | 'colornav-value-purple'
  | 'colornav-value-blue'
  | 'colornav-value-red'
  | 'colornav-value-starlight'
  | 'colornav-item-midnight'
  | 'colornav-value-yellow'
function updateViews(id: typesID, index: number) {
  wrapper.style.transform =
    styleRules[id].transform

  text.textContent = styleRules[id].text

  figures.forEach((figure, _index) => {
    if (index === _index) {
      figure.classList.add('active')
    } else {
      figure.classList.remove('active')
    }
  })
}

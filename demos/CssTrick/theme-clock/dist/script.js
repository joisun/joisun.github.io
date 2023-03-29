const __Material = document.querySelector(
  '#material-style'
)
const __Digital = document.querySelector(
  '#digital-style'
)
const __ThemeToggle = document.querySelector(
  '#theme-toggle'
)

const Html = document.querySelector('html')
__Digital.addEventListener('click', (it) => {
  __Digital.classList.add('center')
  __Material.classList.remove('center')
})
__Material.addEventListener('click', (it) => {
  __Material.classList.add('center')
  __Digital.classList.remove('center')
})

__ThemeToggle.addEventListener('click', (it) => {
  Html.classList.toggle('dark')
})

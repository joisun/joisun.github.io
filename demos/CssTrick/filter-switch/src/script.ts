const checkBox = document.querySelector('input')
const circles =
  document.querySelectorAll('.radio')
checkBox.addEventListener(
  'change',
  ({ target }) => {
    circles.forEach((c) => {
      console.log('[c]: ', c)
      c.classList.toggle('active')
    })
  }
)

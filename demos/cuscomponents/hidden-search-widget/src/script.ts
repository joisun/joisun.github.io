const btn = document.querySelector('.cus-btn')
const input = document.querySelector('.cus-input')

btn.addEventListener('click', () => {
  input.classList.toggle('cus-input--active')
})
input.addEventListener('focusout', () => {
  input.classList.remove('cus-input--active')
})

window.onload = () => {
  const lis = document.querySelectorAll('li')
  const indicator =
    document.querySelector('.indicator')
  const initWidth = lis[0].offsetWidth + 'px'
  indicator.style.width = initWidth

  console.log('[lis]: ', lis)
  lis.forEach((li) => {
    li.addEventListener('mouseover', (e) => {
      indicator.style.left = li.offsetLeft + 'px'
      indicator.style.width =
        li.offsetWidth + 'px'
    })
    li.addEventListener('mouseout', (e) => {
      indicator.style.left = 0
      indicator.style.width = initWidth
    })
  })
}

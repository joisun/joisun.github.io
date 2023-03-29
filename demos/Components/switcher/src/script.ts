const switchers = document.querySelectorAll(
  '.switcher input'
) as NodeListOf<HTMLInputElement>
switchers.forEach((switcher) => {
  const ball = switcher.parentNode?.querySelector(
    '.ball'
  ) as HTMLDivElement
  switcher?.addEventListener('change', (e) => {
    const checked = (<HTMLInputElement>e.target)
      ?.checked
    if (checked) {
      ball.classList.add('checked')
      ball.classList.remove('unchecked')
    } else {
      ball.classList.add('unchecked')
      ball.classList.remove('checked')
    }
  })
})

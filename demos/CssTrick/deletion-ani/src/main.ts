// import "./style/index.scss"

const section = document.querySelector('section')
section?.addEventListener('click', clickHandler)

function clickHandler(e) {
    const target = e.target as HTMLButtonElement
    if (target.nodeName === "BUTTON") {
        target.parentElement?.remove()
        section.style.gridTemplateRows = '0fr'
        setTimeout(() => {
            section.style.gridTemplateRows = '1fr'
        })
        // const currentIndex = target.parentElement?.getAttribute('data-index')

    }

}
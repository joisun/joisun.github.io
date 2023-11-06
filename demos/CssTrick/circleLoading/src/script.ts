const root = document.documentElement;
const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('change', (e) => {
        const { id, value } = e.target as HTMLInputElement
        setChange(id, value)
    })
})

const Properties: { [x: string]: string } = {
    size: "--container-size",
    ballszie: "--ball-size",
    color1: "--ball-color1",
    color2: "--ball-color2",
    duration: "--duration",
    deep: "--deep",
    gap: "--gap",
    speed: '--rotate-speed'
}
function setChange(id: string, value: string) {
    let _value = ''
    let _property = Properties[id]
    switch (id) {
        case 'size':
        case 'ballszie':
            _value = `${value}px`
            break;
        case 'color1':
        case 'color2':
            _value = `${value}`
            break;
        case 'duration':
        case "speed":
            _value = `${value}ms`
            break;
        case 'deep':
            _value = `${value}`
            break;
        case 'gap':
            _value = `${value}%`
            break;
    }

    console.log("trigger")
    root.style.setProperty(_property, _value);
}
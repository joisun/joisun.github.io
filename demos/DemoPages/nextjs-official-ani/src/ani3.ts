
// ani3

const template = document.getElementById('spark') as HTMLTemplateElement
const section3 = document.querySelector('.ani-3')
for (let i = 0; i < 90; i++) {
    const $newSpark = template && template.content.firstElementChild?.cloneNode(true) as Element
    $newSpark.setAttribute('data-index', i.toString())
    section3?.appendChild($newSpark)
}
const next_path = [72, 54, 36, 18, 0, 19, 38, 57, 76, 58, 40, 22, 4, 6, 24, 42, 60, 78, 7, 79, 8, 80, 43, 44, 82, 65, 48, 31, 14, 10, 29, 67, 86, 88, 70, 52, 34, 16, 15, 17]
const duration = 1000
let timerSparking: undefined | number
let enableSparking = true
const highTimers = []

function setOff(el: HTMLDivElement, delay: number) {
    if (!el) return

    let timerOff: undefined | number
    clearTimeout(timerOff)
    timerOff = setTimeout(() => {
        el.setAttribute('data-state', 'off')
        el.style.transform = 'unset'
    }, delay)
}
function sparking() {
    if (!enableSparking) return
    next_path.forEach((p) => {
        if (!section3) return
        let i = section3.querySelector(`[data-index="${String(p)}"]`) as HTMLDivElement
        // 如果 date-state 不是 off 则说明上一轮的处理还没有完成
        if (i.getAttribute('data-state') === 'off') {
            // 随机设定不同状态 off / medium
            const random = Math.random()
            const type = random > .5 ? 'medium' : 'off'

            // init
            i.style.transform = 'unset'
            // set type
            i.setAttribute('data-state', type)

            // 为 medium 的点位才有可能 high
            if (type === 'medium') {
                // 随机闪烁
                if (Math.random() > .7) {
                    const timer = setTimeout(() => {
                        i.setAttribute('data-state', 'high')
                        i.style.transform = 'scale(2.4)'
                        // 持续闪烁 至少400ms
                        setOff(i, Math.random() * duration + 400)
                    }, Math.random() * duration)
                    // 持续随机时长的 medium 状态后闪烁


                    highTimers.push(timer)

                } else {
                    // 持续随机时长的 medium 状态
                    setOff(i, Math.random() * duration)
                }
            }
        }


    })
    // 循环执行
    clearTimeout(timerSparking)
    timerSparking = setTimeout(() => {
        sparking()
    }, duration)
}

sparking()

function highAll() {
    if (!section3) return;
    enableSparking = false
    next_path.forEach((p, ind) => {
        let i = section3.querySelector(`[data-index="${String(p)}"]`) as HTMLDivElement
        setTimeout(() => {
            i.setAttribute('data-state', 'high')
            i.style.transform = "scale(2.4)"
        }, 10 * ind)
    })

}
function offAll() {
    if (!section3) return;
    enableSparking = false
    next_path.forEach((p, ind) => {
        let i = section3.querySelector(`[data-index="${String(p)}"]`) as HTMLDivElement
        setTimeout(() => {
            i.setAttribute('data-state', 'off')
            i.style.transform = "unset"
        }, 10 * ind)
    })
    enableSparking = true;
    sparking()

}
section3?.addEventListener("mouseenter", highAll)
section3?.addEventListener("mouseout", offAll)
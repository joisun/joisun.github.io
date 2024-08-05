// ani2
const options = {
    threshold: 0.2// 元素交叉20%时触发

}
const target = document.querySelector(".ani-2") as HTMLDivElement
const callback: IntersectionObserverCallback = function (entries) {
    // 元素交叉时，开启动画
    if (entries[0].isIntersecting) {
        target && (target.style.setProperty('--play-state', 'running'))
    }
}
const observer = new IntersectionObserver(callback, options)
target && observer.observe(target)



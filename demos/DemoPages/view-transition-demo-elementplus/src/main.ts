import { $, $li } from "./utils"

const switchBtn = $('.the-btn')
let isDark = false
function setBtnText(){
    switchBtn && switchBtn.textContent !== undefined && (switchBtn.textContent = isDark ? 'Set light' :'Set dark')
}
function handleThemeSwitch() {
    isDark = document.documentElement.classList.toggle('dark')
    setBtnText()
}

$li(switchBtn, 'click', handleClick as EventListener)

$li(document, 'DOMContentLoaded', setBtnText)





function handleClick(e: MouseEvent) {
    // 兼容性处理
    if (!(document as any).startViewTransition) {
        handleThemeSwitch()
        return;
    }

    // 获取点击事件位置
    const x = e?.clientX ?? innerWidth / 2;
    const y = e?.clientY ?? innerHeight / 2;
    // 计算最大半径
    const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
    );

    // 创建过渡
    const transition = (document as any).startViewTransition(() => {
        console.log("trigger")
        handleThemeSwitch()
    });

    // 等待伪元素创建
    transition.ready.then(() => {
        // 自定义动画执行
        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0 at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration: 400,
                direction: isDark ? 'reverse' : 'normal',
                easing: "ease-in",
                // 指定目标动画伪元素
                pseudoElement: "::view-transition-new(root)",
            },
        );
    });
}
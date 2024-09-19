const dragEl = document.querySelector('#draggable') as HTMLDivElement


const canvas = document.querySelector("#canvas") as HTMLDivElement

function collectReferlines(canvas: HTMLDivElement, dragTarget: HTMLElement) {
    // x 轴参考线集合
    const xReferlineCollection: number[] = [];
    // y 轴参考线集合
    const yReferlineCollection: number[] = [];
    const referBoxs = [...canvas.children].filter(el => el !== dragTarget)
    const { left: canvasLeft, top: canvasTop } = canvas.getBoundingClientRect()

    referBoxs.forEach(box => {
        const { left, top, height, width } = box.getBoundingClientRect()
        const x1 = left - canvasLeft
        const y1 = top - canvasTop
        const x2 = x1 + width / 2
        const x3 = x1 + width
        const y2 = y1 + height / 2
        const y3 = y1 + height
        xReferlineCollection.push(x1, x2, x3)
        yReferlineCollection.push(y1, y2, y3)
    })
    return { xlines: xReferlineCollection, ylines: yReferlineCollection }

}
function drawReferline(position: number, isX: boolean) {
    const line = document.createElement('div')
    line.className = 'refer-line'
    line.style.cssText = `background-color:red; ${isX ? 'width:1px' : 'height:1px'};position:absolute; ${isX ? 'top:0;bottom:0;left:' : 'left:0;right:0;top:'}${position}px`
    canvas.appendChild(line)

}
function updateReferline(dragTarget: HTMLElement, xlines: number[], ylines: number[]) {
    // 清除之前的辅助线
    canvas.querySelectorAll('.refer-line').forEach(line => line.remove())

    const { left, top, width, height } = dragTarget.getBoundingClientRect()
    const { left: canvasLeft, top: canvasTop } = canvas.getBoundingClientRect()

    const relativeLeft = left - canvasLeft
    const relativeTop = top - canvasTop
    // debug 绘制参考点
    const existedDot = canvas.querySelector('#refer-dot') as HTMLDivElement
    const dot = existedDot || document.createElement('div') as HTMLDivElement
    dot.id = 'refer-dot'
    dot.style.cssText = `
    position: absolute;
    top:${relativeTop}px;
    left:${relativeLeft}px;
    width:20px;
    height:20px;
    border-radius: 100%;
    background-color:blue;
    `
    // if (!existedDot) canvas.appendChild(dot)

    // 拖动元素
    const targetX1 = left - canvasLeft
    const targetY1 = top - canvasTop
    const targetX2 = left - canvasLeft + width / 2
    const targetY2 = top - canvasTop + height / 2
    const targetX3 = left - canvasLeft + width
    const targetY3 = top - canvasTop + height;


    const offset = 0; // 允许2个像素的误差
    [targetX1, targetX2, targetX3].forEach(i => {
        // 给定误差值，如果距离小于一定值就画线
        const match = xlines.find(line => Math.abs(line - i) <= offset);
        match !== undefined && drawReferline(match, true)
    });

    [targetY1, targetY2, targetY3].forEach(i => {
        const match = ylines.find(line => Math.abs(line - i) <= offset);
        match !== undefined && drawReferline(match, true)
    })


}
function draggable(el: HTMLElement) {
    const { xlines, ylines } = collectReferlines(canvas, el)

    const { top: canvasTop, left: canvasLeft } = canvas.getBoundingClientRect()
    canvas.addEventListener('mousedown', mouseDownHandler)
    canvas.addEventListener('mouseup', mouseUpHandler)
    canvas.addEventListener('mousemove', mouseMoveHandler)

    let elDragged = false;
    function mouseDownHandler(downEvent: MouseEvent) {
        downEvent.preventDefault()
        elDragged = true
    }
    function mouseUpHandler(upEvent: MouseEvent) {
        upEvent.preventDefault()
        elDragged = false
    }
    function mouseMoveHandler(moveEvent: MouseEvent) {
        moveEvent.preventDefault()
        if (!elDragged) return;
        // fix: 不能直接使用offsetX, offsetY，相对位置会频繁计算，导致元素不断在原始位置闪烁，解决这个问题需要用相对适口的坐标
        const { clientX, clientY } = moveEvent
        const { width, height } = el.getBoundingClientRect()
        // 绘制参考线
        updateReferline(el, xlines, ylines)
        el.style.transform = `translate(${clientX - canvasLeft - width / 2}px, ${clientY - canvasTop - height / 2}px)`
    }


}

draggable(dragEl)
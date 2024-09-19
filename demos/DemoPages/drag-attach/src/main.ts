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
        // drawReferline(x1, true)
        // drawReferline(x2, true)
        // drawReferline(x3, true)
        // drawReferline(y1, false)
        // drawReferline(y2, false)
        // drawReferline(y3, false)
    })
    return { xlines: xReferlineCollection, ylines: yReferlineCollection }

}
let zIndex = 1000;
function drawReferline(position: number, isX: boolean) {
    const line = document.createElement('div')
    line.className = 'refer-line'
    line.style.cssText = `${isX ? 'width:0;border-left:1px dashed red' : 'height:0;border-bottom:1px dashed blue'};position:absolute; ${isX ? 'top:0;bottom:0;left:' : 'left:0;right:0;top:'}${position}px`
    canvas.appendChild(line)

}
function updateReferlineAndAttach(dragTarget: HTMLElement, xlines: number[], ylines: number[]) {
    // 清除之前的辅助线
    canvas.querySelectorAll('.refer-line').forEach(line => line.remove())


    const { left, top, width, height } = dragTarget.getBoundingClientRect()
    const { left: canvasLeft, top: canvasTop } = canvas.getBoundingClientRect()

    const targetX1 = left - canvasLeft
    const targetY1 = top - canvasTop
    // debug 绘制参考点
    const existedDot = canvas.querySelector('#refer-dot') as HTMLDivElement
    const dot = existedDot || document.createElement('div') as HTMLDivElement
    dot.id = 'refer-dot'
    dot.style.cssText = `
    position: absolute;
    top:${targetX1}px;
    left:${targetY1}px;
    width:20px;
    height:20px;
    border-radius: 100%;
    background-color:blue;
    `
    // if (!existedDot) canvas.appendChild(dot)

    // 拖动元素
    const targetX2 = targetX1 + width / 2
    const targetX3 = targetX1 + width
    const targetY2 = targetY1 + height / 2
    const targetY3 = targetY1 + height;


    const offset = 10; // 允许10个像素的误差
    let minOffsetX = offset; //记录最小偏移
    let minOffsetY = offset;
    let minX = 0;//记录最小偏移所对应的值
    let minY = 0;
    enum AttachTypeX {// 记录是拖拽元素的那个位置用于贴附
        'left',
        'center',
        'right'
    }
    enum AttachTypeY {
        'top',
        'mid',
        'bottom'
    }
    let attachX: AttachTypeX = AttachTypeX.left
    let attachY: AttachTypeY = AttachTypeY.top;

    [targetX1, targetX2, targetX3].forEach((i, index) => {
        // 给定误差值，如果距离小于一定值就画线
        // 找到最小的偏差, 如果超过了误差范围就不用继续判断了
        xlines.forEach(line => {
            // 在误差允许的范围内
            const abs = Math.abs(line - i)
            if (abs <= offset) {
                if (abs <= minOffsetX) {
                    minOffsetX = abs;
                    minX = line
                    attachX = AttachTypeX[index] as unknown as AttachTypeX
                }
            }
        });
        // if (match !== undefined) {
        //     // 如果符合条件误差内的距离: 
        //     // 1.画线， 
        //     drawReferline(match, true)
        //     // 2.收集贴合x坐标
        //     collectAttachX = i + realOffset
        // }

    });

    [targetY1, targetY2, targetY3].forEach((i, index) => {
        ylines.forEach(line => {
            // 在误差允许的范围内
            const abs = Math.abs(line - i)
            if (abs <= offset) {
                if (abs <= minOffsetY) {
                    minOffsetY = abs;
                    minY = line
                    attachY = AttachTypeY[index] as unknown as AttachTypeY

                }
            }
        });
        // const match = ylines.find(line => Math.abs(line - i) <= offset);
        // if (match !== undefined) {
        //     drawReferline(match, false)
        // }
    })
    // 绘制辅助线
    minX !== 0 && drawReferline(minX, true);
    minY !== 0 && drawReferline(minY, false);
    (minX !== 0 || minY !== 0) && autoAttach(dragTarget, minX, minY)
    console.log('attachX', attachX)
    console.log('attachY', attachY)

}

function autoAttach(dragElement: HTMLElement, x: number, y: number) {
    dragElement.style.left = x + 'px'
    dragElement.style.top = y + 'px'
    dragElement.isAttached = true
}
function draggable(el: HTMLElement) {
    const { xlines, ylines } = collectReferlines(canvas, el)

    const { top: canvasTop, left: canvasLeft } = canvas.getBoundingClientRect()
    canvas.addEventListener('mousedown', mouseDownHandler)
    canvas.addEventListener('mouseup', mouseUpHandler)
    canvas.addEventListener('mousemove', mouseMoveHandler)

    let elDragged = false;
    function mouseDownHandler(downEvent: MouseEvent) {
        downEvent.preventDefault();
        downEvent.target === el && (elDragged = true)

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
        updateReferlineAndAttach(el, xlines, ylines)
        // if (!el.isAttached) {
        el.style.left = `${clientX - canvasLeft - width / 2}px`
        el.style.top = `${clientY - canvasTop - height / 2}px`
        // }
        // el.style.transform = `translate(${clientX - canvasLeft - width / 2}px, ${clientY - canvasTop - height / 2}px)`
    }


}

draggable(dragEl)
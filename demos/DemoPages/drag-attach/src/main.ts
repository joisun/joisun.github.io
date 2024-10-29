const dragEl = document.querySelector('#draggable') as HTMLDivElement


const canvas = document.querySelector("#canvas") as HTMLDivElement

// 和自动贴附逻辑处理相关 START
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
let attachTypeX: AttachTypeX = AttachTypeX.left
let attachTypeY: AttachTypeY = AttachTypeY.top;
// 记录鼠标的移动步长,以确定是不是应该解除 attach
let startX = 0;
let startY = 0;
function resetMouseMoveDelta(x: number, y: number) {
    startX = x
    startY = y
}
const offset = 10; // 允许10个像素的误差
let minOffsetX = offset; //记录最小偏移
let minOffsetY = offset;
let minX = 0;//记录最小偏移所对应的值
let minY = 0;
// 和自动贴附逻辑处理相关 END

/**
 * 收集辅助线的位置集合
 * @param canvas 画布
 * @param dragTarget 拖拽元素
 * @returns 其他元素的 x,y 轴向信息,预备辅助线的位置
 */
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

/**
 * 
 * @param position 位置值
 * @param isX 是否绘制 X 轴上的线?(平行于y轴的线)
 */
function drawReferline(position: number, isX: boolean) {
    const line = document.createElement('div')
    line.className = 'refer-line'
    line.style.cssText = `${isX ? 'width:0;border-left:1px dashed red' : 'height:0;border-bottom:1px dashed blue'};position:absolute; ${isX ? 'top:0;bottom:0;left:' : 'left:0;right:0;top:'}${position}px`
    canvas.appendChild(line)

}

/**
 * 更新辅助线
 * @param dragTarget 拖拽元素
 * @param xlines 收集到的其他元素的x轴位置信息,也是辅助线能够显示的位置
 * @param ylines 收集到的其他元素的y轴位置信息,也是辅助线能够显示的位置
 */
function updateReferline(dragTarget: HTMLElement, xlines: number[], ylines: number[]) {
    // 清除之前的辅助线
    canvas.querySelectorAll('.refer-line').forEach(line => line.remove())
    // ------------------计算出元素拖动时,最相邻的辅助线应该出现的位置------------------
    const { left, top, width, height } = dragTarget.getBoundingClientRect()
    const { left: canvasLeft, top: canvasTop } = canvas.getBoundingClientRect()

    const targetX1 = left - canvasLeft
    const targetY1 = top - canvasTop


    // 拖动元素
    const targetX2 = targetX1 + width / 2
    const targetX3 = targetX1 + width
    const targetY2 = targetY1 + height / 2
    const targetY3 = targetY1 + height;

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
                    attachTypeX = AttachTypeX[index] as unknown as AttachTypeX
                }
            }
        });
    });

    [targetY1, targetY2, targetY3].forEach((i, index) => {
        ylines.forEach(line => {
            // 在误差允许的范围内
            const abs = Math.abs(line - i)
            if (abs <= offset) {
                if (abs <= minOffsetY) {
                    minOffsetY = abs;
                    minY = line
                    attachTypeY = AttachTypeY[index] as unknown as AttachTypeY

                }
            }
        });
    })
    // 绘制辅助线
    minX !== 0 && drawReferline(minX, true);
    minY !== 0 && drawReferline(minY, false);

    // ------------------计算出元素拖动时,最相邻的辅助线应该出现的位置 END ------------------


}

/**
 * 
 * @param dragElement 被拖拽的元素
 * @param x 应该贴附的 x 坐标
 * @param y 应该贴附的 y 坐标
 * @param attachTypeX x 轴贴附的实际位置
 * @param attachTypeY y 轴贴附的实际位置
 */
function autoAttach(dragElement: HTMLElement, x: number, y: number, attachTypeX: AttachTypeX, attachTypeY: AttachTypeY) {
    if (minX === 0 && minY === 0) return;


    const { width, height } = dragElement.getBoundingClientRect()
    let _x = 0; let _y = 0;
    switch (attachTypeX) {
        case AttachTypeX.left:
            _x = x;
            break;
        case AttachTypeX.center:
            _x = x + width / 2
            break;
        case AttachTypeX.right:
            _x = x + width
            break;
    }
    switch (attachTypeY) {
        case AttachTypeY.top:
            _y = y;
            break;
        case AttachTypeY.mid:
            _y = y + height / 2
            break;
        case AttachTypeY.bottom:
            _y = y + height
            break;
    }
    console.log('_x', _x)
    console.log('_y', _y)
    dragElement.style.left = _x + 'px'
    dragElement.style.top = _y + 'px'
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
        const { x, y } = downEvent
        resetMouseMoveDelta(x, y)
        downEvent.target === el && (elDragged = true)

    }
    function mouseUpHandler(upEvent: MouseEvent) {
        upEvent.preventDefault()
        const { x, y } = upEvent
        resetMouseMoveDelta(x, y)
        //duplicate 处理自动贴附逻辑(该方法逻辑错误))
        // autoAttach(el, minX, minY, attachTypeX, attachTypeY)
        elDragged = false
    }

    function shouldDettach(clientX: number, clientY: number) {
        // 吸附后，检测鼠标移动是否超过吸附阈值，从而解除吸附
        const detachThreshold = 4
        const deltaX = Math.abs(clientX - startX);
        const deltaY = Math.abs(clientY - startY);
        return deltaX > detachThreshold || deltaY > detachThreshold
    }

    function mouseMoveHandler(moveEvent: MouseEvent) {
        moveEvent.preventDefault()
        if (!elDragged) return;
        // fix: 不能直接使用offsetX, offsetY，相对位置会频繁计算，导致元素不断在原始位置闪烁，解决这个问题需要用相对适口的坐标
        const { clientX, clientY } = moveEvent

        const { width, height } = el.getBoundingClientRect()
        // const _shouldDettach = shouldDettach(clientX, clientY)
        // console.log('_shouldDettach', _shouldDettach)
        // if (_shouldDettach) {
        el.style.left = `${clientX - canvasLeft - width / 2}px`
        el.style.top = `${clientY - canvasTop - height / 2}px`
        // 绘制参考线
        updateReferline(el, xlines, ylines)
        // } else {
        // // 处理自动贴附逻辑
        // autoAttach(el, minX, minY, attachTypeX, attachTypeY)
        // }
        // el.style.transform = `translate(${clientX - canvasLeft - width / 2}px, ${clientY - canvasTop - height / 2}px)`
    }


}

/**
 * 在画布上绘制一个点,用于调试
 * @param x 
 * @param y 
 */
function drawADot(x: number, y: number) {
    // debug 绘制参考点
    const existedDot = canvas.querySelector('#refer-dot') as HTMLDivElement
    const dot = existedDot || document.createElement('div') as HTMLDivElement
    dot.id = 'refer-dot'
    dot.style.cssText = `
        position: absolute;
        top:${x}px;
        left:${y}px;
        width:20px;
        height:20px;
        border-radius: 100%;
        background-color:blue;
        `
    if (!existedDot) canvas.appendChild(dot)
}

draggable(dragEl)
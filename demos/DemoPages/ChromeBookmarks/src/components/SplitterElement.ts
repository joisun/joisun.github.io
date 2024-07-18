function assert(value: boolean, message?: string) {
    if (value) {
        return
    }
    throw new Error("Assertion failed" + (message ? `: ${message}` : ""))
}
export default class CrSplitterElement extends HTMLElement {
    handlers_: null | Map<keyof DocumentEventMap, Function>;
    startX_: number;
    startWidth_: number;
    resizeNextElement: boolean;
    static get is() {
        return "cr-splitter"
    }
    constructor() {
        super();
        this.handlers_ = null;
        this.startX_ = 0;
        this.startWidth_ = -1;
        this.resizeNextElement = false;
        this.addEventListener("mousedown", (e => this.onMouseDown_(e)));
        this.addEventListener("touchstart", (e => this.onTouchStart_(e)))
    }
    connectedCallback() {
        this.handlers_ = new Map
    }
    disconnectedCallback() {
        this.removeAllHandlers_();
        this.handlers_ = null
    }
    startDrag(clientX: number, isTouchEvent: boolean) {
        assert(!!this.handlers_);
        if (this.handlers_ && this.handlers_.size > 0) {
            this.endDrag_()
        }
        if (isTouchEvent) {
            const endDragBound = this.endDrag_.bind(this);
            this.handlers_?.set("touchmove", this.handleTouchMove_.bind(this));
            this.handlers_?.set("touchend", endDragBound);
            this.handlers_?.set("touchcancel", endDragBound);
            this.handlers_?.set("touchstart", endDragBound)
        } else {
            this.handlers_?.set("mousemove", this.handleMouseMove_.bind(this));
            this.handlers_?.set("mouseup", this.handleMouseUp_.bind(this))
        }
        const doc = this.ownerDocument;
        if (this.handlers_) {
            for (const [eventType, handler] of this.handlers_) {
                doc.addEventListener(eventType, handler as any, true)
            }
        }
        this.startX_ = clientX;
        this.handleSplitterDragStart_()
    }
    removeAllHandlers_() {
        const doc = this.ownerDocument;
        assert(!!this.handlers_);
        if (this.handlers_) {
            for (const [eventType, handler] of this.handlers_) {
                doc.removeEventListener(eventType, handler as any, true)
            }
        }
        this.handlers_?.clear()
    }
    endDrag_() {
        this.removeAllHandlers_();
        this.handleSplitterDragEnd_()
    }
    getResizeTarget_() {
        const target = this.resizeNextElement ? this.nextElementSibling : this.previousElementSibling;
        return target as HTMLElement | null
    }
    calcDeltaX_(deltaX: number) {
        return this.resizeNextElement ? -deltaX : deltaX
    }
    onMouseDown_(e: MouseEvent) {
        if (e.button) {
            return
        }
        this.startDrag(e.clientX, false);
        e.preventDefault()
    }
    onTouchStart_(e: TouchEvent) {
        if (e.touches.length === 1) {
            this.startDrag(e.touches[0].clientX, true);
            e.preventDefault()
        }
    }
    handleMouseMove_(e: MouseEvent) {
        this.handleMove_(e.clientX)
    }
    handleTouchMove_(e: TouchEvent) {
        if (e.touches.length === 1) {
            this.handleMove_(e.touches[0].clientX)
        }
    }
    handleMove_(clientX: number) {
        // 做兼容性处理， 默认浏览器的文字排版时从左到右， 但是有一些国家，例如阿拉伯语国家， 是从右到左， 这时候的 deltaX 的计算规则不同。 
        // this指的是当前元素实例， 元素实例上的 matches 方法用于匹配css选择器。 
        const deltaX = this.matches(":host-context([dir=rtl]) cr-splitter") ? this.startX_ - clientX : clientX - this.startX_;
        this.handleSplitterDragMove_(deltaX)
    }
    handleMouseUp_(_e: MouseEvent) {
        this.endDrag_()
    }
    handleSplitterDragStart_() {
        const targetElement = this.getResizeTarget_();
        const doc = targetElement?.ownerDocument;
        if (doc && doc.defaultView) {
            this.startWidth_ = parseFloat(doc.defaultView.getComputedStyle(targetElement).width) + targetElement?.offsetWidth - targetElement?.clientWidth;
        }
        this.classList.add("splitter-active")
    }
    handleSplitterDragMove_(deltaX: number) {
        const targetElement = this.getResizeTarget_();
        if (targetElement) {
            const newWidth = this.startWidth_ + this.calcDeltaX_(deltaX);
            targetElement.style.width = newWidth + "px";
            this.dispatchEvent(new CustomEvent("dragmove"))
        }
    }
    handleSplitterDragEnd_() {
        const targetElement = this.getResizeTarget_();
        const doc = targetElement?.ownerDocument;
        if (doc && doc.defaultView) {
            const computedWidth = parseFloat(doc.defaultView.getComputedStyle(targetElement).width);
            if (this.startWidth_ !== computedWidth) {
                // 代码解构，触发 resize 事件， 这样其他模块的代码假如需要收到侧边栏宽度变更，就可以通过监听该事件实现
                this.dispatchEvent(new CustomEvent("resize"))
            }
        }
        this.classList.remove("splitter-active")
    }
}
const app = document.querySelector("#app") as HTMLDivElement;
app.ondragover = (e) => {
  e.preventDefault();
};
app.ondragleave = (e) => {
  e.preventDefault();
};

// 记录拖拽元素，用于恢复样式
let sourceNode: null | HTMLLIElement = null;
// 事件委托，监听拖动事件，通过异步修改原始元素样式
app.ondragstart = (e) => {
  sourceNode = e.target as HTMLLIElement;
  setTimeout(() => {
    sourceNode?.classList.add("moving");
  });
};
// 事件委托，监听元素拖拽结束，还原样式
app.ondragend = () => {
  sourceNode?.classList.remove("moving");
};

app.ondragenter = (e) => {
  e.preventDefault();

  // 被覆盖元素
  const target = e.target as HTMLLIElement;

  // 特殊情况处理，如果被覆盖元素不是 li 元素或者，是拖拽元素本省，则不做处理
  if (target.nodeName !== "LI" || target === sourceNode) return;

  // 获取所有拖拽元素列表
  const list = document.querySelector("ul") as HTMLUListElement;
  const flip = new Flip(list);
  const dragItems = [...list.children];
  // 覆盖元素的索引
  const targetIndex = dragItems.indexOf(target);
  // 拖拽元素的索引
  const sourceIndex = dragItems.indexOf(sourceNode!);

  if (sourceIndex > targetIndex) {
    // 拖拽元素相对被覆盖原始是向上移动
    list.insertBefore(sourceNode!, target);
  } else {
    // 拖拽元素相对被覆盖原始是向下移动
    list.insertBefore(sourceNode!, target.nextSibling);
  }

  flip.play()
};

interface ListItem extends Element {
  StartX: number;
  StartY: number;
}
class Flip {
  list: HTMLUListElement;
  constructor(list: HTMLUListElement) {
    // first
    this.list = list;
    const children = list.children;
    for (let item of children) {
      const { x, y } = item.getBoundingClientRect();
      (item as ListItem).StartX = x;
      (item as ListItem).StartY = y;
    }
  }
  play() {
    const children = this.list.children;
    for (let item of children) {
      const { StartX, StartY } = item as ListItem;
      const { x: EndX, y: EndY } = item.getBoundingClientRect();
      item.animate(
        [
          { transform: `translate(${StartX - EndX }px, ${StartY - EndY}px)` },
          { transform: `translate(0px, 0px)` },
        ],
        {
          duration: 100,
        }
      );
    }
  }
}

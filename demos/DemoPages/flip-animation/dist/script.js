"use strict";
const btn = document.querySelector('#btn');
const btn2 = document.querySelector('#btn2');
const ul = document.querySelector('#box1');
const ul2 = document.querySelector('#box2');
btn.onclick = () => {
    record(ul);
    change(ul);
    move(ul);
};
btn2.onclick = () => {
    record(ul2);
    change(ul2);
    move(ul2);
};
function record(ul) {
    const childrens = ul.children;
    for (let i = 0; i < childrens.length; i++) {
        const li = childrens[i];
        const li_bcr = li.getBoundingClientRect();
        li.StartX = li_bcr.x;
        li.StartY = li_bcr.y;
    }
}
function change(ul) {
    const childrens = ul.children;
    for (let i = 0; i < childrens.length; i++) {
        // 当前li元素
        const li = childrens[i];
        // 当前li元素的后一个元素
        const liSibling = li.nextElementSibling;
        // 需要替换的目标元素位置
        const x = Math.floor(Math.random() * childrens.length);
        // 替换的目标元素
        const xLiEl = childrens[x];
        // 将目标元素移动到当前元素之后
        ul.insertBefore(xLiEl, liSibling);
    }
}
function move(ul) {
    const childrens = ul.children;
    for (let i = 0; i < childrens.length; i++) {
        // 当前li元素
        const li = childrens[i];
        const { x: curX, y: curY } = li.getBoundingClientRect();
        li.animate([
            { transform: `translate(${li.StartX - curX}px, ${li.StartY - curY}px)` },
            { transform: `translate(0px, 0px)` }
        ], { duration: 300 });
    }
}

"use strict";
const svg = document.querySelector("svg");
const container = document.querySelector(".container");
// 获取窗口的宽高
const { height: wh, width: ww } = container.getClientRects()[0];
// 获取dvd logo的宽高
const { height: lh, width: lw } = svg.getClientRects()[0];
const audio = document.querySelector("audio");
// 计算出画布的宽高
const ch = wh - lh;
const cw = ww - lw;
// dvd logo 的运动起始位置
let x = 0;
let y = 0;
let x_speed = 10;
let y_speed = 6;
//
move();
function move() {
    svg.style.transform = `translate(${x}px,${y}px)`;
    // 这段逻辑是以下注释代码的简化版本
    if (x >= cw || x < 0) {
        x_speed = x_speed * -1;
        changeColor();
        // audio.play();
    }
    if (y >= ch || y < 0) {
        y_speed = y_speed * -1;
        changeColor();
        // audio.play();
    }
    // // 当x轴方向移动超出右画布时，将速度改为负数值，就能达到反向移动
    // if (x >= cw) {
    //   x_speed = x_speed * -1;
    // }
    // // 当x轴方向移动超出左画布时，将速度再次取反，也就是变为了正数，又变作正向移动
    // if (x < 0) {
    //   x_speed = x_speed * -1;
    // }
    // if (y >= ch) {
    //   y_speed = y_speed * -1;
    // }
    // if (y < 0) {
    //   y_speed = y_speed * -1;
    // }
    x += x_speed;
    y += y_speed;
    requestAnimationFrame(move);
}
let index = 0;
const colors = ["#22a2c3", "#f1441d", "#2bae85", "#fffef9", "#fcc515"];
function changeColor() {
    svg.style.fill = colors[index];
    if (index < colors.length - 1) {
        index++;
    }
    else {
        index = 0;
    }
}

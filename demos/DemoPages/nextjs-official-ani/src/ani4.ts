const svg = document.getElementById('mySvg');
const gradient = document.getElementById('gradient-0');

function animate() {
    if (!gradient) return
    const time = Date.now() * 0.001; // 当前时间（秒）

    // 调整这些值来改变光脉的长度和移动速度
    const speed = 0.9; // 控制移动速度
    const length = 0.2; // 控制光脉长度，值越小，光脉越短

    const x1 = (Math.sin(time * speed) * 0.5 + 0.5) * 100;
    const y1 = (Math.cos(time * speed) * 0.5 + 0.5) * 100;
    const x2 = (Math.sin(time * speed + length) * 0.5 + 0.5) * 100;
    const y2 = (Math.cos(time * speed + length) * 0.5 + 0.5) * 100;

    gradient.setAttribute('x1', `${x1}%`);
    gradient.setAttribute('y1', `${y1}%`);
    gradient.setAttribute('x2', `${x2}%`);
    gradient.setAttribute('y2', `${y2}%`);

    requestAnimationFrame(animate);
}

animate();
window.onload = () => {
  const dot = document.createElement('div');
  dot.style = `
  border: 1px solid red;
  border-radius:100%;
  height:10px;
  width:10px;
  position:absolute;
  transform:translate(-5px,-5px)
  `;
  document.body.appendChild(dot);

  const indicator = document.querySelector('.indicator');
  const box = document.querySelector('.box');
  const body = document.body;
  const imgWrapper = document.querySelector('.img-wrapper');
  // 解决屏幕闪烁的问题,监听鼠标的是 box, 发生变换的是 imgWrapper

  // 这里把body 做参考坐标系
  const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = body;
  // box : 457px * 457px
  body.addEventListener('mousemove', (e) => {
    // 鼠标坐标
    const { pageX, pageY } = e;
    // 鼠标以Box为坐标系的位置 (鼠标相对Box的坐标位置)
    let relatedBoxX = pageX - offsetLeft; // 0 ~ 457
    let relatedBoxY = pageY - offsetTop; // 0 ~ 457

    // Box中心点坐标位置
    const centerX = offsetWidth / 2; // 457 / 2 约等于 228
    const centerY = offsetHeight / 2; // 457 / 2

    // 鼠标变动相对Box中心点的位置范围
    const rangeX = relatedBoxX - centerX; // 228 - 0 , 228 - 457 约等于 (-228 ~ 228) 如果图片1:1 ,则下同
    const rangeY = relatedBoxY - centerY;

    // 鼠标的变动相对图片中心的比例
    const degX = rangeX / centerX;
    const degY = rangeY / centerY;

    const maxAngle = 30;

    // 注意是绕轴变动,且Y轴变动要取反
    // prettier-ignore
    box.style.transform = `rotateY(${degX * maxAngle }deg) rotateX(${degY * maxAngle * -1}deg)`;
    // prettier-ignore
    // indicator.textContent =  `rotateY(${degX}deg) rotateX(${degY}deg)`;
    dot.style.left = pageX + 'px';
    dot.style.top = pageY + 'px';
  });
  box.addEventListener('mouseout', () => {
    box.style.transform = 'unset';
  });
};
// console.log(box.offsetWidth, box.offsetHeight);

window.onload = () => {
  const body = document.body;
  const box = document.querySelector('.box');
  const innerBox = document.querySelector('.inner-box');
  // 鼠标指示
  const { pointerDot, setPointerPosition } = createPointerDot(body);

  // const boxItems = document.querySelectorAll('.box-item');

  body.addEventListener('mousemove', (e) => {
    const { pageX, pageY } = e;
    // pointer 会阻止css hover
    // setPointerPosition(pageX, pageY);
    const [xCent, yCent] = computedPointerPositionPercent(pageX, pageY, 12);
    // 50 是基于 background-position : 50% 50% 变化

    body.style.backgroundPosition = `${xCent + 50}% ${yCent + 50}%`;
  });

  box.addEventListener('mousemove', (e) => {
    const { pageX, pageY } = e;
    const [xCent, yCent] = computedPointerPositionPercent(pageX, pageY, 1, box);
    // 45 是最大角度
    innerBox.style.transform = `rotateX(${-yCent * 3}deg) rotateY(${
      xCent * 3
    }deg)`;
  });

  // boxItems.forEach((boxItem) => {
  //   boxItem.addEventListener('mouseover', () => {
  //     boxItem.style.transform = 'scale(1.2)';
  //     console.log('[enter ]: ');
  //   });
  //   boxItem.addEventListener('mouseout', () => {
  //     boxItem.style.transform = 'scale(1)';
  //     console.log('[out ]: ');
  //   });
  // });
};

// 添加鼠标指示
const createPointerDot = (body) => {
  const pointerDot = document.createElement('div');
  pointerDot.style = `
  width:12px;
  height:12px;
  border-radius:50%;
  border:2px solid red;
  transform:translate(-50%,-50%);
  position:absolute;
  `;
  body.appendChild(pointerDot);
  const setPointerPosition = (x, y) => {
    pointerDot.style.left = x + 'px';
    pointerDot.style.top = y + 'px';
  };
  return { pointerDot, setPointerPosition };
};
/**
 *
 * @param {*} x
 * @param {*} y
 * @param {*} scaleFactor 放大因子
 * @param {*} target 参考坐标系元素对象
 * @returns
 */
const computedPointerPositionPercent = (
  x,
  y,
  scaleFactor = 1,
  target = document.body,
) => {
  const { width, height } = target.getBoundingClientRect();
  const { offsetTop, offsetLeft } = target;
  const centerX = width / 2 + offsetLeft;
  const centerY = height / 2 + offsetTop;
  const moveRangeX = x - centerX;
  const moveRangeY = y - centerY;
  return [
    (moveRangeX / centerX) * scaleFactor,
    (moveRangeY / centerY) * scaleFactor,
  ];
};

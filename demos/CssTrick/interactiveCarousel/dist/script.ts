window.onload = () => {
  const { offsetWidth: containerWidth } = document.querySelector(
    '.carousel-container',
  ) as HTMLDivElement;
  const carouselItems = document.querySelector(
    '.carousel-items',
  ) as HTMLDivElement;

  const itemsCount = document.querySelectorAll('.carousel-item').length;
  // 最大左移动像素
  const maxStep = itemsCount * containerWidth - containerWidth;
  //init style
  carouselItems.style.left = '0';
  addClickHandler(carouselItems, containerWidth, maxStep);
};
const computedRotate = (el) => {
  // https://css-tricks.com/get-value-of-css-rotation-through-javascript/
  // https://codepen.io/jjeaton/pen/DGBpvd
  var st = window.getComputedStyle(el, null);
  var tr = st.transform;

  if (tr !== 'none') {
    var values = tr.split('(')[1];
    values = values.split(')')[0];
    values = values.split(',') as any;
    var a = values[0] as any;
    var b = values[1] as any;

    var radians = Math.atan2(b, a);
    if (radians < 0) {
      radians += 2 * Math.PI;
    }
    var angle = Math.round(radians * (180 / Math.PI));
    /**/
  } else {
    var angle = 0;
  }
  return angle;
  // works!
};
const rotateItem = (deg) => {
  const items = document.querySelectorAll('.inner-box');
  console.log('[items]: ', items);
  items.forEach((item) => {
    (item as HTMLDivElement).style.transform = `rotate(${-1 * deg}deg)`;
  });
};
const rotateMenu = (next: boolean) => {
  const menuItemsCount = document.querySelectorAll('.rotate-menu-item').length;
  const wrapper = document.querySelector('.rotate-wrapper') as HTMLDivElement;
  const rotateAngle = 360 / menuItemsCount;
  const currentRotate = computedRotate(wrapper);
  let updateAngle: number;
  if (next) {
    updateAngle = currentRotate + rotateAngle;
  } else {
    updateAngle = currentRotate - rotateAngle;
  }
  rotateItem(updateAngle);
  wrapper.style.transform = `rotate(${updateAngle}deg)`;
};

// prettier-ignore
const onClickHandler = (next: boolean,wrapper:HTMLDivElement,moveStep:number,maxStep:number) => {
  
  let left =  parseInt(wrapper.style.left)
  if(next){
    if(left > -maxStep){
      rotateMenu(true)
      left -= moveStep
    }
  }else if(!next){
    if(left === 0) return
    rotateMenu(false)

    left += moveStep
  }

  wrapper.style.left = left + 'px';
};
const addClickHandler = (wrapper, moveStep, maxStep) => {
  const lastBtn = document.querySelector('.last-btn');
  const nextBtn = document.querySelector('.next-btn');
  lastBtn.addEventListener('click', (e) =>
    onClickHandler(false, wrapper, moveStep, maxStep),
  );
  nextBtn.addEventListener('click', (e) =>
    onClickHandler(true, wrapper, moveStep, maxStep),
  );
};

"use strict";
const rippleBtn = document.querySelector('.cus-btn--ripple');
function clickHandler() {
    console.log('clicked');
}
const ripple = document.createElement('div');
ripple.classList.add('cus-ripple');
rippleBtn.addEventListener('click', (e) => {
    const { offsetLeft, offsetTop } = rippleBtn;
    const { clientX, clientY } = e;
    const x = clientX - offsetLeft;
    const y = clientY - offsetTop;
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    rippleBtn.appendChild(ripple);
    setTimeout(() => {
        rippleBtn.removeChild(ripple);
    }, 300);
    clickHandler();
});

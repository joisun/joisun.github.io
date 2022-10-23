window.onload = function () {
    var containerWidth = document.querySelector('.carousel-container').offsetWidth;
    var carouselItems = document.querySelector('.carousel-items');
    var itemsCount = document.querySelectorAll('.carousel-item').length;
    // 最大左移动像素
    var maxStep = itemsCount * containerWidth - containerWidth;
    //init style
    carouselItems.style.left = '0';
    addClickHandler(carouselItems, containerWidth, maxStep);
};
var computedRotate = function (el) {
    // https://css-tricks.com/get-value-of-css-rotation-through-javascript/
    // https://codepen.io/jjeaton/pen/DGBpvd
    var st = window.getComputedStyle(el, null);
    var tr = st.transform;
    if (tr !== 'none') {
        var values = tr.split('(')[1];
        values = values.split(')')[0];
        values = values.split(',');
        var a = values[0];
        var b = values[1];
        var radians = Math.atan2(b, a);
        if (radians < 0) {
            radians += 2 * Math.PI;
        }
        var angle = Math.round(radians * (180 / Math.PI));
        /**/
    }
    else {
        var angle = 0;
    }
    return angle;
    // works!
};
var rotateItem = function (deg) {
    var items = document.querySelectorAll('.inner-box');
    console.log('[items]: ', items);
    items.forEach(function (item) {
        item.style.transform = "rotate(".concat(-1 * deg, "deg)");
    });
};
var rotateMenu = function (next) {
    var menuItemsCount = document.querySelectorAll('.rotate-menu-item').length;
    var wrapper = document.querySelector('.rotate-wrapper');
    var rotateAngle = 360 / menuItemsCount;
    var currentRotate = computedRotate(wrapper);
    var updateAngle;
    if (next) {
        updateAngle = currentRotate + rotateAngle;
    }
    else {
        updateAngle = currentRotate - rotateAngle;
    }
    rotateItem(updateAngle);
    wrapper.style.transform = "rotate(".concat(updateAngle, "deg)");
};
// prettier-ignore
var onClickHandler = function (next, wrapper, moveStep, maxStep) {
    var left = parseInt(wrapper.style.left);
    if (next) {
        if (left > -maxStep) {
            rotateMenu(true);
            left -= moveStep;
        }
    }
    else if (!next) {
        if (left === 0)
            return;
        rotateMenu(false);
        left += moveStep;
    }
    wrapper.style.left = left + 'px';
};
var addClickHandler = function (wrapper, moveStep, maxStep) {
    var lastBtn = document.querySelector('.last-btn');
    var nextBtn = document.querySelector('.next-btn');
    lastBtn.addEventListener('click', function (e) {
        return onClickHandler(false, wrapper, moveStep, maxStep);
    });
    nextBtn.addEventListener('click', function (e) {
        return onClickHandler(true, wrapper, moveStep, maxStep);
    });
};

"use strict";
const switchers = document.querySelectorAll('.switcher input');
switchers.forEach((switcher) => {
    var _a;
    const ball = (_a = switcher.parentNode) === null || _a === void 0 ? void 0 : _a.querySelector('.ball');
    switcher === null || switcher === void 0 ? void 0 : switcher.addEventListener('change', (e) => {
        var _a;
        const checked = (_a = e.target) === null || _a === void 0 ? void 0 : _a.checked;
        if (checked) {
            ball.classList.add('checked');
            ball.classList.remove('unchecked');
        }
        else {
            ball.classList.add('unchecked');
            ball.classList.remove('checked');
        }
    });
});

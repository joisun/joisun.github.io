"use strict";
const digitals = document.querySelectorAll('.digital-code');
/**
input 元素的值不是立即更新的，而是在 focus 的目标上更新，是因为 input 元素的值和焦点状态是绑定在一起的。
当用户在 input 元素中输入内容时，元素的 value 属性并不会立即更新，而是在用户离开 input 元素时（例如按下 Tab 键或点击其他元素），才会更新 value 属性的值。这是因为 input 元素的值是和焦点状态绑定在一起的，只有在焦点状态改变时，才会更新 input 元素的值。
 */
digitals[0].focus();
digitals.forEach((digital, index) => {
    digital.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
            if (index === 0)
                return;
            setTimeout(() => {
                digitals[index - 1].focus(), 10;
            });
        }
        else if (e.key >= '0' && e.key <= '9') {
            digitals[index].value = null;
            if (index >= digitals.length - 1)
                return;
            setTimeout(() => {
                digitals[index + 1].focus(), 10;
            });
        }
    });
});

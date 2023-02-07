const _Material = document.querySelector("#material-style");
const _Digital = document.querySelector("#digital-style");

const flips = document.querySelectorAll(".flip");
// 设定翻动方向
flips.forEach((flip) => {
  // 向下翻动
  flip.classList.add("down");
});
setInterval(update, 1000);
function update() {
  const time = new Date().toTimeString().split(" ")[0].split(":").join("").split("");
  flips.forEach((flip, index) => {
    [...flip.children].forEach((digital) => {
      const e = digital.className.includes("number");
      if (e) {
        const M = digital.className.match(/number\d/);
        // 数字一样则不用更新
        if (M[0] !== `number${time[index]}`) {
          flip.children[1].className = flip.children[1].className.replace(/number\d/, `number${time[index]}`);
          // digital.className = digital.className.replace(/number\d/, `number${time[index]}`);
          flip.classList.add("go");
          flip.classList.add("down");
          isFlipping = true;
          setTimeout(() => {
            flip.classList.remove("go");
            flip.classList.remove("down");
            flip.children[0].className = flip.children[0].className.replace(/number\d/, `number${time[index]}`);
            // 动画完成以后就可以移除动画类名 所以在 600 < x < 1000 以内都是可以的
          }, 590);
        }
      } else {
        digital.classList.add(`number${time[index]}`);
      }
    });
    // 向下翻动
    // 包含初始化
  });
}

const img = document.querySelector('img');
const video = document.querySelector('video');
const containers = document.querySelectorAll('.container') as NodeListOf<HTMLDivElement>;

let degree = 0;
let rotate = true;

containers[0].addEventListener('mouseenter', () => {
  rotate = false;
});
containers[0].addEventListener('mouseleave', () => {
  rotate = true;
  log();
});
containers[0].addEventListener('mousemove', (e) => {
  // 图片实现
  const { clientX, movementX } = e;
  const perc = clientX / innerWidth;
  degree = perc * 360;
  img.style.transform = `rotate(${degree}deg)`;
});
containers[1].addEventListener('mousemove', (e) => {
  // 视频实现
  const { clientX } = e;
  const perc = clientX / innerWidth;
  video.style.transform = `rotate(${perc * 360}deg)`;
});

log();
function log() {
  if (!rotate) return;
  requestAnimationFrame(() => {
    degree++;
    img.style.transform = `rotate(${degree}deg)`;
    log();
  });
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
// 设定css宽高和canvas 画板宽高1:1
const { width, height } = canvas.getClientRects()[0];
canvas.width = width;
canvas.height = height;

// line style
ctx.lineWidth = 1;

/* Types Definitions: */
type Point = { x: number; y: number };
type Branch = {
  startPoint: Point;
  angle: number;
  length: number;
};

/* Tool Functions: */

// 获取m 到 n 的随机整数
const getRandomInt = (from: number, to: number) => {
  return Math.floor(Math.random() * (to - from + 1)) + from;
};

// 根据极坐标转笛卡尔坐标
function getEndPoint(branch: Branch): Point {
  const { startPoint, angle, length } = branch;
  const x = startPoint.x + length * Math.cos((angle * Math.PI) / 180);
  const y = startPoint.y + length * Math.sin((angle * Math.PI) / 180);
  return { x, y };
}
// p1, p2 两点之间画线段
function lineTo(p1: Point, p2: Point) {
  ctx.beginPath(); // Start a new path
  ctx.moveTo(p1.x, p1.y); // Move the pen to point
  ctx.lineTo(p2.x, p2.y); // Draw a line to (150, 100)
  ctx.stroke(); // Render the path
}

//
function drawBranch(b: Branch) {
  lineTo(b.startPoint, getEndPoint(b));
}

function init() {
  const startBranch = {
    startPoint: { x: width / 2, y: 0 }, // 起始点
    angle: 90, // 树生成起点角度
    length: getRandomInt(10, 20), // 树根长度
  };
  step(startBranch);

  function step(b: Branch) {
    drawBranch(b);
    const end = getEndPoint(b);
    // 有0.5的概率是否生成左/右分支
    if (Math.random() > 0.5) {
      const rightBranch: Branch = {
        startPoint: end,
        angle: b.angle + 10,
        length: getRandomInt(30, 40),
      };
      step(rightBranch);
    }
    if (Math.random() > 0.5) {
      const leftBranch: Branch = {
        startPoint: end,
        angle: b.angle - 10,
        length: getRandomInt(30, 40),
      };
      step(leftBranch);
    }
  }
}

init();

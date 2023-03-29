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

function init(startBranch: Branch) {
  const pendingTasks: Function[] = [];
  function step(b: Branch, depth = 0) {
    // 为了生成的树效果更加茂盛,引入了depth值
    drawBranch(b);
    const end = getEndPoint(b);
    // 有0.5的概率是否生成左/右分支
    if (depth < 4 || Math.random() > 0.5) {
      const rightBranch: Branch = {
        startPoint: end,
        angle: b.angle + 10,
        length: getRandomInt(5, 10),
      };
      pendingTasks.push(() => step(rightBranch, depth + 1)); // 保存绘制步骤,不立即执行
    }
    if (depth < 4 || Math.random() > 0.5) {
      const leftBranch: Branch = {
        startPoint: end,
        angle: b.angle - 10,
        length: getRandomInt(5, 10),
      };
      pendingTasks.push(() => step(leftBranch, depth + 1));
    }
  }
  step(startBranch);

  // 动画支持
  function frame() {
    // pendingTasks 中函数的执行,即 step 的执行, step的执行又会修改pendingTasks, 所以这里,pendingTasks需要浅拷贝一份
    const tasks = [...pendingTasks];
    pendingTasks.length = 0; //清零
    if (tasks.length === 0) return;
    console.log("[tasks]: ", tasks);
    tasks.forEach((fn) => fn());
  }
  let frameCount = 0;
  function startFrame() {
    requestAnimationFrame(() => {
      frameCount += 1;
      if (frameCount % 3 === 0) {
        // 通过控制绘制帧率间隔以达到动画效果
        frame();
      }
      startFrame();
    });
  }
  startFrame();
}

const leftStartBranch = {
  startPoint: { x: 0, y: height * Math.random() }, // 起始点
  angle: 0, // 树生成起点角度
  length: getRandomInt(5, 10), // 树根长度
};
const rightStartBranch = {
  startPoint: { x: width, y: height * Math.random() }, // 起始点
  angle: 180, // 树生成起点角度
  length: getRandomInt(5, 10), // 树根长度
};

init(leftStartBranch);
init(rightStartBranch);

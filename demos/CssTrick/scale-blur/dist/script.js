const bg = document.querySelector(".bg");
const wrapper = document.querySelector("#wrapper");
let basic = 240;
let blur = 16;
document.addEventListener("wheel", (event) => {
  
  basic += Number((event.deltaY * 5).toFixed(0));
  bg.style.width = `${basic}px`;
  bg.style.height = `${basic}px`;
  
  blur += Number((event.deltaY * -0.1).toFixed(4));
  wrapper.style.backdropFilter=`blur(${blur}px)`;

  
});
const bg = document.querySelector(".bg");
const wrapper = document.querySelector("#wrapper");
let basic = 240;
let blur = 16;
document.addEventListener("wheel", (event) => {
  console.log(bg.style.width,"---",wrapper.style.backdropFilter)
  
  basic += Number((event.deltaY * 0.5).toFixed(0));
  bg.style.width = `${basic}px`;
  bg.style.height = `${basic}px`;
  
  blur += Number((event.deltaY * -0.01).toFixed(4));
  wrapper.style.backdropFilter=`blur(${blur}px)`;

  
});
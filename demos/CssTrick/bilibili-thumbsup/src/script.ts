const svgs = document.querySelectorAll("svg")
// document.addEventListener("click",(event:Event)=>{
//     if((event.target as HTMLElement).nodeName === "svg"){
//       (event.target as SVGElement).classList.toggle("on")
//     }
// })

function lightUpAll(){
    svgs.forEach(svg=>{
        svg.classList.add("on")
    })
}

triggerEventAfter(2000,()=>{
    lightUpAll();
    console.log("执行了！！")
})
function triggerEventAfter(duration:number,callback:()=>void){
    let timer = NaN
    let count = 0;
    document.addEventListener("mousedown",()=>{
        timer = setInterval(()=>{
          console.log(++count)
          if(count * 1000 >= duration){
            clearInterval(timer)
            callback()
          };
        },1000)
    })
    document.addEventListener("mouseup",()=>{
        count = 0;
        clearInterval(timer)
        console.log("up")
    })
}

function handleClick(){
    const c = document.querySelector("#test")
    c.classList.toggle("on")
}
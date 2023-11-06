const animateNumber = (el:Element,duration:number, from:number=0)=>{
    const to = Number(el.textContent)
    if(isNaN(to)) return;


    let count = from;
    function raf(){
        if(count === to) return;
        count += (to - count) / duration;
        el.textContent = count.toFixed(2);
        requestAnimationFrame(raf)
    }
    raf()

    // requestAnimationFrame
    console.log('to',to)

}

const numEls = document.querySelectorAll('.number')
numEls.forEach(numEl=>{
    const hasAnimateFlag = numEl.getAttribute('animate') !== null
    if(hasAnimateFlag){
        animateNumber(numEl,1000)
    }
})


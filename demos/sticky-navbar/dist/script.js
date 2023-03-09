"use strict";
const header = document.querySelector('header');
window.addEventListener('scroll', fixNav);
function fixNav() {
    console.log('trigger');
    if (window.scrollY >
        header.offsetHeight + 150) {
        header.classList.add('active');
    }
    else {
        header.classList.remove('active');
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const potrace_wasm_1 = require("potrace-wasm");
const convertCanvas2Svg = (canvas, config) => {
    return new Promise((resolve, reject) => {
        (0, potrace_wasm_1.loadFromCanvas)(canvas, config)
            .then((svg) => resolve(svg))
            .catch((err) => reject(err));
    });
};
console.log('convertCanvas2Svg', convertCanvas2Svg);
const $ = (className) => {
    const el = document.getElementsByClassName(className)[0];
    return el;
};
const fileInput = $('file-input');
fileInput.addEventListener("change", (e) => {
    const target = e.target;
    let fr = new FileReader();
    fr.onload = function () {
        //     imgElement.src = fr.result;
    };
    fr.readAsDataURL(target.files[0]);
});
// window.onload = function() {
//     let imageSelect = document.getElementById("imageSelect"),
//       imageInput = document.getElementById("imageInput"),
//       imgElement = document.getElementById("imgele"),
//       svgElement = document.getElementById("svgele");
//     let imgCanvas = document.createElement("canvas");
//     imageSelect.addEventListener(
//       "click",
//       function(e) {
//         imageInput.click();
//         e.preventDefault();
//       },
//       false
//     );
//     imageInput.addEventListener(
//       "change",
//       function(e) {
//         handleFiles(this.files);
//       },
//       false
//     );
//     function handleFiles(files) {
//       let fr = new FileReader();
//       fr.onload = function () {
//         imgElement.src = fr.result;
//       }
//       fr.readAsDataURL(files[0]);
//     }
//     function drawSVG(svg) {
//       var parser = new DOMParser();
//       var dom = parser.parseFromString(svg, "text/xml");
//       svgElement.innerHTML = '';
//       svgElement.appendChild(dom.documentElement);
//     }
//     function wasmReady() {
//       imgElement.onload = imgOnload;
//       imgElement.src = "kana.png";
//     }
//     function imgOnload() {
//       imgCanvas.width = imgElement.width;
//       imgCanvas.height = imgElement.height;
//       var ctx = imgCanvas.getContext("2d");
//       ctx.drawImage(imgElement, 0, 0);
//       let imagedata = ctx.getImageData(
//         0,
//         0,
//         imgCanvas.width,
//         imgCanvas.height
//       );
//       let convertSVG = Module.cwrap("convert_svg", "string", [
//         "array",
//         "number",
//         "number"
//       ]);
//       let svg = convertSVG(
//         imagedata.data,
//         imgCanvas.width,
//         imgCanvas.height
//       );
//       drawSVG(svg);
//     }
//     Module.onRuntimeInitialized = wasmReady;
// };

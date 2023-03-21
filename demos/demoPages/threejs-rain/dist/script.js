"use strict";
// **************
// Created using a tutorial from Redstapler
// **************
// Three JS needs mainly below three things
// SCENE
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x11111f, 0.002);
// CAMERA
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 1;
camera.rotation.x = 1.16;
camera.rotation.y = -0.12;
camera.rotation.z = 0.27;
// RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(scene.fog.color);
renderer.setSize(window.innerWidth, window.innerHeight);
// Append canvas to the body
document.body.appendChild(renderer.domElement);
// Ambient Light
const ambient = new THREE.AmbientLight(0x555555);
scene.add(ambient);
// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffeedd);
directionalLight.position.set(0, 0, 1);
scene.add(directionalLight);
// Point Light
const flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
flash.position.set(200, 300, 100);
scene.add(flash);
return;
// Rain Drop Texture
rainCount = 9500;
cloudParticles = [];
rainGeo = new THREE.Geometry();
for (let i = 0; i < rainCount; i++) {
    rainDrop = new THREE.Vector3(Math.random() * 400 - 200, Math.random() * 500 - 250, Math.random() * 400 - 200);
    rainDrop.velocity = {};
    rainDrop.velocity = 0;
    rainGeo.vertices.push(rainDrop);
}
rainMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.1,
    transparent: true,
});
rain = new THREE.Points(rainGeo, rainMaterial);
scene.add(rain);
// Smoke Texture Loader
let loader = new THREE.TextureLoader();
loader.load('https://raw.githubusercontent.com/navin-navi/codepen-assets/master/images/smoke.png', function (texture) {
    cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
    cloudMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
    });
    for (let p = 0; p < 25; p++) {
        let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.set(Math.random() * 800 - 400, 500, Math.random() * 500 - 500);
        cloud.rotation.x = 1.16;
        cloud.rotation.y = -0.12;
        cloud.rotation.z =
            Math.random() * 2 * Math.PI;
        cloud.material.opacity = 0.55;
        cloudParticles.push(cloud);
        scene.add(cloud);
    }
});
// Render animation on every rendering phase
function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    // Cloud Rotation Animation
    cloudParticles.forEach((p) => {
        p.rotation.z -= 0.002;
    });
    // RainDrop Animation
    rainGeo.vertices.forEach((p) => {
        p.velocity -= 3 * Math.random() * 1;
        p.y += p.velocity;
        if (p.y < -100) {
            p.y = 100;
            p.velocity = 0;
        }
    });
    rainGeo.verticesNeedUpdate = true;
    rain.rotation.y += 0.002;
    // Lightening Animation
    if (Math.random() > 0.96 || flash.power > 100) {
        if (flash.power < 100) {
            flash.position.set(Math.random() * 400, 300 + Math.random() * 200, 100);
        }
        flash.power = 50 + Math.random() * 500;
    }
}
render();
// Update Camera Aspect Ratio and Renderer ScreenSize on Window resize
window.addEventListener('resize', function () {
    camera.aspect =
        window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);
/*////////////////////////////////////////*/

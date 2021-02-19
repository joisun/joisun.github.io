//初始化渲染器
function initRenderer(additionalProperties) {

    var props = (typeof additionalProperties !== 'undefined' && additionalProperties) ? additionalProperties : {};
    var renderer = new THREE.WebGLRenderer(props); //{ antialias: true }用于替换props，抗锯齿，渲染效果精细，但是对设备要求较高。
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById("webgl-output").appendChild(renderer.domElement);

    return renderer;
}

//默认灯光
function initDefaultLighting(scene, initialPosition) {
    // var position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(0, 0, 0);
    var spotLight = new THREE.SpotLight(0xffffff);
    // spotLight.position.copy(position);
    spotLight.position.set(-500, 500, 500)
        // spotLight.lookAt
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    spotLight.shadow.camera.fov = 15;
    spotLight.castShadow = true;
    spotLight.decay = 2;
    spotLight.penumbra = 0.05;
    spotLight.name = "spotLight"

    scene.add(spotLight);


    var ambientLight = new THREE.AmbientLight(0x444444);
    ambientLight.name = "ambientLight";
    scene.add(ambientLight);

}

//初始化相机
function initCamera(initialPosition) {
    // var position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(-30, 40, 30);

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    // camera.position.copy(position);
    camera.position.set(-494, 296, 801);
    // camera.lookAt(new THREE.Vector3(-200, 0, 200));

    return camera;
}
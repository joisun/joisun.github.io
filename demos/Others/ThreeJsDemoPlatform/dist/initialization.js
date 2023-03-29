function init() {
    var stats = initStats();
    var renderer = initRenderer();
    var camera = initCamera();
    var scene = new THREE.Scene();
    var clock = new THREE.Clock();

    initDefaultLighting(scene);
    initModel()
    initControls();
    render();
    draw(scene);

    function initModel() {
        //辅助工具
        var helper = new THREE.AxesHelper(900);
        scene.add(helper);
        // var map = new THREE.TextureLoader().load("./assets/jay.jag");
        //外部盒子
        // var material = new THREE.MeshLambertMaterial({
        //     // map: map
        //     color: 0xffffff,
        // });
        // material.transparent = true;
        // material.opacity = 0.4;

        //--------------------------------地板--------------------------
        var planeGeometry = new THREE.PlaneGeometry(1000, 1000, 50, 50);
        var planeMaterial = new THREE.MeshLambertMaterial({
            color: 0xff00000,
            wireframe: true
        });
        planeMaterial.transparent = true;
        planeMaterial.opacity = 0.3;

        plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 0;
        plane.position.y = -6;
        plane.position.z = 0;


        //告诉底部平面需要接收阴影
        plane.receiveShadow = true;

        scene.add(plane);
        // scene.add(PlaneSegs);
        //--------------------------------地板end-----------------------
    }

    //初始化控制器
    var obtControls; //定义控制器变量
    function initControls() {
        //定义控制器核心           
        obtControls = new THREE.OrbitControls(camera, renderer.domElement);

        // 如果使用animate方法时，将此函数删除
        // controls.addEventListener('change', render);
        //以下都是为了满足各种需求的各种控制器配置参数
        obtControls.enableDampling = true; //使动画循环使用时阻尼或自转 意思是否有惯性
        obtControls.enableZoom = true; //是否允许缩放
        obtControls.enablePan = true; //是否开启鼠标右键拖拽
        obtControls.autoRotate = false; //是否允许自动旋转
        obtControls.dampingFactor = 0.25; //动态阻尼系数：就是鼠标拖拽旋转灵敏度
        obtControls.minDistance = 200; //设置相机距离原点的最近距离；
        obtControls.maxDistance = 1000; //设置相机距离原点的最远距离；

    }
    //控制更新
    function render() {
        stats.update();
        // fpControls.update(clock.getDelta());
        obtControls.update(clock.getDelta());
        requestAnimationFrame(render);
        renderer.render(scene, camera)
    }

}
function init() {
    // var stats = initStats();
    var renderer = initRenderer();
    var camera = initCamera();
    var scene = new THREE.Scene();
    var clock = new THREE.Clock();

    initDefaultLighting(scene);

    // FirstPersonControls控制器
    // var fpControls = new THREE.FirstPersonControls(camera);
    // fpControls.lookSpeed = 0.2;
    // fpControls.movementSpeed = 200;
    // fpControls.lookVertical = true;
    // fpControls.constrainVertical = true;
    // fpControls.enableDamping = false;
    // fpControls.verticalMin = 1.0;
    // fpControls.verticalMax = 2.0;
    // fpControls.lon = 230;
    // fpControls.lat = -230;
    // fpControls.lat = -230;
    
    var obtControls;// OribitControl控制器
    var doControls;// DeviceOrientationControls控制器

    var label = ""
    var docStatus = false; //deviceOrientationControls默认状态为关闭
    
    var MODE = { OBT: 0, DOC: 1 };
    var mode = MODE.OBT //默认obtControls

    document.getElementById('changeControl').addEventListener('click', function() {
        if (docStatus == false) {
            label = "开";
            docStatus = true;
            camera.position.set(0, 300, 0)
            camera.lookAt(new THREE.Vector3(-300, 100, 300));
            mode = MODE.DOC
        } else {
            label = "关";
            docStatus = false;
            camera.position.set(-494, 297, 801)
            camera.lookAt(new THREE.Vector3(0, 600, 0))
            mode = MODE.OBT
        }
        document.getElementById('statuslabel').innerHTML = label;
        initControls(mode)    

    })

    function initControls(mode) {
        switch (mode) {
            case MODE.OBT:
                console.log("mode now is:" + mode)
                initObtControls();
                console.log("执行initObtControls();")
                break;
            case MODE.DOC:
                console.log("mode now is:" + mode)
                initDeviceOrientationControls();
                console.log("执行initDeviceOrientationControls();")
                break;
        }
    }




    function initObtControls() {
        obtControls = new THREE.OrbitControls(camera, renderer.domElement);
        obtControls.enableDampling = false; //使动画循环使用时阻尼或自转 意思是否有惯性
        obtControls.enableZoom = true; //是否允许缩放
        obtControls.enableRotate = true; //是否允许旋转
        obtControls.enablePan = true; //是否开启鼠标右键拖拽
        obtControls.autoRotate = false; //是否允许自动旋转
        obtControls.autoRotateSpeed = 6.0; //旋转速度
        obtControls.dampingFactor = 0.25; //动态阻尼系数：就是鼠标拖拽旋转灵敏度
        obtControls.minDistance = 100; //设置相机距离原点的最近距离；
        obtControls.maxDistance = 8000; //设置相机距离原点的最远距离；
        obtControls.enabled = true
            // obtControls.target = new THREE.Vector3(350,500,-200)
            // obtControls.update()
    }

    function initDeviceOrientationControls() {
        obtControls.dispose();
        doControls = new THREE.DeviceOrientationControls(camera);
        doControls.enabled = true;
        // doControls.target = new THREE.Vector3(350,50,-200)
        // doControls.update()
    }





    function initModel() {
        //----------------------------------------------盒子----------------------
        //辅助工具
        var helper = new THREE.AxesHelper(900);
        scene.add(helper);
        var TextureLoader = new THREE.TextureLoader();
        var texturemap, texturenormalMap, texturebumpMap;
        texturemap = TextureLoader.load("./assets/1k/paper01_col.png");
        // texturemap = TextureLoader.load("./assets/2k/Stucco02_COL_VAR1_3K.jpg");
        // texturemap = TextureLoader.load("./assets/3k/Plaster36_COL_VAR2_3K.jpg");
        // texturemap = TextureLoader.load("./assets/4k/Marble063_COL_4K.jpg");
        texturenormalMap = TextureLoader.load("./assets/1k/paper01_norm.png");
        // texturenormalMap = TextureLoader.load("./assets/2k/Stucco02_NRM_3K.jpg");
        // texturenormalMap = TextureLoader.load("./assets/3k/Plaster36_NRM_3K.jpg");
        // texturenormalMap = TextureLoader.load("./assets/4k/Marble063_NRM_4K.jpg");
        texturebumpMap = TextureLoader.load("./assets/1k/paper01_roughness.png");
        // texturebumpMap = TextureLoader.load("./assets/2k/Stucco02_AO.jpg");
        // texturebumpMap = TextureLoader.load("./assets/3k/Plaster36_GLOSS_3K.jpg");
        // texturebumpMap = TextureLoader.load("./assets/4k/Marble063_GLOSS_4K.jpg");
        //外部盒子
        //宽面
        var texturemap0 = texturemap;
        texturemap0.wrapS = THREE.RepeatWrapping;
        texturemap0.wrapT = THREE.RepeatWrapping;
        texturemap0.repeat.set(1, 1);

        var texturenormalMap0 = texturenormalMap;
        texturenormalMap0.wrapS = THREE.RepeatWrapping;
        texturenormalMap0.wrapT = THREE.RepeatWrapping;
        texturenormalMap0.repeat.set(1, 1);

        var texturebumpMap0 = texturebumpMap;
        texturebumpMap0.wrapS = THREE.RepeatWrapping;
        texturebumpMap0.wrapT = THREE.RepeatWrapping;
        texturebumpMap0.repeat.set(1, 1);

        var material0 = new THREE.MeshPhongMaterial({
            map: texturemap0,
            normalMap: texturenormalMap0,
            bumpMap: texturebumpMap0,
            color: 0xffffff,
        });
        material0.transparent = true;
        material0.opacity = 0.8;

        //长面
        var texturemap1 = texturemap;
        texturemap1.wrapS = THREE.RepeatWrapping;
        texturemap1.wrapT = THREE.RepeatWrapping;
        texturemap1.repeat.set(3, 1);

        var texturenormalMap1 = texturenormalMap;
        texturenormalMap1.wrapS = THREE.RepeatWrapping;
        texturenormalMap1.wrapT = THREE.RepeatWrapping;
        texturenormalMap1.repeat.set(3, 1);

        var texturebumpMap1 = texturebumpMap;
        texturebumpMap1.wrapS = THREE.RepeatWrapping;
        texturebumpMap1.wrapT = THREE.RepeatWrapping;
        texturebumpMap1.repeat.set(3, 1);

        var material1 = new THREE.MeshPhongMaterial({
            map: texturemap1,
            normalMap: texturenormalMap1,
            // bumpMap:texturebumpMap1,
            color: 0xffffff,
        });
        material1.transparent = true;
        material1.opacity = 0.8;

        var material2 = new THREE.MeshPhongMaterial({ //地板材质
            // map: map,
            bumpMap: TextureLoader.load("./assets/ground.jpg"),
            morphTargets: true,
            color: 0x555555,
        });
        material2.transparent = true;
        material2.opacity = 1;

        //底面
        var cube = new THREE.Mesh(new THREE.BoxGeometry(800, 10, 400, 1, 1, 1), material2);
        cube.position.y = 0;
        cube.position.z = 0;
        cube.position.x = 0;
        scene.add(cube);

        //-x面
        // var cuberight = new THREE.Mesh(new THREE.BoxGeometry(50, 300, 400, 1, 1, 1), material);
        // cuberight.position.y = 145;
        // cuberight.position.z = 0;
        // cuberight.position.x = -425;
        // scene.add(cuberight);
        //+x面利用ThreeBSP.js扣出窗口
        //几何对象
        var bigBox = new THREE.BoxGeometry(50, 300, 400, 1, 1, 1);
        var smallBox = new THREE.BoxGeometry(50, 112, 180, 1, 1, 1);
        //网格模型及材料
        var bigBoxMesh = new THREE.Mesh(bigBox, material0);
        bigBoxMesh.position.set(400, 100, 0)
            //小矩形是将被扣掉的部分，不需要材料实际上
        var smallBoxMesh = new THREE.Mesh(smallBox, material0)
        smallBoxMesh.position.set(400, 140, 0)
            // new THREE.MeshBasicMaterial({color:0xff0000})
            //包装成ThreeBSP对象
        var bigBoxBSP = new ThreeBSP(bigBoxMesh);
        var smallBoxBSP = new ThreeBSP(smallBoxMesh);
        var result = bigBoxBSP.subtract(smallBoxBSP);
        //把计算结果的ThreeBSP对象转化成网格模型
        var windowBox = result.toMesh(material0);
        windowBox.position.set(425, 145, 0);
        scene.add(windowBox)

        // var cuberight = new THREE.Mesh(new THREE.BoxGeometry(50, 300, 400, 1, 1, 1), material0);
        // cuberight.position.y = 145;
        // cuberight.position.z = 0;
        // cuberight.position.x = 425;
        // scene.add(cuberight);


        //+z面
        // var cuberight = new THREE.Mesh(new THREE.BoxGeometry(900, 300, 50, 1, 1, 1), material);
        // cuberight.position.y = 145;
        // cuberight.position.z = 225;
        // cuberight.position.x = 0;
        // scene.add(cuberight);

        //-z面
        var cuberight = new THREE.Mesh(new THREE.BoxGeometry(900, 300, 50, 1, 1, 1), material1);
        cuberight.position.y = 145;
        cuberight.position.z = -225;
        cuberight.position.x = 0;
        scene.add(cuberight);
        //-------------------------------盒子end------------------------


        //--------------------------------地板--------------------------
        var planeGeometry = new THREE.PlaneGeometry(1000, 1000, 50, 50);
        var planeMaterial = new THREE.MeshLambertMaterial({
            color: 0x333333,
            wireframe: true
        });

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
    initModel();
    initPipes(scene);
    initControls(mode)//页面加载初始化的时候会默认的执行一次，参数是MODE.OBT


    render();

    function render() {
        // stats.update();
        // fpControls.update(clock.getDelta());\
        if(mode == 0){
            obtControls.update(clock.getDelta());//刷新轨道控制器OrbitControls
        }else{
            doControls.update();//刷新陀螺仪控制器DeviceOrientationControls
        }
        requestAnimationFrame(render);
        document.getElementById("position_label_x").innerHTML = "x:" + camera.position.x
        document.getElementById("position_label_y").innerHTML = "y:" + camera.position.y
        document.getElementById("position_label_z").innerHTML = "z:" + camera.position.z
        renderer.render(scene, camera)
    }




}
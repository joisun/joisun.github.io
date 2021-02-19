    function initPipes(scene) {
        //--------------------------------管道--------------------------
        //辅助工具
        var helper = new THREE.AxesHelper(900);
        scene.add(helper);
        //pipe0
        var //定义管子的不同口径，材料，厚度
            tubularSegments = 500,
            radius = 5,
            radius2 = 3,
            radius3 = 10,
            radius4 = 8,
            radialSegments = 20,
            closed = false,
            thickness1 = 1, //管子的厚度
            thickness2 = 0.8,
            thickness3 = 0.6,
            thickness4 = 0.4

        // path— Curve - 一个由基类Curve继承而来的路径。
        // tubularSegments— Integer - 组成这一管道的分段数， 默认值为64。
        // radius— Float - 管道的半径， 默认值为1。
        // radialSegments— Integer - 管道横截面的分段数目， 默认值为8。
        // closed— Boolean 管道的两端是否闭合， 默认值为false。
        var meshMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            // wireframe: true
        });
        var meshMaterial2 = new THREE.MeshPhongMaterial({
            color: 0x159968,
            side: THREE.DoubleSide,
            // wireframe: true
        });
        var meshMaterial3 = new THREE.MeshPhongMaterial({
            color: 0xdf3c43,
            side: THREE.DoubleSide,
            // wireframe: true
        });
        // ---------------------------------------------定义管道绘制点Start----------------------------
        var pipe0 = [
            [450, 100, 120],
            [437.5, 100, 120],
            [425, 87.5, 120],
            [425, 85, 120],
            [425, 35, 120],
            [425, 32.5, 120],
            [412.5, 20, 120],
            [410, 20, 120],
            [-235, 20, 120],
            [-237.5, 20, 120],
            [-250, 20, 132.5],
            [-250, 20, 135],
            [-250, 20, 250]
        ]
        var gap = 12
        var pipe1 = [
            [450, 100, 120 - gap],
            [437.5, 100, 120 - gap],
            [425, 87.5, 120 - gap],
            [425, 85, 120 - gap],
            [425, 35, 120 - gap],
            [425, 32.5, 120 - gap],
            [412.5, 20, 120 - gap],
            [410, 20, 120 - gap],
            [-235 - gap, 20, 120 - gap],
            [-237.5 - gap, 20, 120 - gap],
            [-250 - gap, 20, 132.5 - gap],
            [-250 - gap, 20, 135 - gap],
            [-250 - gap, 20, 250]
        ]
        var gap2 = 24;
        var pipe2 = [
                [450, 100, 120 - gap2],
                [437.5, 100, 120 - gap2],
                [425, 87.5, 120 - gap2],
                [425, 85, 120 - gap2],
                [425, 35, 120 - gap2],
                [425, 32.5, 120 - gap2],
                [412.5, 20, 120 - gap2],
                [410, 20, 120 - gap2],
                [-235 - gap2, 20, 120 - gap2],
                [-237.5 - gap2, 20, 120 - gap2],
                [-250 - gap2, 20, 132.5 - gap2],
                [-250 - gap2, 20, 135 - gap2],
                [-250 - gap2, 20, 250]
            ]
            //pipe3
        var gap3 = 36
        var pipe3 = [
                [450, 100, 120 - gap3],
                [437.5, 100, 120 - gap3],
                [425, 87.5, 120 - gap3],
                [425, 85, 120 - gap3],
                [425, 35, 120 - gap3],
                [425, 32.5, 120 - gap3],
                [412.5, 20, 120 - gap3],
                [410, 20, 120 - gap3],
                [-348, 20, 120 - gap3],
                [-350, 20, 120 - gap3],
                [-350, 20, -250]
            ]
            //pipe4
        var gap4 = 48
        var pipe4 = [
            [450, 100, 120 - gap4],
            [437.5, 100, 120 - gap4],
            [425, 87.5, 120 - gap4],
            [425, 85, 120 - gap4],
            [425, 35, 120 - gap4],
            [425, 32.5, 120 - gap4],
            [412.5, 20, 120 - gap4],
            [410, 20, 120 - gap4],
            [-333, 20, 120 - gap4],
            [-335, 20, 120 - gap4],
            [-335, 20, -250]
        ];
        //pipe5小管径
        var pipe5 = [
            [100, 330, -155],
            [100, 330, -215],
            [100, 330, -218],
            [100, 328, -220],
            [100, 325, -220],
            [100, 25, -220],
            [100, 23, -220],
            [100, 20, -200],
            [100, 20, -197],
            [100, 20, 58], //小管上绕
            [100, 20, 60],
            [100, 30, 66],
            [100, 30, 68],
            [100, 30, 126], //小管下绕
            [100, 30, 128],
            [100, 20, 132],
            [100, 20, 135],
            [100, 20, 250]
        ];

        //pipe6
        var gap6 = 12
        var pipe6 = [
            [100 + gap6, 330, -155],
            [100 + gap6, 330, -215],
            [100 + gap6, 330, -218],
            [100 + gap6, 328, -220],
            [100 + gap6, 325, -220],
            [100 + gap6, 25, -220],
            [100 + gap6, 23, -220],
            [100 + gap6, 20, -200],
            [100 + gap6, 20, -197],
            [100 + gap6, 20, 58], //小管上绕
            [100 + gap6, 20, 60],
            [100 + gap6, 30, 66],
            [100 + gap6, 30, 68],
            [100 + gap6, 30, 126], //小管下绕
            [100 + gap6, 30, 128],
            [100 + gap6, 20, 132],
            [100 + gap6, 20, 135],
            [100 + gap6, 20, 250]
        ];
        //pipe7
        var gap7 = 24
        var pipe7 = [
            [100 + gap7, 310, -100],
            [100 + gap7, 310, -95],
            [100 + gap7, 310, -220],
            [100 + gap7, 310, -220],
            [100 + gap7, 25, -220],
            [100 + gap7, 23, -220],
            [100 + gap7, 20, -200],
            [100 + gap7, 20, -197],
            [100 + gap7, 20, -90],
            [100 + gap7, 20, -85],
            [105 + gap7, 20, -80],
            [110 + gap7, 20, -80],
            [450, 20, -80]
        ];

        //pipe8(天花板，绿色粗管,靠里面的)
        var pipe8 = [
            [350, 330, -250],
            [350, 330, 250]
        ];
        //pipe9(天花板,绿色粗管)
        var pipe9 = [
            [380, 330, -250],
            [380, 330, 250]
        ];
        //pipe10(天花板)
        var pipe10 = [
            [350, 330, -150],
            [-450, 330, -150]
        ];
        //pipe11(天花板)
        var pipe11 = [
            [380, 330, -100],
            [380, 325, -100],
            [380, 320, -100],
            [375, 310, -100],
            [370, 310, -100],
            [-450, 310, -100]
        ];
        // ---------------------------------------------定义管道绘制点End----------------------------



        // ---------------------------------------------管道绘制函数----------------------------
        function drawpipes(pipes, meshMaterial, radius, name = "null") { //给定name一个默认参数“null”，给不给都无所谓，不给的话，如果调用的时候也没有给定该参数，该模型的name属性值就是undefined
            var points = pipes.map(d => new THREE.Vector3(d[0], d[1], d[2]))
            var tubeGeometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), tubularSegments, radius, radialSegments, closed);
            var tubeMesh = new THREE.Mesh(tubeGeometry, meshMaterial);
            tubeMesh.name = name
                // console.log(tubeMesh)
            scene.add(tubeMesh)
        }
        drawpipes(pipe0, meshMaterial, radius, "pipe0")
        drawpipes(pipe1, meshMaterial, radius)
        drawpipes(pipe2, meshMaterial, radius)
        drawpipes(pipe3, meshMaterial3, radius, "pipe3")
        drawpipes(pipe4, meshMaterial3, radius)
        drawpipes(pipe5, meshMaterial2, radius2)
        drawpipes(pipe6, meshMaterial2, radius2)
        drawpipes(pipe7, meshMaterial2, radius2, "pipe7")
        drawpipes(pipe8, meshMaterial2, radius3, "pipe8")
        drawpipes(pipe9, meshMaterial2, radius3)
        drawpipes(pipe10, meshMaterial2, radius4)
        drawpipes(pipe11, meshMaterial2, radius4, "pipe11")


        // ---------------------------------------------管道首尾段通过ExtrudeGeometry添加厚度效果---
        // ---------由于管子的进出口，都在墙面，一个方体的四周，这里只定义了端口面绕着y轴旋转-----------
        // ---------有待进一步研究怎么让它任意旋转，例如通过向量自动判断计算判断x，y，z轴的垂直面的管子--
        // ---------更进一步的，任意方向的管子，应该需要应用到欧拉角，官方有此api，待进一步学习---------
        function drawEnd(pipes, radius, thickness, meshMaterial, startRotate, endRotate) { //管子数组，管子的半径，厚度，管子材料，首段旋转角，尾端旋转角
            var xstart = pipes[0][0];
            var ystart = pipes[0][1];
            var zstart = pipes[0][2];
            var xend = pipes[pipes.length - 1][0];
            var yend = pipes[pipes.length - 1][1];
            var zend = pipes[pipes.length - 1][2];

            var ringShape = new THREE.Shape();
            ringShape.arc(0, 0, radius, 0, Math.PI * 2);
            let hole = new THREE.Path();
            hole.arc(0, 0, radius - thickness, 0, Math.PI * 2);
            ringShape.holes.push(hole);
            var ringGeom = new THREE.ExtrudeGeometry(ringShape, {
                amount: 5, //拉伸的深度
                bevelEnabled: false, //开启斜角
                curveSegments: 100, //拉伸的段数
                steps: 1 //沿深度方向的段数
            })
            var startRing = new THREE.Mesh(ringGeom, meshMaterial);
            startRing.position.set(xstart, ystart, zstart)
            startRing.rotation.y = startRotate
            var endRing = new THREE.Mesh(ringGeom, meshMaterial);
            endRing.position.set(xend, yend, zend)
            endRing.rotation.y = endRotate

            scene.add(startRing);
            scene.add(endRing);
        }
        drawEnd(pipe0, radius, thickness3, meshMaterial, Math.PI / 2, Math.PI);
        drawEnd(pipe1, radius, thickness3, meshMaterial, Math.PI / 2, Math.PI);
        drawEnd(pipe2, radius, thickness3, meshMaterial, Math.PI / 2, Math.PI);
        drawEnd(pipe3, radius, thickness3, meshMaterial3, Math.PI / 2, Math.PI);
        drawEnd(pipe4, radius, thickness3, meshMaterial3, Math.PI / 2, Math.PI);
        drawEnd(pipe5, radius2, thickness4, meshMaterial2, Math.PI / 2, Math.PI);
        drawEnd(pipe6, radius2, thickness4, meshMaterial2, Math.PI / 2, Math.PI);
        drawEnd(pipe7, radius2, thickness4, meshMaterial2, Math.PI / 2, Math.PI / 2);
        drawEnd(pipe8, radius3, thickness1, meshMaterial2, Math.PI, Math.PI);
        drawEnd(pipe9, radius3, thickness1, meshMaterial2, Math.PI, Math.PI);
        drawEnd(pipe10, radius4, thickness2, meshMaterial2, Math.PI / 2, Math.PI / 2);
        drawEnd(pipe11, radius4, thickness2, meshMaterial2, Math.PI / 2, Math.PI / 2);

        //精灵图片
        var spriteMap = new THREE.TextureLoader().load("./assets/aaa.png");
        var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
        var sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.set(-300, 100, 300);
        sprite.scale.set(200, 200, 20)
        scene.add(sprite);

        //给墙体加两个相框装饰
        var frameMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        var frameleft = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 5, 1, 1, 1), frameMaterial);
        frameleft.position.set(-120, 200, -200);
        // scene.add(frameleft);

        var frameright = frameleft.clone();
        frameright.position.set(-50, 200, -200);
        // scene.add(frameright);


        //导入一个门模型

        var doorMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            // map:TextureMap,
            // side:
        });

        let mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('./assets/module/door/')
        mtlLoader.load('door.mtl', function(doorMaterial) {
            doorMaterial.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(doorMaterial);
            objLoader.setPath("./assets/module/door/");
            objLoader.load('door.obj', function(object) {
                object.scale.set(0.9, 0.9, 3);
                object.position.set(-300, 25, -258)
                    // console.log(object)
                    // object.children.forEach(d => {
                    // 	d.castShadow = true;
                    // 	d.receiveShadow = true;
                    // })
                scene.add(object)
            })
        })

        //导入窗户模型
        var winMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            // map:TextureMap,
            // side:
        });

        let mtlLoader2 = new THREE.MTLLoader();
        mtlLoader2.setPath('./assets/module/window/01/')
        mtlLoader2.load('window01.mtl', function(winMaterial) {
            winMaterial.preload();
            var objLoader2 = new THREE.OBJLoader();
            objLoader2.setMaterials(winMaterial);
            objLoader2.setPath("./assets/module/window/01/");
            objLoader2.load('window01.obj', function(object) {
                object.scale.set(0.9, 0.5, 4);
                object.position.set(402, 130, 0)
                object.rotation.y = Math.PI / 2
                    // console.log(object)
                    // object.children.forEach(d => {
                    // 	d.castShadow = true;
                    // 	d.receiveShadow = true;
                    // })
                scene.add(object)
            })
        })

        //导入壁画模型
        var frescoMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            // map:TextureMap,
            // side:
        });

        let mtlLoader3 = new THREE.MTLLoader();
        mtlLoader3.setPath('./assets/module/fresco/')
        mtlLoader3.load('modown_models_37_47.mtl', function(frescoMaterial) {
            frescoMaterial.preload();
            var objLoader3 = new THREE.OBJLoader();
            objLoader3.setMaterials(frescoMaterial);
            objLoader3.setPath("./assets/module/fresco/");
            objLoader3.load('modown_models_37_47.obj', function(object) {
                object.scale.set(2, 2, 1);
                object.position.set(-50, 200, -200)
                    // object.rotation.y = Math.PI
                    // console.log(object)
                    // object.children.forEach(d => {
                    // 	d.castShadow = true;
                    // 	d.receiveShadow = true;
                    // })
                scene.add(object)
            })
        })

    }
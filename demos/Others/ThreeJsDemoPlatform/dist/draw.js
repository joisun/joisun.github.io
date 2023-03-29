function draw(scene) {
    var
        tubularSegments = 500,
        radius = 5,
        radius2 = 3,
        radialSegments = 20,
        closed = false
        // path— Curve - 一个由基类Curve继承而来的路径。
        // tubularSegments— Integer - 组成这一管道的分段数， 默认值为64。
        // radius— Float - 管道的半径， 默认值为1。
        // radialSegments— Integer - 管道横截面的分段数目， 默认值为8。
        // closed— Boolean 管道的两端是否闭合， 默认值为false。
    var meshMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        // wireframe: true
    });
    // meshMaterial.transparent = true;
    // meshMaterial.opacity = 0.5;
    var points = [];

    points.push(new THREE.Vector3(450, 100, 120));
    points.push(new THREE.Vector3(437.5, 100, 120));
    points.push(new THREE.Vector3(425, 87.5, 120));
    points.push(new THREE.Vector3(425, 85, 120));
    points.push(new THREE.Vector3(425, 35, 120));
    points.push(new THREE.Vector3(425, 32.5, 120));
    points.push(new THREE.Vector3(412.5, 20, 120));
    points.push(new THREE.Vector3(410, 20, 120));
    points.push(new THREE.Vector3(-235, 20, 120));
    points.push(new THREE.Vector3(-237.5, 20, 120));
    points.push(new THREE.Vector3(-250, 20, 132.5));
    points.push(new THREE.Vector3(-250, 20, 135));
    points.push(new THREE.Vector3(-250, 20, 250));
    var tubeGeometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), tubularSegments, radius, radialSegments, closed);
    var tubeMesh = new THREE.Mesh(tubeGeometry, meshMaterial)
    scene.add(tubeMesh)
}
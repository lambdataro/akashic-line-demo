export = function (param: g.GameMainParameterObject): void {
    const scene = new g.Scene({game: g.game});
    scene.loaded.add(onSceneLoaded.bind(null, scene));
    g.game.pushScene(scene);
}

function onSceneLoaded(scene: g.Scene) {
    let x1 = 200;
    let y1 = 100;
    let x2 = 500;
    let y2 = 300;
    // 背景
    scene.append(new g.FilledRect({
        scene,
        cssColor: "#EEEEEE",
        width: g.game.width,
        height: g.game.height
    }));
    // 頂点
    const pointSize = 20;
    const pt1 = new g.FilledRect({
        scene,
        cssColor: "#0000FF",
        width: pointSize,
        height: pointSize,
        x: x1 - pointSize / 2,
        y: y1 - pointSize / 2,
        touchable: true
    });
    pt1.pointMove.add(e => {
        pt1.moveBy(e.prevDelta.x, e.prevDelta.y);
        x1 += e.prevDelta.x;
        y1 += e.prevDelta.y;
        pt1.modified();
    });
    scene.append(pt1);
    const pt2 = new g.FilledRect({
        scene,
        cssColor: "#0000FF",
        width: pointSize,
        height: pointSize,
        x: x2 - pointSize / 2,
        y: y2 - pointSize / 2,
        touchable: true
    });
    pt2.pointMove.add(e => {
        pt2.moveBy(e.prevDelta.x, e.prevDelta.y);
        x2 += e.prevDelta.x;
        y2 += e.prevDelta.y;
        pt2.modified();
    });
    scene.append(pt2);
    // 線分
    const line = new g.FilledRect({
        scene,
        cssColor: "#FF0000",
        width: 0,
        height: 0
    });
    scene.append(line);
    scene.update.add(() => {
        const lineWidth = 5;
        const lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const lineAngle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
        line.width = lineLength;
        line.height = lineWidth;
        line.angle = lineAngle;
        line.x = (x2 + x1 - lineLength) / 2;
        line.y = (y2 + y1 - lineWidth) / 2;
        line.modified();
    });
}

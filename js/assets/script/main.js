window.gLocalAssetContainer["main"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
function onSceneLoaded(scene) {
    var x1 = 200;
    var y1 = 100;
    var x2 = 500;
    var y2 = 300;
    // 背景
    scene.append(new g.FilledRect({
        scene: scene,
        cssColor: "#EEEEEE",
        width: g.game.width,
        height: g.game.height
    }));
    // 頂点
    var pointSize = 20;
    var pt1 = new g.FilledRect({
        scene: scene,
        cssColor: "#0000FF",
        width: pointSize,
        height: pointSize,
        x: x1 - pointSize / 2,
        y: y1 - pointSize / 2,
        touchable: true
    });
    pt1.pointMove.add(function (e) {
        pt1.moveBy(e.prevDelta.x, e.prevDelta.y);
        x1 += e.prevDelta.x;
        y1 += e.prevDelta.y;
        pt1.modified();
    });
    scene.append(pt1);
    var pt2 = new g.FilledRect({
        scene: scene,
        cssColor: "#0000FF",
        width: pointSize,
        height: pointSize,
        x: x2 - pointSize / 2,
        y: y2 - pointSize / 2,
        touchable: true
    });
    pt2.pointMove.add(function (e) {
        pt2.moveBy(e.prevDelta.x, e.prevDelta.y);
        x2 += e.prevDelta.x;
        y2 += e.prevDelta.y;
        pt2.modified();
    });
    scene.append(pt2);
    // 線分
    var line = new g.FilledRect({
        scene: scene,
        cssColor: "#FF0000",
        width: 0,
        height: 0
    });
    scene.append(line);
    scene.update.add(function () {
        var lineWidth = 5;
        var lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        var lineAngle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
        line.width = lineLength;
        line.height = lineWidth;
        line.angle = lineAngle;
        line.x = (x2 + x1 - lineLength) / 2;
        line.y = (y2 + y1 - lineWidth) / 2;
        line.modified();
    });
}
module.exports = function (param) {
    var scene = new g.Scene({ game: g.game });
    scene.loaded.add(onSceneLoaded.bind(null, scene));
    g.game.pushScene(scene);
};

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}
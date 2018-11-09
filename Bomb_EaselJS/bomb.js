function init() {
    console.info("page loaded");
    var stage = new createjs.Stage("game");

    var mouse = {
        x: 0,
        y: 0
    };

    var bombSpriteSheet = new createjs.SpriteSheet({
            images: ["b.png", "d.png"],
            frames: [
                [0, 0, 100, 100, 0, 50, 50],
                [0, 0, 256, 249, 1, 128, 124.5]
            ],
            animations: {
                rotate: [0, 647, "rotate"],
                explosion: [0, 15]
            },
            framerate: 30
        });

    var beginRect = 128.5;
    var WIDTH = stage.width - beginRect * 2;
    var HEIGHT = stage.height - beginRect * 2;
    var R = 25;

    var field = new createjs.Container();
    var background = new createjs.Shape();
    background.graphics
        .beginStroke("black")
        .beginFill("ECF5E9")
        .rect(beginRect, beginRect, WIDTH, HEIGHT);
}
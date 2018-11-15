function init() {
    console.info("page loaded");
    var stage = new createjs.Stage("game");
    var scene = document.getElementById("game");
    var bombSpriteSheet = new createjs.SpriteSheet({
            images: ["b.png" /*, "d.png"*/],
            frames: {x: 0, y: 0, width: 100, height: 100, regX: 50, regY: 50},
            /*frames: [
                [0, 0, 100, 100, 0, 50, 50],
                [0, 0, 256, 249, 1, 128, 124.5]
            ],*/
            animations: {
                rotate: [0, 647, "rotate"]
            },
            framerate: 30
        });
    var explosionSpriteSheet = new createjs.SpriteSheet({
            images: ["d.png"],
            frames: {x: 0, y: 0, width: 256, height: 249, regX: 128, regY: 124.5},
            animations: {
                explode: [0, 15, null]
            },
            framerate: 30
    });
    var beginRect = 128.5;
    var WIDTH = scene.width - beginRect * 2;
    var HEIGHT = scene.height - beginRect * 2;
    var R = 25;
    var field = new createjs.Container();
    var background = new createjs.Shape();

    background.graphics
        .beginStroke("black")
        .beginFill("#000057")
        .rect(0, 0, WIDTH, HEIGHT);
    stage.addChild(field);
    field.addChild(background);

    function bomb_tick(e) {
        var bomb = e.target;
        bomb.x += bomb.dx;
        bomb.y += bomb.dy;
        if (bomb.x > WIDTH - R || bomb.x < R)
            bomb.dx *= -1;
        if (bomb.y > HEIGHT - R || bomb.y < R)
            bomb.dy *= -1;
    }

    function bomb_click(e) {
        var bomb = e.target;
        if (bomb.exploded)
            return;
        bomb.exploded = true;
        field.removeChild(bomb);
        var explosion = new createjs.Sprite(explosionSpriteSheet);
        field.addChild(explosion);
        explosion.x = bomb.x;
        explosion.y = bomb.y;
        explosion.gotoAndPlay("explode");
        explosion.scale = 0.25;
        bomb.addEventListener('animationend', function () {
            field.removeChild(explosion);
        });
    }

    function add_bomb(x, y, dx, dy) {
        if (x > WIDTH - R || x < R || y > HEIGHT - R || y < R)
            return;
        var bomb = new createjs.Sprite(bombSpriteSheet);
        bomb.gotoAndPlay("rotate");
        field.addChild(bomb);
        bomb.x = x;
        bomb.y = y;
        bomb.dx = dx;
        bomb.dy = dy;
        bomb.exploded = false;
        bomb.scale = 0.5;
        bomb.addEventListener('tick', bomb_tick);
        bomb.addEventListener('click', bomb_click);
    }

    field.addEventListener('click', function (e) {
       if (e.target === background) {
           var random_angle = Math.random() * 2 * Math.PI;
           add_bomb(e.localX, e.localY, Math.cos(random_angle), Math.sin(random_angle));
       }
    });

    field.x = beginRect;
    field.y = beginRect;

    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.framerate = 60;
    createjs.Ticker.timerMode = createjs.Ticker.RAF_SYNCHED;
}
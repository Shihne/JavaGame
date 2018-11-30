function init() {
    console.info("page loaded");

    var stage = new createjs.Stage("game");
    var scene = document.getElementById("game");
    var protagonistSpriteSheet = new createjs.SpriteSheet({
        images: ["protagonist.png"],
        frames: {
            x: 0,
            y: 0,
            width: 800,
            height: 600,
            regX: 400,
            regY: 300
        },
        animations: {
            stand: [0],
            walk: [0, 30, "walk"]
        },
        framerate: 30
    });
    var WIDTH = scene.width;
    var HEIGHT = scene.height;
    var field = new createjs.Container();
    var background = new createjs.Bitmap("background.png");
    var background_WIDTH = 1920;
    var background_HEIGHT = 1080;
    background.regY = background_HEIGHT - HEIGHT;
    background.cX = 0;
    stage.addChild(field);
    field.addChild(background);



    function protagonist_tick(e) {
        var protagonist = e.target;
        if (protagonist.x === 60 && protagonist_action === 'L')
            protagonist.x += 0;
        else if (protagonist.x < WIDTH / 2 || (background.cX === 0 && protagonist_action === 'L'))
            protagonist.x += protagonist.dx;
        else if (background.cX < background_WIDTH - WIDTH) {
            background.x -= protagonist.dx;
            background.cX += protagonist.dx;
        } else if (protagonist.x === WIDTH / 2 && background.cX === background_WIDTH - WIDTH && protagonist_action === 'L') {
            background.x += 1;
            background.cX -= 1;
        } else if (background.cX === background_WIDTH - WIDTH && protagonist_action === 'R')
            protagonist.x += protagonist.dx;
        //else if (background.cX === background_WIDTH - WIDTH && protagonist.x > WIDTH / 2)

    }

    var protagonist_action = '';

    function protagonist_walk(e) {
        if (protagonist_action === 'R' || protagonist_action === 'L')
            return;
        if (e.keyCode === 68) {
            protagonist_action = 'R';
            protagonist.dx = 5;
            protagonist.scaleX = 0.4;
        } else if (e.keyCode === 65) {
            protagonist_action = 'L';
            protagonist.dx = -5;
            protagonist.scaleX = -0.4;
        } else return;
        protagonist.gotoAndPlay("walk");
    }

    function protagonist_stop() {
        protagonist_action = '';
        protagonist.dx = 0;
        protagonist.gotoAndPlay("stand");
    }

    var protagonist = new createjs.Sprite(protagonistSpriteSheet, "stand");
    field.addChild(protagonist);
    protagonist.x = 60;
    protagonist.y = 600;
    protagonist.scale = 0.4;
    protagonist.dx = 0;
    protagonist.addEventListener('tick', protagonist_tick);
    this.document.onkeydown = protagonist_walk;
    this.document.onkeyup = protagonist_stop;


    field.addEventListener('click', function (e) {
        console.info(e.localX + " : " + e.localY);
    });

    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.framerate = 60;
    createjs.Ticker.timerMode = createjs.Ticker.RAF_SYNCHED;
}
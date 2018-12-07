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
    var g = 10;
    background.regY = background_HEIGHT - HEIGHT;
    background.cX = 0;
    stage.addChild(field);
    field.addChild(background);



    function protagonist_tick(e) {
        var protagonist = e.target;
        if (protagonist.x === 60 && protagonist_direction === 'L' ||
            protagonist.x === WIDTH - 60 && protagonist_direction === 'R')
            protagonist.x += 0;
        else if ((protagonist.x < WIDTH / 2 && background.cX === 0) ||
            (protagonist.x === WIDTH / 2 && background.cX === 0 && protagonist_direction === 'L') ||
            (protagonist.x === WIDTH / 2 && background.cX === background_WIDTH - WIDTH && protagonist_direction === 'R') ||
            (protagonist.x > WIDTH / 2 && background.cX === background_WIDTH - WIDTH))
            protagonist.x += protagonist.dx;
        else if (background.cX < background_WIDTH - WIDTH ||
            (protagonist.x === WIDTH / 2 && background.cX === background_WIDTH - WIDTH && protagonist_direction === 'L')) {
            background.x -= protagonist.dx;
            background.cX += protagonist.dx;
        }
        //} else if (background.cX === background_WIDTH - WIDTH && protagonist_action === 'R')
        //    protagonist.x += protagonist.dx;
        //else if (background.cX === background_WIDTH - WIDTH && protagonist.x > WIDTH / 2)

    }

    var protagonist_direction = '';

    function protagonist_walk(e) {
        var new_direction = '';
        if (e.keyCode === 68 || e.keyCode === 39) {
            new_direction = 'R';
        } else if (e.keyCode === 65 || e.keyCode === 37) {
            new_direction = 'L';
        } //else if (e.keyCode === 32)
        else
            return;

        if (new_direction !== protagonist_direction/* && new_action !== ''*/) {
            protagonist_direction = new_direction;

            if (protagonist_direction === 'R') {
                protagonist.dx = 5;
                protagonist.scaleX = 0.4;
            } else if (protagonist_direction === 'L') {
                protagonist.dx = -5;
                protagonist.scaleX = -0.4;
            }

            // if (protagonist_action !== '')
            protagonist.gotoAndPlay("walk");
        }
    }

    /*function protagonsit_action(e) {
        if (e.keyCode === 32) {
            protagonist.dy = -20;

        }
    }*/

    function protagonist_stop(e) {
        if ((e.keyCode === 68 || e.keyCode === 39) && protagonist_direction === 'R' ||
            (e.keyCode === 65 || e.keyCode === 37) && protagonist_direction === 'L') {
            protagonist_direction = '';
            protagonist.dx = 0;
            protagonist.dy = 0;
            protagonist.gotoAndPlay("stand");
        }
    }

    var protagonist = new createjs.Sprite(protagonistSpriteSheet, "stand");
    field.addChild(protagonist);
    protagonist.x = 60;
    protagonist.y = 600;
    protagonist.scale = 0.4;
    protagonist.dx = 0;
    protagonist.addEventListener('tick', protagonist_tick);
    this.document.onkeydown = protagonist_walk;
    this.document.onkeydown = protagonist_action;
    this.document.onkeyup = protagonist_stop;


    field.addEventListener('click', function (e) {
        //console.info(e.localX + " : " + e.localY);
        console.info("protagonist.x : " + protagonist.x);
        console.info("background.cx : " + background.cX);
    });

    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.framerate = 60;
    createjs.Ticker.timerMode = createjs.Ticker.RAF_SYNCHED;
}
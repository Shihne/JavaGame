function init() {
    console.info("page loaded");

    var stage = new createjs.Stage("game");
    var scene = document.getElementById("game");
    var protagonistSpriteSheet = new createjs.SpriteSheet({
        images: ["spritesheet.png"],
        frames: {
            x: 0,
            y: 0,
            width: 800,
            height: 600,
            regX: 400,
            regY: 300
        },
        animations: {
            stand: [9],
            walk: [0, 29, "walk"],
            run: [30, 49, "run"]
        },
        framerate: 30
    });
    var WIDTH = scene.width;
    var HEIGHT = scene.height;
    var field = new createjs.Container();
    var background = new createjs.Bitmap("background.png");
    var background_WIDTH = 1920;
    var background_HEIGHT = 1080;
    var g = 0.1;
    background.regY = background_HEIGHT - HEIGHT;
    background.cX = 0;
    stage.addChild(field);
    field.addChild(background);


    function protagonist_tick(e) {
        var protagonist = e.target;
        if (protagonist.x === 60 && protagonist_direction === 'L' ||
            protagonist.x === WIDTH - 60 && protagonist_direction === 'R') {
            protagonist.x += 0;

        } else if ((protagonist.x < WIDTH / 2 && background.cX === 0) ||
            (protagonist.x === WIDTH / 2 && background.cX === 0 && protagonist_direction === 'L') ||
            (protagonist.x === WIDTH / 2 && background.cX === background_WIDTH - WIDTH && protagonist_direction === 'R') ||
            (protagonist.x > WIDTH / 2 && background.cX === background_WIDTH - WIDTH)) {
            protagonist.x += protagonist.dx;

        } else /*if (background.cX < background_WIDTH - WIDTH ||
            (protagonist.x === WIDTH / 2 && background.cX === background_WIDTH - WIDTH && protagonist_direction === 'L'))*/ {
            background.x -= protagonist.dx;
            background.cX += protagonist.dx;

        }
        if (jump) {
            protagonist.y += protagonist.dy;
            protagonist.dy += g;
            if (protagonist.y >= 600) {
                protagonist.dy = 0;
                jump = false;
                if (!stand) {
                    protagonist_direction = direction;
                    protagonist.gotoAndPlay("walk");
                } else {
                    protagonist.gotoAndPlay("stand");
                    protagonist_direction = '';
                    protagonist.dx = 0;
                }
            }
        }

    }

    var protagonist_direction = '';
    var jump = false;
    var direction = '';
    var stand = false;
    var run = false;
    var k = 1;


    function protagonist_walk(e) {
        var new_direction = '';

        var key = e.keyCode;
        console.info(key);

        if (key === 68 || key === 39) {
            new_direction = 'R';
            stand = false
        } else if (key === 65 || key === 37) {
            new_direction = 'L';
            stand = false;
        } else if (key === 32 && !jump) {
            jump = true;
            protagonist.dy = -5;

            direction = protagonist_direction;
        } else if (key === 16 && !run) {
            run = true;
            direction = protagonist_direction;
        } else  if (key === 16 && run) {
            run = false;
            direction = protagonist_direction;
        } else return;

        if (new_direction !== protagonist_direction && !jump && !run) {
            choice(new_direction, "walk", 1);
        } else if (jump) {
            choice(direction, "stand", 1);
        } else if (run) {
            choice(direction, "run", 10);
        }
        function choice(direction, animation, k) {
            protagonist_direction = direction;
            if (protagonist_direction === 'R') {
                protagonist.dx = k;
                protagonist.scaleX = 0.4;
            } else if (protagonist_direction === 'L') {
                protagonist.dx = (-1) * k;
                protagonist.scaleX = -0.4;
            }
            protagonist.gotoAndPlay(animation);
        }
    }

    function protagonist_stop(e) {
        if (((e.keyCode === 68 || e.keyCode === 39) && protagonist_direction === 'R' ||
            (e.keyCode === 65 || e.keyCode === 37) && protagonist_direction === 'L')) {
            stand = true;
            protagonist_direction = '';
            if (!jump) {
                protagonist.dx = 0;
                protagonist.dy = 0;
            }
            protagonist.gotoAndPlay("stand");
        }
    }

    var protagonist = new createjs.Sprite(protagonistSpriteSheet, "stand");
    field.addChild(protagonist);
    protagonist.x = 60;
    protagonist.y = 600;
    protagonist.scale = 0.4;
    protagonist.dx = 0;
    protagonist.dy = 0;
    protagonist.addEventListener('tick', protagonist_tick);
    this.document.onkeydown = protagonist_walk;
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
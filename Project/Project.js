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
    var background = new createjs.Container();
    var background_WIDTH = 1920;
    var background_HEIGHT = 1080;
    var floors = new createjs.Shape();
    floors.graphics
        .beginFill('#282629')
        .rect(0, 1055, 600, 20)
        .rect(800, 1055, background_WIDTH - 800, 20)
        .rect(950, 600, background_WIDTH - 950, 20);
    var stair = new createjs.Shape();
    stair.graphics
        .beginStroke('#282629')
        .setStrokeStyle(5)
        .beginFill('#ffffff')
        .rect(1100, 605, 100, 455);
    for (var i = 0; i < 8; i++)
        stair.graphics
            .beginStroke('#282629')
            .setStrokeStyle(3)
            .moveTo(1100, 650 + i * 50)
            .lineTo(1200, 650 + i * 50)
    background.addChild(stair, floors);
    var g = 0.1;
    var pits = {level1: [600, 800],
                level2: [0, 950]};
    var stairs = [1100, 1200];
    var second_level = [950, 1920, 600];
    background.regY = background_HEIGHT - HEIGHT;
    background.cX = 0;
    stage.addChild(field);
    field.addChild(background);
    var falling = false;
    var up = false;

    function protagonist_tick(e) {
        var protagonist = e.target;
        //console.info(protagonist.x + background.cX);
        if (protagonist.level === 1) {
            if (protagonist.x + background.cX > pits.level1[0] && protagonist.x + background.cX < pits.level1[1] && !falling && !jump) {
                falling = true;
                console.info("fall");
            } else
                falling = false;
            if (falling) {
                protagonist.gotoAndPlay("stand");
                protagonist.dy += g * 50;
                protagonist.y += protagonist.dy;
            }
            up = protagonist.x + background.cX > stairs[0] && protagonist.x + background.cX < stairs[1];
            if (up) {
                protagonist.y += protagonist.dy;
                if (protagonist.y < 155) {
                    jump = false;
                    up = false;
                    protagonist.level = 2;
                    protagonist.dy = 0;
                    protagonist.y = 150
                }
            }
        } else {
            falling = protagonist.x + background.cX > pits.level2[0] && protagonist.x + background.cX < pits.level2[1] && !falling && !jump;
            if (falling) {
                protagonist.dy += g * 10;
                protagonist.y += protagonist.dy;
                if (protagonist.y >= 600) {
                    protagonist.dy = 0;
                    protagonist.y = 600;
                    falling = false;
                    protagonist.level = 1;
                }
            }
        }
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
                protagonist.y = 600;
                jump = false;
                if (!stand) {
                    if (!run)
                        protagonist.gotoAndPlay("walk");
                    else
                        protagonist.gotoAndPlay("run");
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
    var stand = true;
    var run = false;
    var k = 1;

    function protagonist_walk(e) {
        var new_direction = '';
        var key = e.keyCode;
        console.info("key pressed: " + key);
        if (key === 68 || key === 39) {
            new_direction = 'R';
            if (!jump) {
                stand = false;
            }
        } else if (key === 65 || key === 37) {
            new_direction = 'L';
            if (!jump) {
                stand = false;
            }
        } else if (key === 32 && !jump) {
            jump = true;
            protagonist.dy = -5;
            new_direction = protagonist_direction;
        } else if (key === 16 && !run) {
            run = true;
            new_direction = protagonist_direction;
            k = 10;
        } else if (key === 87 && up) {
            protagonist.dy = -5;
            protagonist.gotoAndPlay("stand");
        } else return;

        if (new_direction !== protagonist_direction && !jump && !run) {
            choice(new_direction, "walk", 1);
        } else if (jump && stand) {
            choice(new_direction, "stand", 0);
        } else if (jump && !stand) {
            choice(new_direction, "stand", k);
        } else if (run && !stand) {
            choice(new_direction, "run", 10);
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
        //console.info("run: " + run);
        //console.info("stand: " + stand);
        //console.info("direction: " + protagonist_direction)
    }

    function protagonist_stop(e) {
        console.info("key up: " + e.keyCode);
        if (((e.keyCode === 68 || e.keyCode === 39) && protagonist_direction === 'R' ||
            (e.keyCode === 65 || e.keyCode === 37) && protagonist_direction === 'L')) {
            stand = true;
            if (!jump) {
                protagonist_direction = '';
                protagonist.dx = 0;
                protagonist.dy = 0;
            }
            protagonist.gotoAndPlay("stand");
        }
        if (e.keyCode === 16 && run) {
            run = false;
            k = 1;
            if (stand) {
                protagonist.dx = 0;
                protagonist.gotoAndPlay("stand");
            } else {
                if (protagonist_direction === 'R')
                    protagonist.dx = 1;
                else if (protagonist_direction === 'L')
                    protagonist.dx = -1;
                protagonist.gotoAndPlay("walk");
            }
        }
        if (e.keyCode === 87 && protagonist.level === 1) {
            protagonist.dy = 0;
            jump = true;
        }
    }

    var protagonist = new createjs.Sprite(protagonistSpriteSheet, "stand");
    field.addChild(protagonist);
    protagonist.x = 60;
    protagonist.y = 600;
    protagonist.scale = 0.4;
    protagonist.dx = 0;
    protagonist.dy = 0;
    protagonist.level = 1;
    protagonist.addEventListener('tick', protagonist_tick);
    this.document.onkeydown = protagonist_walk;
    this.document.onkeyup = protagonist_stop;

    field.addEventListener('click', function (e) {
        //console.info(e.localX + " : " + e.localY);
        console.info("protagonist.x : " + protagonist.x);
        console.info("protagonist.y : " + protagonist.y);
        console.info("background.cx : " + background.cX);
    });

    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.framerate = 60;
    createjs.Ticker.timerMode = createjs.Ticker.RAF_SYNCHED;
}
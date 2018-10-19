function init() {


    var animation_start_time = get_time() / 1000;
    var last_redraw_time = get_time();
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');
    var aimg = document.getElementById("a-img");
    var dimg = document.getElementById("d-img");
    var bomb = document.getElementById("bomb");
    var explosions = [{
        frame_index: 0,
        num_frames: 15,
        str_index: 0,
        x: 0,
        y: 0,
        start_time: 0
    }, {
        frame_index: 0,
        num_frames: 15,
        str_index: 0,
        x: 0,
        y: 0,
        start_time: 0
    }, {
        frame_index: 0,
        num_frames: 15,
        str_index: 0,
        x: 0,
        y: 0,
        start_time: 0
    }];
    var FPS = 30;
    var canvasBeginX = 105;
    var canvasBeginY = 38;
    var beginXY = 128.5;
    var endX = 1280 - beginXY * 2;
    var endY = 720 - beginXY * 2;

    var mouse = {
        x: 0,
        y: 0
    };

    var balls = [{
        frame_index: 0,
        num_frames: 648,
        str_index: 0,
        x: 220,
        y: 520,
        dx: 100,
        dy: -100,
        exploded: false
    }, {
        frame_index: 0,
        num_frames: 648,
        str_index: 0,
        x: 920,
        y: 140,
        dx: 100,
        dy: 100,
        exploded: false
    }, {
        frame_index: 0,
        num_frames: 648,
        str_index: 0,
        x: 420,
        y: 260,
        dx: -100,
        dy: 100,
        exploded: false
    }];

    animation_step();

    canvas.addEventListener('click', mouseClick, false);

    function mouseClick(event) {
        var rect = canvas.getBoundingClientRect();

        mouse.x = event.clientX - rect.left; //event.pageX - canvasBeginX;
        mouse.y = event.clientY - rect.top; // event.pageY - canvasBeginY;

        for (var i = 0; i < balls.length; i++)
            if (mouse.x >= balls[i].x && mouse.x <= balls[i].x + 50 && mouse.y >= balls[i].y && mouse.y <= balls[i].y + 50) {
                balls[i].exploded = true;
                explosions[i].start_time = get_time() / 1000;
                console.log(true);
            }

        if (mouse.x <= beginXY || mouse.y <= beginXY || mouse.x >= 1280 - beginXY || mouse.y >= 720 - beginXY)
            console.log("BAKA!!");
        console.log((event.pageX - canvasBeginX) + " : " + (event.pageY - canvasBeginY));
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "black";
        ctx.strokeRect(beginXY, beginXY, endX, endY);
        ctx.drawImage(aimg, 0, 0);
        //ctx.drawImage(dimg, 1280 / 5 * frame_index_exp, 747 / 3 * str_index_exp, 1280 / 5, 748 / 3, 150, 50, 1280 / 5, 748 / 3);
        for (var i = 0; i < balls.length; i++) {
            if (balls[i].exploded === false) {
                balls[i].str_index = Math.floor(balls[i].frame_index / 36);
                balls[i].frame_index = balls[i].frame_index - 36 * balls[i].str_index;
                ctx.drawImage(bomb, 100 * balls[i].frame_index, 100 * balls[i].str_index, 100, 100, balls[i].x, balls[i].y, 50, 50);
            } else {
                ctx.drawImage(dimg, 1280 / 5 * explosions[i].frame_index, 747 / 3 * explosions[i].str_index, 1280 / 5, 748 / 3, balls[i].x, balls[i].y - 25, 256 / 4, 249 / 4);
            }
        }
    }

    function update_animation_parameters(elapsed_time_sec, current_time_sec) {
        /*if (frame_index_exp >= 10) {
            frame_index_exp = frame_index_exp - 10;
            str_index_exp = 2;
        } else if (frame_index_exp >= 5) {
            frame_index_exp = frame_index_exp - 5;
            str_index_exp = 1;
        } else {
            str_index_exp = 0;
        }*/

        /*frame_index_exp = Math.floor((current_time_sec - animation_start_time) * FPS) % num_frames_exp;
        str_index_exp = Math.floor(frame_index_exp / 5);
        frame_index_exp = frame_index_exp - str_index_exp * 5;*/

        for (var i = 0; i < balls.length; i++) {
            if (balls[i].exploded === false) {
                balls[i].frame_index = Math.floor((current_time_sec - animation_start_time) * FPS) % balls[i].num_frames;

                if (balls[i].x >= 1105.5 || balls[i].x <= 123.5)
                    balls[i].dx = balls[i].dx * (-1);
                if (balls[i].y >= 545.5 || balls[i].y <= 123.5)
                    balls[i].dy = balls[i].dy * (-1);
                balls[i].x += balls[i].dx * elapsed_time_sec;
                balls[i].y += balls[i].dy * elapsed_time_sec;
            } else {
                explosions[i].frame_index = Math.floor((current_time_sec - explosions[i].start_time) * FPS);
                explosions[i].str_index = Math.floor(explosions[i].frame_index / 5);
                explosions[i].frame_index = explosions[i].frame_index - explosions[i].str_index * 5;
            }
        }
    }

    function animation_step() {
        //эта функция должна постоянно вызываться
        requestAnimationFrame(animation_step); //сразу просим повторить
        var current_time = get_time();
        var elapsed_time = current_time - last_redraw_time;
        last_redraw_time = current_time;

        if (elapsed_time > 200)
            elapsed_time = 0;

        update_animation_parameters(elapsed_time / 1000, current_time / 1000);
        draw();
    }

    function get_time() {
        //return Date.now();
        return new Date().getTime();
    }

}
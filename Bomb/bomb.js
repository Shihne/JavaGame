function init() {


    var animation_start_time = get_time() / 1000;
    var last_redraw_time = get_time();
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');
    var aimg = document.getElementById("a-img");
    var dimg = document.getElementById("d-img");
    var bomb = document.getElementById("bomb");
    var frame_index_exp = 0;
    var FPS = 30;
    var num_frames_exp = 15;
    var str_index_exp = 0;
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
        frame_index_bomb: 0,
        num_frames_bomb: 648,
        str_index_bomb: 0,
        x_bomb: 220,
        y_bomb: 520,
        dx: 100,
        dy: -100
    }, {
        frame_index_bomb: 0,
        num_frames_bomb: 648,
        str_index_bomb: 0,
        x_bomb: 920,
        y_bomb: 140,
        dx: 100,
        dy: 100
    }, {
        frame_index_bomb: 0,
        num_frames_bomb: 648,
        str_index_bomb: 0,
        x_bomb: 420,
        y_bomb: 260,
        dx: -100,
        dy: 100
    }];

    animation_step();

    canvas.addEventListener('click', mouseClick, false);

    function mouseClick(event) {
        mouse.x = event.pageX - canvasBeginX;
        mouse.y = event.pageY - canvasBeginY;
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
            balls[i].str_index_bomb = Math.floor(balls[i].frame_index_bomb / 36);
            balls[i].frame_index_bomb = balls[i].frame_index_bomb - 36 * balls[i].str_index_bomb;
            ctx.drawImage(bomb, 100 * balls[i].frame_index_bomb, 100 * balls[i].str_index_bomb, 100, 100, balls[i].x_bomb, balls[i].y_bomb, 50, 50);
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
            balls[i].frame_index_bomb = Math.floor((current_time_sec - animation_start_time) * FPS) % balls[i].num_frames_bomb;
            if (balls[i].x_bomb >= 1105.5 || balls[i].x_bomb <= 123.5)
                balls[i].dx = balls[i].dx * (-1);
            if (balls[i].y_bomb >= 545.5 || balls[i].y_bomb <= 123.5)
                balls[i].dy = balls[i].dy * (-1);
            balls[i].x_bomb += balls[i].dx * elapsed_time_sec;
            balls[i].y_bomb += balls[i].dy * elapsed_time_sec;
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
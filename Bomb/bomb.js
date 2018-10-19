function init() {


    var animation_start_time = get_time() / 1000;
    var last_redraw_time = get_time();
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');
    var aimg = document.getElementById("a-img");
    var dimg = document.getElementById("d-img");
    var bomb = document.getElementById("bomb");
    var bomb2 = new Image();
    bomb2.src = 'c.png';
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

    function new_ball(x, y, dx, dy) {
        return {
            frame_index: 0,
            num_frames: 648,
            str_index: 0,
            x: x,
            y: y,
            dx: dx,
            dy: dy,
            exploded: false
        };
    }

    var balls = [new_ball(220, 520, 100, -100), new_ball(520, 140, 100, 100), new_ball(420, 260, -100, 100)];

    animation_step();

    canvas.addEventListener('click', mouseClick, false);

    function mouseClick(event) {
        var rect = canvas.getBoundingClientRect();

        mouse.x = event.clientX - rect.left; //event.pageX - canvasBeginX;
        mouse.y = event.clientY - rect.top; // event.pageY - canvasBeginY;

        for (var i = 0; i < balls.length; i++)
            if (mouse.x >= balls[i].x && mouse.x <= balls[i].x + 50 && mouse.y >= balls[i].y && mouse.y <= balls[i].y + 50) {
                balls[i].exploded = true;
                balls[i].num_frames = 15;
                balls[i].start_time = get_time() / 1000;
                console.log(true);
                return;
            }

        if (mouse.x <= beginXY || mouse.y <= beginXY || mouse.x >= 1280 - beginXY || mouse.y >= 720 - beginXY)
            console.log("BAKA!!");
        else
            balls.push(new_ball(mouse.x, mouse.y, 100, 100));

        console.log((event.pageX - canvasBeginX) + " : " + (event.pageY - canvasBeginY));
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "black";
        ctx.strokeRect(beginXY, beginXY, endX, endY);
        ctx.drawImage(aimg, 0, 0);

        for (var i = 0; i < balls.length; i++) {
            if (balls[i].exploded === false) {
                balls[i].str_index = Math.floor(balls[i].frame_index / 36);
                balls[i].frame_index = balls[i].frame_index - 36 * balls[i].str_index;
                ctx.drawImage(bomb, 100 * balls[i].frame_index, 100 * balls[i].str_index, 100, 100, balls[i].x, balls[i].y, 50, 50);
            } else {
                ctx.drawImage(dimg, 1280 / 5 * balls[i].frame_index, 747 / 3 * balls[i].str_index, 1280 / 5, 748 / 3, balls[i].x, balls[i].y - 25, 256 / 4, 249 / 4);
            }
        }
    }

    function update_animation_parameters(elapsed_time_sec, current_time_sec) {
        for (var i = 0; i < balls.length; i++) {
            var ball = balls[i];

            if (ball.exploded === false) {
                ball.frame_index = Math.floor((current_time_sec - animation_start_time) * FPS) % ball.num_frames;

                if (ball.x >= 1105.5 || ball.x <= 123.5)
                    ball.dx = ball.dx * (-1);
                if (ball.y >= 545.5 || ball.y <= 123.5)
                    ball.dy = ball.dy * (-1);
                ball.x += ball.dx * elapsed_time_sec;
                ball.y += ball.dy * elapsed_time_sec;
            } else {
                ball.frame_index = Math.floor((current_time_sec - ball.start_time) * FPS);

                if (ball.frame_index > 15)
                    balls.splice(i, 1);
                else {
                    ball.str_index = Math.floor(ball.frame_index / 5);
                    ball.frame_index = ball.frame_index - ball.str_index * 5;
                }
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
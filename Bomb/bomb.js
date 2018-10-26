function init() {


    var animation_start_time = get_time() / 1000;
    var last_redraw_time = get_time();
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');
    var aimg = document.getElementById("a-img");
    var dimg = document.getElementById("d-img");
    var bomb = document.getElementById("bomb");
    var FPS = 30;
    var beginXY = 128.5;
    var rect_width = canvas.width - beginXY * 2;
    var rect_height = canvas.height - beginXY * 2;

    var mouse = {
        x: 0,
        y: 0
    };

    function new_ball(x, y, dx, dy) {
        return {
            frame_index: 0,
            num_frames: 648,
            num_columns: 36,
            str_index: 0,
            x: x,
            y: y,
            dx: dx,
            dy: dy,
            size: 50,
            frame_size: 100,
            exploded: false,
            explosionX_size: 64,
            explosionY_size: 249 / 4,
            explosionX_frame_size: 256,
            explosionY_frame_size: 249,
            explosion_num_frames: 15,
            explosion_num_columns: 5
        };
    }

    var balls = [new_ball(220, 520, 100, -100), new_ball(520, 140, 100, 100), new_ball(420, 260, -100, 100)];

    animation_step();

    canvas.addEventListener('click', mouseClick, false);

    function mouseClick(event) {
        var rect = canvas.getBoundingClientRect();

        mouse.x = event.clientX - rect.left; //event.pageX - canvasBeginX;
        mouse.y = event.clientY - rect.top; // event.pageY - canvasBeginY;

        for (var i = 0; i < balls.length; i++) {
            var ball = balls[i];
            if (mouse.x >= ball.x && mouse.x <= ball.x + ball.size &&
                mouse.y >= ball.y && mouse.y <= ball.y + ball.size &&
                ball.exploded === false) {
                    ball.exploded = true;
                    ball.num_frames = 15;
                    ball.start_time = get_time() / 1000;
                    console.log(true);
                    return;
            }
        }

        if (mouse.x <= beginXY || mouse.y <= beginXY ||
            mouse.x >= canvas.width - beginXY || mouse.y >= canvas.height - beginXY)
            console.log("BAKA!!");
        else if (mouse.x <= beginXY + (rect_width - beginXY) / 2 && mouse.y <= beginXY + (rect_height - beginXY) / 2)
            balls.push(new_ball(mouse.x, mouse.y, 100, 100));
        else if (mouse.x <= beginXY + (rect_width - beginXY) / 2 && mouse.y > beginXY + (rect_height - beginXY) / 2)
            balls.push(new_ball(mouse.x, mouse.y - 50, 100, -100));
        else if (mouse.y <= beginXY + (rect_height - beginXY) / 2)
            balls.push(new_ball(mouse.x - 50, mouse.y, -100, 100));
        else
            balls.push(new_ball(mouse.x - 50, mouse.y - 50, -100, -100));

        console.log((event.pageX - canvasBeginX) + " : " + (event.pageY - canvasBeginY));
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "black";
        ctx.strokeRect(beginXY, beginXY, rect_width, rect_height);
        ctx.drawImage(aimg, 0, 0);

        for (var i = 0; i < balls.length; i++) {
            var ball = balls[i];
            if (ball.exploded === false) {
                ball.str_index = Math.floor(ball.frame_index / ball.num_columns);
                ball.frame_index = ball.frame_index - ball.num_columns * ball.str_index;
                ctx.drawImage(bomb, ball.frame_size * ball.frame_index, ball.frame_size * ball.str_index,
                    ball.frame_size, ball.frame_size, ball.x, ball.y, ball.size, ball.size);
            } else {
                ctx.drawImage(dimg,
                    ball.explosionX_frame_size * ball.frame_index, ball.explosionY_frame_size * ball.str_index,
                    ball.explosionX_frame_size, ball.explosionY_frame_size, ball.x, ball.y - ball.size / 2,
                    ball.explosionX_size, ball.explosionY_size);
            }
        }
    }

    function update_animation_parameters(elapsed_time_sec, current_time_sec) {
        for (var i = 0; i < balls.length; i++) {
            var ball = balls[i];

            if (ball.exploded === false) {
                ball.frame_index = Math.floor((current_time_sec - animation_start_time) * FPS) % ball.num_frames;

                if (ball.x >= canvas.width - beginXY - ball.size * 0.9 || ball.x <= beginXY - ball.size * 0.1)
                    ball.dx = ball.dx * (-1);
                if (ball.y >= canvas.height - beginXY - ball.size * 0.9 || ball.y <= beginXY - ball.size * 0.1)
                    ball.dy = ball.dy * (-1);
                ball.x += ball.dx * elapsed_time_sec;
                ball.y += ball.dy * elapsed_time_sec;
            } else {
                ball.frame_index = Math.floor((current_time_sec - ball.start_time) * FPS);

                if (ball.frame_index > ball.explosion_num_frames)
                    balls.splice(i, 1);
                else {
                    ball.str_index = Math.floor(ball.frame_index / ball.explosion_num_columns);
                    ball.frame_index = ball.frame_index - ball.str_index * ball.explosion_num_columns;
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
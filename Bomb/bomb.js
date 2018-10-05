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
    var frame_index_bomb = 0;
    var num_frames_bomb = 648;
    var str_index_bomb = 0;
    var x_bomb = 320;
    var y_bomb = 240;
    var dx = 100;
    var dy = 100;

    animation_step();

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "black";
        ctx.strokeRect(128.5, 128.5, 1023, 463);
        ctx.drawImage(aimg, 0, 0);
        //ctx.drawImage(dimg, 1280 / 5 * frame_index_exp, 747 / 3 * str_index_exp, 1280 / 5, 748 / 3, 150, 50, 1280 / 5, 748 / 3);
        ctx.drawImage(bomb, 100 * frame_index_bomb, 100 * str_index_bomb, 100, 100, x_bomb, y_bomb, 50, 50);
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

        frame_index_bomb = Math.floor((current_time_sec - animation_start_time) * FPS) % num_frames_bomb;
        str_index_bomb = Math.floor(frame_index_bomb / 36);
        frame_index_bomb = frame_index_bomb - 36 * str_index_bomb;

        if (x_bomb >= 1105.5 || x_bomb <= 123.5)
            dx = dx * (-1);
        if (y_bomb >= 545.5 || y_bomb <= 123.5)
            dy = dy * (-1);


        x_bomb += dx * elapsed_time_sec;
        // console.log(dx, elapsed_time_sec, x_bomb);
        y_bomb += dy * elapsed_time_sec;
    }

    function animation_step() {
        //эта функция должна постоянно вызываться
        requestAnimationFrame(animation_step); //сразу просим повторить
        var current_time = get_time();
        var elapsed_time = current_time - last_redraw_time;
        last_redraw_time = current_time;

        update_animation_parameters(elapsed_time / 1000, current_time / 1000);
        draw();
    }

    function get_time() {
        //return Date.now();
        return new Date().getTime();
    }
}
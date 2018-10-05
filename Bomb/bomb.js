function init() {


    var animation_start_time = get_time() / 1000;
    var last_redraw_time = get_time;
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');
    var aimg = document.getElementById("a-img");
    var dimg = document.getElementById("d-img");
    var frame_index = 0;
    var FPS = 15;
    var num_frames = 15;
    var str_index = 0;
    animation_step();

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(aimg, 0, 0);
        ctx.drawImage(dimg, 1280 / 5 * frame_index, 747 / 3 * str_index, 1280 / 5, 748 / 3, 150, 50, 1280 / 5, 748 / 3);
    }

    function update_animation_parameters(elapsed_time_sec, current_time_sec) {
        frame_index = Math.floor((current_time_sec - animation_start_time) * FPS) % num_frames;
        if (frame_index >= 10) {
            frame_index = frame_index - 10;
            str_index = 2;
        } else if (frame_index >= 5) {
            frame_index = frame_index - 5;
            str_index = 1;
        } else {
            str_index = 0;
        }

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
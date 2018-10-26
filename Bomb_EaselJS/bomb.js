function init() {
    console.info("page loaded");
    var stage = new createjs.Stage("game");

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


}
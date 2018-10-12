function init() {
    console.info("page loaded");

    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');

    //заведем параметры анимации
    var x = 0; //положение картинки
    var frame_index; //номер кадра для отображения. Целое от 0 до
                     //количества кадров - 1.
    //эти параметры не анимируются, но они влияют на анимацию.
    //если мы захотим включить другую анимацию, то их надо будет
    //поменять
    var num_frames = 10;
    var sprite_width = 78;
    var sprite_height = 95;
    var sprite_sheet = new Image();
    sprite_sheet.src = 'dog1.png'; //изображение загрузится не сразу
    var animation_start = get_time();

    //в задаче про летающие шарики, у каждого должен быть свой набор этих параметров

    var FPS = 20; //показываем 20 кадров в секунду
    var SPEED = 30; //перемещаемся на 30 пикселей в секунду

    function get_time() { //возвращает время в секундах
        return new Date().getTime() / 1000;
    }

    var last_redraw_time = get_time();

    function draw() {
        //здесь перерисовывается содержимое экрана
        //используем значение параметров анимации
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var sprite_x = frame_index * sprite_width;
        var sprite_y = 0;
        ctx.drawImage(
            sprite_sheet,
            sprite_x, sprite_y,
            sprite_width, sprite_height,
            x, 10, //т.к. x изменяется, картинка движется
            sprite_width, sprite_height
        );
    }

    function update_animation_parameters(elapsed_time, current_time) {
        //здесь обновляем значение всех анимируемых параметров

        //обновляем параметр положения картинки
        x += elapsed_time * SPEED; //10 пикселей в секунду

        //обновляем параметр frame_index: кадр, который надо показывать
        frame_index = Math.floor(
            (current_time - animation_start) * FPS
        ) % num_frames;
    }

    function animation_step() {
        //эта функция должна постоянно вызываться
        requestAnimationFrame(animation_step);

        var current_time = get_time();
        var elapsed_time = current_time - last_redraw_time;
        last_redraw_time = current_time;

        if (elapsed_time > 0.4)
            elapsed_time = 0;



        update_animation_parameters(elapsed_time, current_time);
        draw();
    }

    requestAnimationFrame(animation_step);
}
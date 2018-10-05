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

    /*Использование изображений
    https://developer.mozilla.org/ru/docs/Web/API/Canvas_API/Tutorial/%D0%98%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5_%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B9
        Если у вас есть изображение (обычно png, jpg), вы можете рисовать на canvas это изображение или его части.
        Можно при рисовании применять эффекты по изменению формы и цвета.
        Как загрузить
    Вставить изображение в HTML и дождаться, когда оно загрузится вместе со страницей. Мы используем событие onload,
    чтобы начать выполнять скрипт, и мы можем быть уверены, что когда событие произошло и скрипт начал выполняться,
    наше изображение уже загружено.
        в HTML надо сделать тег <img src=”a.png” id=”a-img”>
    в CSS можно написать что-то типа img {display:none;}
    в JS: var aImg = document.getElementById(“a-img”);
    Изображение можно загрузить программно:
        var img = new Image();
    img.src = “ссылка на картинку”;
    Но в этом случае изображение загрузится не сразу, и при попытке его нарисовать ничего не будет видно
    Как дождаться по-нормальному загрузки картинки - обсудим потом. Или используйте библиотеку preloadjs из набора
     библиотек CreateJS, который изучим позже.
        Когда изображение загружено, его можно рисовать:
        ctx - контекст для рисования
    ctx.drawImage(img, x, y); //что рисовать и где.
    //можно указать размер нового изображения
    ctx.drawImage(img, x, y, width, height);
    //можно указать еще больше параметров:
    drawImage(
        image,          что рисовать
    sx, sy,         координаты на исходной картинке (source)
    sWidth, sHeight, размер на исходной картинке
    dx, dy,		координаты на Canvas (destination)
    dWidth, dHeight размер на Canvas
    )*/

}
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

    //в задаче про летающие шарики, у каждого шарика должен быть
    //свой личный набор этих параметров.

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

    //давайте добавим в конец преобразования для нашего canvas
    //код, который написан ниже, выполняется до того как начнется
    //анимация. Анимацию мы попросили начать попозже, когда удобно браузеру,
    //это у нас сделано с помощью requestAnimationFrame

    ctx.translate(100, 200); //перенести начало системы координат в точку 100, 200
    ctx.translate(1, 1); //сдвинули чуть
    ctx.rotate(Math.PI / 6); //повернуть систему координат
    ctx.scale(2, 1); //растянуть x и y.
    //есть еще, можно менять угол между осями

    //нарисовали домик
    //преобразования (ctx.translate, ctx.rotate, ...)
    //(домик остался на месте)
    //нарисовали домик еще раз с теми же координатами
    //(домик нарисуется в новом месте, потому что теперь координаты уже считаются по другой с/к)

    //как возвращать систему координат?
    ctx.save(); //сохраняет весь контекст рисования. Система координат, strokeStyle, fillStyle и
                //многие другие глобальные параметры
    //дальше можно изменять систему координат, менять стили рисования
    ctx.restore(); //все сохраненные значения восстанавливаются.

    //можно сохранять и восстанавливать несколько раз
    ctx.save(); //(1)
    ctx.save(); //(2)
    ctx.save(); //(3)
    ctx.restore(); //восстановит (3)
    ctx.restore(); //восстановит (2)
    ctx.restore(); //восстановит (1)

    //Если у вас есть функция, которая что-то рисует, то принято сохранять и восстанавливать ctx
    function draw_something() {
        ctx.save();
        //рисуем
        ctx.restore();
    }
}

//TODO что еще есть в Canvas
//рисование текста. ctx.fillText(), ctx.strokeText(). Обратите внимание на выравнивания.
//стили заливки: можно заливать не только цветом, а еще градиентом. Или шаблоном на основе картинки
//стили линий: можно делать пунктиры, управлять тем, как выглядит конец линии и излом и т.п.
//есть цветовые фильтры, можно указать, как изменяется цвет каждого пикселя при рисовании.
//и вообще, можно напрямую обращаться к пикселям изображения, читать их и изменять.

/*Начинаем с пустого шаблона template

В прошлый раз мы видели, что можно сделать анимацию с помощью метода setInterval, который повторяет указанное действие с указанной частотой.
    Для анимации в браузере есть метод requestAnimationFrame(действие). Он просит браузер в удобный для браузера момент времени отвлечься, выполнить “действие” и перерисовать содержимое экрана.
    Т.е. этот метод аналогичен setTimeout, но не нужно указывать, сколько времени ждать. Ждать надо до тех пор, пока браузеру не станет удобно перерисовать содержимое экрана.

В код добавляем следующий цикл анимации:
заведем параметры анимации
x = ...
y = ...
z = ...
*/

function init() {
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');
    var last_redraw_time = get_time();
    var v = 100;
    //шар 1
    var x1 = 90 + Math.random() * 440;
    var y1 = 90 + Math.random() * 300;
    var alpha1 = Math.random() * 2 * Math.PI; // не более 180
    var dx1 = Math.cos(alpha1) * v;
    var dy1 = Math.cos(alpha1) * v;
    //шар2
    var x2 = 90 + Math.random() * 440;
    var y2 = 90 + Math.random() * 300;
    var alpha2 = Math.random() * 2 * Math.PI;
    var dx2 = Math.cos(alpha2) * v;
    var dy2 = Math.cos(alpha2) * v;
    //шар3
    var x3 = 90 + Math.random() * 440;
    var y3 = 90 + Math.random() * 300;
    var alpha3 = Math.random() * 2 * Math.PI;
    var dx3 = Math.cos(alpha3) * v;
    var dy3 = Math.cos(alpha3) * v;

    animation_step();

    function draw() {
        //здесь перерисовывается содержимое экрана
        //используем значение параметров анимации
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //это полная очистка canvas
        ctx.fillStyle = "#2BA2C0";
        ctx.fillRect(50, 50, 540, 380);
        ctx.strokeStyle = "black";
        ctx.strokeRect(50.5, 50.5, 540, 380);

        create_ball(x1, y1);
        create_ball(x2, y2);
        create_ball(x3, y3);
    }

    function create_ball(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(230, 1, 77, 0.5)";
        ctx.fill();
    }

    function update_animation_parameters(elapsed_time_sec) {
        /* здесь обновляем значение всех анимируемых параметров
        простейшее обновление - это изменение на
        фиксированную величину:
        x += 0.5;
        обновить параметры, зная прошедшее время.
	    допустим, скорость изменения x - это SPEED_x.
	    для определенности SPEED_x = 10 пикселей в секунду */
        //if (x >= 550 || x <= 90 || y >= 390 || y <= 90)

        if (x1 >= 550 || x1 <= 90)
            dx1 = dx1 * (-1);
        if (y1 >= 390 || y1 <= 90)
            dy1 = dy1 * (-1);
        x1 += dx1 * elapsed_time_sec;
        y1 += dy1 * elapsed_time_sec;

        if (x2 >= 550 || x2 <= 90)
            dx2 = dx2 * (-1);
        if (y2 >= 390 || y2 <= 90)
            dy2 = dy2 * (-1);
        x2 += dx2 * elapsed_time_sec;
        y2 += dy2 * elapsed_time_sec;

        if (x3 >= 550 || x3 <= 90)
            dx3 = dx3 * (-1);
        if (y3 >= 390 || y3 <= 90)
            dy3 = dy3 * (-1);
        x3 += dx3 * elapsed_time_sec;
        y3 += dy3 * elapsed_time_sec;
    }

    function animation_step() {
        //эта функция должна постоянно вызываться
        requestAnimationFrame(animation_step); //сразу просим повторить
        var current_time = get_time();
        var elapsed_time = current_time - last_redraw_time;
        last_redraw_time = current_time;

        update_animation_parameters(elapsed_time / 1000);
        draw();
    }

    /*
    Анимация с точным заданием скорости изменения параметра
    сначала научимся определять, сколько точно времени прошло с прошлой перерисовки. Добавим глобальную функцию
     */
    function get_time() {
        //return Date.now();
        return new Date().getTime();
    }
    /*
    Она возвращает количество миллисекунд, прошедших с начала эпохи Unix (1 января 1970).
    Можно делать так:
        var time1 = get_time();
        долгое вычисление
        var time2 = get_time();
        console.log('долгое вычисление длилось', time2 - time1, 'мс');
     */
}
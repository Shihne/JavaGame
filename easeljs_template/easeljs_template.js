function init() {
    console.info("page loaded");

    var stage = new createjs.Stage("game"); //указываем id для <canvas>
    /*stage - это сцена, на которой расположены все объекты
    какие объекты  можно располагать на сцене:
    * Text - объекты с текстом, у них можно настраивать текст, шрифь
    * Shape - статичные рисунки, на которых может быть нарисовано то же, что на Canvas. Т.е линии, круги, прямоугольники...
    * Sprite - анимированное изображение, анимация настраивается через SpriteSheets
    * Bitmap - это картинки <img>, другие canvas или даже <video>
    *
    * Container - контейнер для элементов, на нём тоже могут быть Shape, Sprite, Bitmap, Text и другие контейнеры.
    *
    *всё это - DisplayObject, объекты, которые можно располагать на сцене.
    * У них у всех есть размеры, координаты и трансформации (сжатия, растяжения, повороты)
     */

    //начнём с создания Shape:
    var circle = new createjs.Shape();
    //после создания Shape пустой, на нём ничего не нарисовано, а мы хотим нарисовать кружок
    var g = circle.graphics; //graphics - холст, то на чём можно рисовать
                             //похоже по смыслу на ctx
    g
        .beginFill("red")
        .drawCircle(0, 0, 40); // рисуем закрашенный круг в (0, 0) радиус 40.
    //это координаты внутри самого shape

    //этот код аналогичен
    //g.beginFill("red");
    //g.drawCircle(0, 0, 40);
    //но короче, потому что не надо повторять g.
    //Это называется flow-стиль, метод вызывается от прошлого метода, см. jQuery

    circle.x = 100; //это координаты круга в его контейнере (на сцене)
    circle.y = 100; //т.е. мы говорим, где в контейнере начало координат у shape


    //надо обязательно добавить объект на сцену, иначе он не будет виден
    stage.addChild(circle);

    //давайте добавим на сцену еще Shape. Пусть это будет треугольник
    var triangle = new createjs.Shape();
    triangle.graphics
        .beginFill("green") //команды очень похожи на команды Canvas
        .moveTo(-20, 0)     //нарисовали "путь", и он закрасился
        .lineTo(20, 0)
        .lineTo(0, -20);
    //мы нарисовали равнобедренный треугольник. Точка (0, 0) у него
    //в середине основания.

    //вот здесь все возможные методы для рисования на graphics
    //https://www.createjs.com/docs/easeljs/classes/Graphics.html

    stage.addChild(triangle);
    triangle.x = 100;
    triangle.y = 100;
    //когда мы указали x и y для треугольника, мы указали x, y для
    //середины его основания

    //сделаем ещё один такой треугольник, будем его по-другому располагать
    var triangle2 = new createjs.Shape();
    triangle2.graphics
        .beginFill("blue") //команды очень похожи на команды Canvas
        .moveTo(-20, 0)     //нарисовали "путь", и он закрасился
        .lineTo(20, 0)
        .lineTo(0, -20);
    stage.addChild(triangle2);
    triangle2.x = 100;
    triangle2.y = 100;
    triangle2.regX = 0; //(0, -20) это точка в треугольнике - верхняя вершина
    triangle2.regY = -20; //значит в контейнере мы будем указывать координаты верхней вершины

    //regX, regY в системе координат Shape задают опорную точку (pivot point)

    //давайте теперь добавим Bitmap для примера
    var img = new createjs.Bitmap("cat.jpg");
    stage.addChild(img);

    //и надо дать команду на перерисовку сцены
    stage.update(); //здесь картинка ещё не успела загрузиться

    //сделаем update сцены через 2 секунды
    setTimeout(function() {
        //узнаём размер картинки, когда она загрузится
        //это универсальный метод для любого объекта на сцене
        var rect = img.getBounds();
        //rect.width - ширина
        //rect.height - высота
        img.scaleX = 400 / rect.width;
        img.scaleY = 400 / rect.height;
        img.x = 100;
        img.y = 100;
        stage.update()}, 2000);
    //дальше это не понадобится, потому что у нас будет анимация с постоянной перерисовкой сцены.
    //А давайте теперь добавим анимацию. Будем двигать котика, постепенно увеличивать его x и y

    // это таймер, один класс на всю программу
    // его не надо создавать, он уже есть
    createjs.Ticker
        .addEventListener("tick", stage);
    //мы добавили сцену как слушателя "tick", это событие срабатывает 60 раз в секунду (это можно настроить)
    //Теперь сцена автоматически делает update 60 раз в секунду, т.е. старый update больше не нужен
    //Теперь, все объекты на сцене тоже получают событие tick.
    //По этому событию объекты можно анимировать

    img.addEventListener("tick", function () {
        img.x += 1; //сдвигаем на 1 пиксель
        img.y += 1;
    });
    //нет большой разницы, на какой объект повесить событие tick, мы могли повесить такое же событие хоть на
    // треугольник, но логично действия про картинку повесить на картинку.

    //скорость анимации
    createjs.Ticker.framerate = 60; //60 в секунду
    createjs.Ticker.interval = 20; //20 мс между срабатываниями (59 раз/сек)
    createjs.Ticker.timerMode = createjs.Ticker.RAF;
    //RAF - requestAnimationFrame, это как мы делали, но в этом режиме нельзя настраивать скорость
    //RAF_SYCHED - это тоже RAF, но с попыткой синхронизировать скорость срабатывания с указанной TIMEOUT - через
    // функцию setTimeout
}

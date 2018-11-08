function init() {
    console.info("page loaded");

    var stage = new createjs.Stage("game"); //указываем id для <canvas>

    //хотим добавить спрайт на сцену.
    //спрайт Sprite - это объект, который показывает анимацию. Анимация
    //настраивается с помощью объекта SpriteSheet

    // https://bit.ly/2RtRYyI
    var earthSpriteSheet = new createjs.SpriteSheet({ //объект с настройками
        images: ["earth_and_explosion.png"], //набор картинок с кадрами
        frames: { //объект с описанием размеров и положений кадров
            //можно вместо объекта указать массив, и перечислить каждый
            //спрайт по-отдельности (см. документацию)
            width: 100,
            height: 100,
            regX: 50, //опрная точка. Эта точка картинки (центр) будет рисоваться
            regY: 50  //в координатах (0, 0) спрайта.
            //margin: границы картинки
            //spaces: пропуски между спрайтами
        },
        animations: { //набор анимаций, названия придумаем сами
            rotate: [0, 47, "rotate"], //c 0 по 47, а после этого перейти
                                       //к анимации rotate
            explode: [48, 83, null] //c 48 по 83, и остановиться (null - нет дальше)
        }
        , framerate: 20 //частота кадров
    });

    var earthSprite = new createjs.Sprite(earthSpriteSheet);
    stage.addChild(earthSprite);
    earthSprite.x = 100;
    earthSprite.y = 100;

    //перейти к определенной анимации и начать ее воспроизводить
    earthSprite.gotoAndPlay("rotate");

    //теперь давайте сделаем так, что при нажатии на землю она взрывается
    earthSprite.addEventListener('click', function() {
        earthSprite.gotoAndPlay("explode");
    });

    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.framerate = 60; //60 в секунду
    createjs.Ticker.timerMode = createjs.Ticker.RAF_SYNCHED;
}
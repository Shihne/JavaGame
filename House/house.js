function init() {
    console.info("page loaded");

    var stage = new createjs.Stage("game");

    var house = new createjs.Container();
    house.x = 320;
    house.y = 320;


    var walls = new createjs.Shape;
    walls.graphics
        .beginFill("brown")
        .rect(0, 0, 100, 100);
    walls.regX = 50;
    walls.regY = 50;

    house.addChild(walls);

    stage.addChild(house);

    stage.update();
}

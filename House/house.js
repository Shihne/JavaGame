function init() {
    console.info("page loaded");

    var stage = new createjs.Stage("game");

    var houses = [new_house(320, 320), new_house(54, 162), new_house(500, 500), new_house(90, 489)];

    for (var i = 0; i < houses.length; i++)
        stage.addChild(houses[i]);

    function new_house(x, y) {
        var house = new createjs.Container();
        house.x = x;
        house.y = y;

        var walls = new createjs.Shape();
        walls.graphics
            .beginFill("brown")
            .rect(0, 0, 100, 100);
        walls.y = -50;
        walls.regX = 50;
        house.addChild(walls);

        var chimney = new createjs.Shape();
        chimney.graphics
            .beginFill("red")
            .rect(0, 0, 20, 40);
        chimney.x = 20;
        chimney.y = -100;
        house.addChild(chimney);

        var roof = new createjs.Shape();
        roof.graphics
            .beginFill("green")
            .moveTo(-50, 50)
            .lineTo(50, 50)
            .lineTo(0, 0);
        roof.y = -50;
        roof.regY = 50;
        house.addChild(roof);

        var window = new createjs.Shape();
        window.graphics
            .beginFill("blue")
            .rect(0, 0, 50, 50);
        window.regX = 25;
        window.regY = 25;
        house.addChild(window);

        house.addChild(draw_smoke(40, -110, 10), draw_smoke(50, -120, 15), draw_smoke(65, -135, 20));

        var frame = new createjs.Shape();
        frame.graphics
            .beginStroke("black")
            .rect(-25, -25, 50, 50)
            .moveTo(0, -25)
            .lineTo(0, 25)
            .moveTo(-25, 0)
            .lineTo(25, 0);

        house.addChild(frame);
        return house;

        function draw_smoke(x, y, r) {
            var smoke = new createjs.Shape();
            smoke.graphics
                .beginFill("gray")
                .drawCircle(x, y, r);
            return smoke
        }
    }

    stage.update();
}

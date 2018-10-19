function init() {

    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');

    function draw() {
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);


        ctx.restore();
    }
}
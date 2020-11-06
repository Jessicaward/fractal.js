window.onload = function(){
    var window = {
        width: 200,
        height: 200
    };
    var mouse = {
        x: 0,
        y: 0,
        clicked: false
    };
    var canvas = document.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    var maximumNumberOfRecursiveIterations = 64;

    canvas.width = window.width;
    canvas.height = window.height;
    
    //constant for julia set equation
    var constant = math.complex(0.28, 0.01);

    //how much fractal moves when clicked.
    var pan = math.complex(0, 0);
    
    //pixelToPoint converts XY pixel coordinates to complex numbers.
    //A complex number is a number that can be expressed as a point (so a+b(i))
    //This takes the X and Y coordinates for a pixel, divides them to get the percentage of the overall...
    //width and height of the window, and returns the percentage on a point from -1 to +1.
    let pixelToPoint = (x,y) => math.complex((x / window.width) * 2 - 1, 1 - (y / window.height) * 2).add(pan);

    //pointToColour simply represents a point as a colour, wavy dude.
    function pointToColour(point) {
        var percentage = julia(point) / maximumNumberOfRecursiveIterations;
        return `rgb(${percentage * 255}, ${percentage * 255}, ${percentage * 255})`;
    }

    function update() {
        console.log(constant.toString());
        draw();
    }

    function click(event) {
        //Ignore first click.
        if(!mouse.clicked) {
            mouse.clicked = true;
            return;
        }

        mouse.x = event.clientX - canvas.offsetLeft;
        mouse.y = event.clientY - canvas.offsetTop;

        pan = pixelToPoint(mouse.x, mouse.y);

        update();
    }
    
    function move(event) {
        //don't move after the first click.
        if(mouse.clicked) {
            return;
        }

        mouse.x = event.clientX-canvas.offsetLeft;
        mouse.y = event.clientY-canvas.offsetTop;
        constant = pixelToPoint(mouse.x, mouse.y);
    
        //round the constant to the nearest 0.01
        constant.re = math.round(constant.re*100)/100;
        constant.im = math.round(constant.im*100)/100;
    
        update();
    }

    //Recursive function that applies simple equation:
    //f(z) = z^2 + c
    function julia(z, i = 0) {
        z = z.mul(z);
        z = z.add(constant);

        if(math.abs(z) > 2 || i == maximumNumberOfRecursiveIterations) {
            return i;
        }

        return julia(z, i+1);
    }

    function draw() {
        for(var x = 0; x < window.width; x++) {
            for(var y = 0; y < window.height; y++) {
                ctx.fillStyle = pointToColour(pixelToPoint(x, y));
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }

    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('click', click);
    update();
};
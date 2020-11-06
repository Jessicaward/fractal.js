window.onload = function(){
    var window = {
        width: 200,
        height: 200
    };
    var canvas = document.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    var maximumNumberOfRecursiveIterations = 128;

    canvas.width = window.width;
    canvas.height = window.height;
    
    //list of cool fractals I've found
    var startingFractals = [
        {x: 137, y: 119},
        {x: 34, y: 52},
        {x: 133, y: 81},
        {x: 126, y: 51},
        {x: 94, y: 18}
    ];

    //constant for julia set equation
    var constant = math.complex(0.28, 0.01);
    var relativeDiff = 2;
    var startingFractal = startingFractals[Math.floor(Math.random() * startingFractals.length)];
    
    //pixelToPoint converts XY pixel coordinates to complex numbers.
    //A complex number is a number that can be expressed as a point (so a+b(i))
    //This takes the X and Y coordinates for a pixel, divides them to get the percentage of the overall...
    //width and height of the window, and returns the percentage on a point from -1 to +1.
    let pixelToPoint = (x,y) => math.complex((x / window.width) * 2 - 1, 1 - (y / window.height) * 2);

    let random = (min, max) => min + Math.random() * (max - min);

    //pointToColour simply represents a point as a colour, wavy dude.
    function pointToColour(point) {
        var percentage = julia(point) / maximumNumberOfRecursiveIterations;
        return `rgb(${point.re * 64}, ${point.im * 64}, ${percentage * 255})`;
    }

    function update() {
        for(var x = 0; x < window.width; x++) {
            for(var y = 0; y < window.height; y++) {
                ctx.fillStyle = pointToColour(pixelToPoint(x, y));
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }

    //Recursive function that applies simple equation:
    //f(z) = z^2 + c
    function julia(z, i = 0) {
        z = z.mul(z).add(constant);

        if(math.abs(z) > 2 || i == maximumNumberOfRecursiveIterations) {
            return i;
        }

        return julia(z, i+1);
    }

    //change fractal every 500 ms
    setInterval(function() {
        constant = pixelToPoint(random(startingFractal.x - relativeDiff, startingFractal.x + relativeDiff), random(startingFractal.y - relativeDiff, startingFractal.y + relativeDiff));

        //round the constant to the nearest 0.01
        constant.re = math.round(constant.re*100)/100;
        constant.im = math.round(constant.im*100)/100;

        update();
    }, 50);
};
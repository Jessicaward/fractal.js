window.onload = function(){
    var window = {
        width: 200,
        height: 200
    };
    var mouse = {
        x: 0,
        y: 0
    };
    var canvas = document.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    var maximumNumberOfRecursiveIterations = 64;

    canvas.width = window.width;
    canvas.height = window.height;
    
    //constant for julia set equation
    var constant = math.complex(0.28, 0.01);
    
    //pixelToPoint converts XY pixel coordinates to complex numbers.
    //A complex number is a number that can be expressed as a point (so a+b(i))
    //This takes the X and Y coordinates for a pixel, divides them to get the percentage of the overall...
    //width and height of the window, and returns the percentage on a point from -1 to +1.
    let pixelToPoint = (x,y) => math.complex((x / window.width) * 2 - 1, 1 - (y / window.height) * 2);

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

    canvas.addEventListener('pointermove', function(event){
        mouse.x = event.clientX-canvas.offsetLeft;
        mouse.y = event.clientY-canvas.offsetTop;
        constant = pixelToPoint(mouse.x, mouse.y);

        //round the constant to the nearest 0.01
        constant.re = math.round(constant.re*100)/100;
        constant.im = math.round(constant.im*100)/100;

        update();
    });

    update();
};
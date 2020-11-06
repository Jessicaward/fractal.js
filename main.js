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

canvas.width = window.width;
canvas.height = window.height;
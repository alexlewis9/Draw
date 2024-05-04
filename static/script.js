const canvas = document.querySelector(".myCanvas");
const width = canvas.width;
const height = canvas.height;
const ctx = canvas.getContext("2d");

const hexChars = '0123456789ABCDEF';

var socket = io();

var pressed = false;
var color = getRandomColor();

function getRandomColor() {
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hexChars[Math.floor(Math.random() * hexChars.length)];
    }
    return color;
}

function wipe() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
}

document.addEventListener("mousemove", (e) => {
    var rect = canvas.getBoundingClientRect();
    scaleX = canvas.width / rect.width;
    scaleY = canvas.height / rect.height;
    x = (e.pageX - rect.left) * scaleX;
    y = (e.pageY - rect.top) * scaleY;
    if (pressed) {
        socket.emit('movement', {color: color, x: x, y: y});
    }
});

canvas.addEventListener("mousedown", () => (pressed = true));

canvas.addEventListener("mouseup", () => (pressed = false));

socket.on('update', function(data) {
    ctx.fillStyle = data.color;
    ctx.beginPath();
    ctx.arc(data.x, data.y, 1, 0, 2 * Math.PI);
    ctx.fill();
});

socket.on('wipe', wipe);
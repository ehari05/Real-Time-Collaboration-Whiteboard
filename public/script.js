const socket = io();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 100;

let drawing = false;

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);

canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;

    const x = e.clientX;
    const y = e.clientY;

    draw(x, y);
    socket.emit("draw", { x, y });
});

function draw(x, y) {
    ctx.fillRect(x, y, 2, 2);
}

socket.on("draw", (data) => {
    draw(data.x, data.y);
});

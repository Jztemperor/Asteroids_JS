import Ship from "./ship.js";
// Get canvas, context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set canvas to fill the screen
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Set canvas to black
canvas.style.background = "black";

const clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// Create a ship object
let ship = new Ship(canvas.width / 2, canvas.height / 2, 35);

console.log(ship);
const update = () => {
  clear();
  ship.draw(ctx);
};

window.onload = function () {
  setInterval(update, 10);
};

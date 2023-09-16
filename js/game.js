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

// Method to update the game for each tick inside gameloop
const update = () => {
  clear();
  ship.rotate(isRotatingLeft, isRotatingRight);
  ship.accelearate(isAccelerating);
  ship.updatePosition();
  ship.backToCanvas();
  ship.draw(ctx);
};

let isRotatingLeft = false;
let isRotatingRight = false;
let isAccelerating = false;

const gameLoop = () => {
  update();
  requestAnimationFrame(gameLoop);
};

// Start game
gameLoop();

// Setup key event listeners
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    isRotatingLeft = true;
  } else if (event.key === "ArrowRight") {
    isRotatingRight = true;
  } else if (event.key === "ArrowUp") {
    isAccelerating = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    isRotatingLeft = false;
  } else if (event.key === "ArrowRight") {
    isRotatingRight = false;
  } else if (event.key === "ArrowUp") {
    isAccelerating = false;
  }
});

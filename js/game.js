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

const update = () => {
  clear();
  ship.updatePosition();
  ship.draw(ctx);
};

let isAccelerating = false;
const gameLoop = () => {
  if (isAccelerating) {
    // Increase the ship's speed when accelerating
    ship.speed += 0.1; // You can adjust this value as needed
  } else {
    // Decelerate the ship (optional)
    ship.speed *= 0.99; // You can adjust this value as needed
  }

  update();
  requestAnimationFrame(gameLoop);
};

gameLoop();

// Setup key event listeners
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    ship.angle += ship.rotationSpeed;
  } else if (event.key == "ArrowRight") {
    ship.angle -= ship.rotationSpeed;
  } else if (event.key === "ArrowUp") {
    isAccelerating = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowUp") {
    isAccelerating = false;
  }
});

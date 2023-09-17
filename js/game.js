import Ship from "./ship.js";
import Asteroid from "./asteroid.js";
import AsteroidFactory from "./asteroidFactory.js";

// Get canvas, context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

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

// asteroid logic

// helper class for asteroid creation, image loading
let asteroidFactory = new AsteroidFactory();
// Asteroid creation
let asteroids = asteroidFactory.createAsteroids(10, canvas);

// Method to update the game for each tick inside gameloop
const update = () => {
  clear();
  ship.rotate(isRotatingLeft, isRotatingRight);
  ship.accelearate(isAccelerating);
  ship.updatePosition();
  ship.backToCanvas();
  //ship.didCollide(asteroids);
  ship.draw(ctx);

  asteroids.forEach((asteroid) => {
    asteroid.x += asteroid.speedX;
    asteroid.y += asteroid.speedY;

    asteroid.backToCanvas();

    const asteroidImageData = ctx.getImageData(
      asteroid.x,
      asteroid.y,
      asteroid.size,
      asteroid.size
    );

    // Handle collision
    if (ship.didCollide(asteroidImageData, asteroid)) {
      gameOver = true;
    }

    ctx.drawImage(
      asteroid.image,
      asteroid.x,
      asteroid.y,
      asteroid.size,
      asteroid.size
    );
  });
};

let isRotatingLeft = false;
let isRotatingRight = false;
let isAccelerating = false;
let gameOver = false;

const gameLoop = () => {
  if (!gameOver) {
    update();
    requestAnimationFrame(gameLoop);
  } else {
    // Game over logic, e.g., displaying a game over message
    ctx.fillStyle = "white";
    ctx.font = "36px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
  }
};

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

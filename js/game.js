import Ship from "./ship.js";
import Asteroid from "./asteroid.js";
import AsteroidFactory from "./asteroidFactory.js";

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

// asteroid logic

// helper class for asteroid creation, image loading
let asteroidFactory = new AsteroidFactory();
// Asteroid creation
let asteroids = asteroidFactory.createAsteroids(10, canvas);

let gameOver = false;
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

    // Loop through the pixel data to check for white pixels
    for (let i = 0; i < asteroidImageData.data.length; i += 4) {
      // Extract the RGB values
      const red = asteroidImageData.data[i];
      const green = asteroidImageData.data[i + 1];
      const blue = asteroidImageData.data[i + 2];

      // Check if the pixel is white (255, 255, 255)
      if (red === 255 && green === 255 && blue === 255) {
        // Calculate the pixel's position relative to the asteroid
        const pixelX = (i / 4) % asteroid.size;
        const pixelY = Math.floor(i / 4 / asteroid.size);

        // Calculate the pixel's absolute position on the canvas
        const absoluteX = asteroid.x + pixelX;
        const absoluteY = asteroid.y + pixelY;

        // Calculate the distance between the ship's center and the pixel
        const dx = ship.x - absoluteX;
        const dy = ship.y - absoluteY;
        const distance = Math.sqrt(dx * dx + dy * dy) - ship.size / 2;

        // Set a collision threshold (adjust this value as needed)
        const collisionThreshold = ship.size;

        // Check for collision based on distance
        if (
          absoluteX >= ship.x &&
          absoluteX <= ship.x + ship.size &&
          absoluteY >= ship.y &&
          absoluteY <= ship.y + ship.size &&
          distance < collisionThreshold &&
          asteroidImageData.data[i + 3] != 0
        ) {
          gameOver = true;
          break;
        }
      }
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

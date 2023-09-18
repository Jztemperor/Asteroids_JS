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
  ship.draw(ctx);
  ship.updateProjectiles();
  ship.drawProjectiles(ctx);

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

    // Check if asteroids is shot
    for (let j = ship.projectiles.length - 1; j >= 0; j--) {
      const projectile = ship.projectiles[j];

      // Check for collision
      if (asteroid.collideWithProjectile(projectile)) {
        // Handle the collision, e.g., decrease asteroid health
        asteroid.health -= 1;
        if (asteroid.health <= 0) {
          // Remove the asteroid if health is zero or less
          asteroids = arrRemove(asteroids, asteroid);

          // Update player score
          updateScore(asteroid.type);

          // respawn asteroid (so we wont run out of them)
          asteroids.push(asteroidFactory.createAsteroid(canvas));
        }

        // Remove the bullet
        ship.projectiles.splice(j, 1);
      }
    }

    ctx.drawImage(
      asteroid.image,
      asteroid.x,
      asteroid.y,
      asteroid.size,
      asteroid.size
    );

    console.log(asteroids.length);
  });

  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.font = '30px "Press Start 2P", sans-serif';
  ctx.fillText("SCORE: " + score, canvas.width / 2, 50);
};

// Game vars
let isRotatingLeft = false;
let isRotatingRight = false;
let isAccelerating = false;
let gameOver = false;
let score = 0;

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

// Setup keydown event listeners
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    isRotatingLeft = true;
  } else if (event.key === "ArrowRight") {
    isRotatingRight = true;
  } else if (event.key === "ArrowUp") {
    isAccelerating = true;
  } else if (event.key === " ") {
    ship.shoot();
    ship.isShooting = true;
  }
});

// Setup keyup event listeners
document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    isRotatingLeft = false;
  } else if (event.key === "ArrowRight") {
    isRotatingRight = false;
  } else if (event.key === "ArrowUp") {
    isAccelerating = false;
  } else if (event.key === " ") {
    ship.isShooting = false;
  }
});

// Remove given element (object) from an array
const arrRemove = (arr, val) => {
  return arr.filter((check) => {
    return check != val;
  });
};

// Update player's score based on asteroid type
const updateScore = (asteroidType) => {
  if (
    asteroidType === "largeAsteroid1" ||
    asteroidType === "largeAsteroid2" ||
    asteroidType === "largeAsteroid3"
  ) {
    score += 5;
  } else if (
    asteroidType === "mediumAsteroid1" ||
    asteroidType === "mediumAsteroid3"
  ) {
    score += 3;
  } else {
    score += 1;
  }
};

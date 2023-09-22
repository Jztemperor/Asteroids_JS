import Ship from "./ship.js";
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
let asteroids = asteroidFactory.createAsteroids(10, canvas, ship);

const displayScore = () => {
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.font = '30px "Press Start 2P", sans-serif';
  ctx.fillText("SCORE: " + score, canvas.width / 2, 50);
};

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
        // Handle the collision
        asteroid.health -= 1;
        if (asteroid.health <= 0) {
          // Remove the asteroid if health is zero or less
          asteroids = arrRemove(asteroids, asteroid);

          // Update player score
          updateScore(asteroid.type);

          // respawn asteroid (so we wont run out of them)
          asteroids.push(asteroidFactory.createAsteroid(canvas, ship));
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
  });

  displayScore();
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
    clear();
    saveScore();
    displayScore();

    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.font = '20px "Press Start 2P", sans-serif';
    ctx.fillText(
      "GAME OVER, press 'R' to restart or 'S' to view scoreboard!",
      canvas.width / 2,
      canvas.height / 2
    );
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
  } else if (event.key === "r" && gameOver == true) {
    restartGame();
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

const restartGame = () => {
  clear();

  // Reset ship
  ship = new Ship(canvas.width / 2, canvas.height / 2, 35);

  // Reset asteroids
  asteroids = asteroidFactory.createAsteroids(10, canvas, ship);

  // Reset game vars
  isRotatingLeft = false;
  isRotatingRight = false;
  isAccelerating = false;
  gameOver = false;
  score = 0;

  gameLoop();
};

// send post request to save game score
const saveScore = () => {
  let xhttp = new XMLHttpRequest();

  xhttp.open("POST", "score.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  // Add the game score to the request parameters
  let params = "score=" + score;

  // Send the game score request
  xhttp.send(params);
};

/*
 * Background effect for main menu
 *
 */

// Get canvas
const backgroundCanvas = document.getElementById("backgroundCanvas");
const context = backgroundCanvas.getContext("2d");

// Set canvas to fill window
backgroundCanvas.width = window.innerWidth;
backgroundCanvas.height = window.innerHeight;

// Define asteroid images
const asteroidImages = {
  largeAsteroid1: "../assets/larg_asteroid_1.png",
  largeAsteroid2: "./assets/larg_asteroid_2.png",
  largeAsteroid3: "./assets/larg_asteroid_3.png",
  mediumAsteroid1: "./assets/medium_asteroid_1.png",
  mediumAsteroid3: "./assets/medium_asteroid_3.png",
  smallAsteroid1: "./assets/small_asteroid_1.png",
  smallAsteroid2: "./assets/small_asteroid_2.png",
  smallAsteroid3: "./assets/small_asteroid_3.png",
};

// Array to store asteroid objects
const asteroids = [];

// Array to store asteroid image objects
const asteroidImageObjects = {};

// Load all asteroid images
for (const key in asteroidImages) {
  const image = new Image();
  image.src = asteroidImages[key];
  asteroidImageObjects[key] = image;
}

// Function to initialize and animate moving asteroids
function animateAsteroids() {
  // Clear the canvas
  context.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

  // Update and draw each asteroid
  asteroids.forEach((asteroid) => {
    // Update asteroid position
    asteroid.x += asteroid.speedX;
    asteroid.y += asteroid.speedY;

    // Draw the asteroid image based on its type
    const asteroidImage = asteroidImageObjects[asteroid.type];
    context.drawImage(
      asteroidImage,
      asteroid.x - asteroid.radius,
      asteroid.y - asteroid.radius,
      asteroid.radius * 2,
      asteroid.radius * 2
    );

    // Reset asteroid position when it goes off-screen
    if (asteroid.x < -asteroid.radius) {
      asteroid.x = backgroundCanvas.width + asteroid.radius;
    }
    if (asteroid.y < -asteroid.radius) {
      asteroid.y = backgroundCanvas.height + asteroid.radius;
    }
    if (asteroid.x > backgroundCanvas.width + asteroid.radius) {
      asteroid.x = -asteroid.radius;
    }
    if (asteroid.y > backgroundCanvas.height + asteroid.radius) {
      asteroid.y = -asteroid.radius;
    }
  });

  // Request the next animation frame
  requestAnimationFrame(animateAsteroids);
}

// Create initial asteroids with adjusted positions and types
for (let i = 0; i < 20; i++) {
  const radius = Math.random() * 20 + 10; // [10 - 30) interval
  const x = Math.random() * backgroundCanvas.width; // Random spawn x
  const y = Math.random() * backgroundCanvas.height; // Random spawn y
  const speedX = Math.random() * 10 - 4;
  const speedY = Math.random() * 10 - 4;

  // Randomly select an asteroid type (large, medium, small)
  const asteroidTypes = [
    "largeAsteroid1",
    "largeAsteroid2",
    "largeAsteroid3",
    "mediumAsteroid1",
    "mediumAsteroid3",
    "smallAsteroid1",
    "smallAsteroid2",
    "smallAsteroid3",
  ];
  const type = asteroidTypes[Math.floor(Math.random() * asteroidTypes.length)];

  asteroids.push({ x, y, radius, speedX, speedY, type });
}

// Start animating asteroids
animateAsteroids();

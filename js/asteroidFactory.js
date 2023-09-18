import Asteroid from "./asteroid.js";

class AsteroidFactory {
  constructor() {
    this.asteroidImageObjects = {};
    this.asteroidTypes = [
      "largeAsteroid1",
      "largeAsteroid2",
      "largeAsteroid3",
      "mediumAsteroid1",
      "mediumAsteroid3",
      "smallAsteroid1",
      "smallAsteroid2",
      "smallAsteroid3",
    ];
    this.asteroidImages = {
      largeAsteroid1: "/assets/larg_asteroid_1.png",
      largeAsteroid2: "/assets/larg_asteroid_2.png",
      largeAsteroid3: "/assets/larg_asteroid_3.png",
      mediumAsteroid1: "/assets/medium_asteroid_1.png",
      mediumAsteroid3: "/assets/medium_asteroid_3.png",
      smallAsteroid1: "/assets/small_asteroid_1.png",
      smallAsteroid2: "/assets/small_asteroid_2.png",
      smallAsteroid3: "/assets/small_asteroid_3.png",
    };

    this.createImageObjects();
  }

  createImageObjects() {
    for (const key in this.asteroidImages) {
      const image = new Image();
      image.src = this.asteroidImages[key];
      this.asteroidImageObjects[key] = image;
    }
  }

  // Create one asteroid
  createAsteroid(canvas, ship) {
    const minDistanceFromShip = 10;
    let asteroidX, asteroidY;

    do {
      asteroidX = Math.random() * canvas.width;
      asteroidY = Math.random() * canvas.height;
    } while (
      Math.sqrt((asteroidX - ship.x) ** 2 + (asteroidY - ship.y) ** 2) <
      minDistanceFromShip
    );

    const asteroid = new Asteroid(
      asteroidX, // Random spawn x
      asteroidY, // Random spawn y
      this.asteroidTypes[Math.floor(Math.random() * this.asteroidTypes.length)],
      this.asteroidImageObjects
    );

    return asteroid;
  }

  // Create multiple asteroids
  createAsteroids(amount, canvas, ship) {
    const asteroids = [];
    const minDistanceFromShip = 10;

    for (let i = 0; i < amount; i++) {
      let asteroidX, asteroidY;

      // Generate a random position for the asteroid while ensuring it's not too close to the ship
      do {
        asteroidX = Math.random() * canvas.width;
        asteroidY = Math.random() * canvas.height;
      } while (
        Math.sqrt((asteroidX - ship.x) ** 2 + (asteroidY - ship.y) ** 2) <
        minDistanceFromShip
      );

      const asteroid = new Asteroid(
        asteroidX,
        asteroidY,
        this.asteroidTypes[
          Math.floor(Math.random() * this.asteroidTypes.length)
        ],
        this.asteroidImageObjects
      );

      asteroids.push(asteroid);
    }

    return asteroids;
  }
}
export default AsteroidFactory;

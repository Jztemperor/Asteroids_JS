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

  createAsteroids(amount, canvas) {
    const asteroids = [];

    for (let i = 0; i < amount; i++) {
      const asteroid = new Asteroid(
        Math.random() * canvas.width, // Random spawn x
        Math.random() * canvas.height, // Random spawn y
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

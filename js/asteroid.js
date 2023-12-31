class Asteroid {
  constructor(x, y, type, asteroidImageObjects) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.image = asteroidImageObjects[this.type];
    if (
      type === "largeAsteroid1" ||
      type === "largeAsteroid2" ||
      type === "largeAsteroid3"
    ) {
      this.size = 70;
      this.speedX = this.getRandomNumber(-1, 3);
      this.speedY = this.getRandomNumber(-2, 4);
      this.health = 3;
    } else if (type === "mediumAsteroid1" || type === "mediumAsteroid3") {
      this.size = 45;
      this.speedX = this.getRandomNumber(-3, 4);
      this.speedY = this.getRandomNumber(-4, 5);
      this.health = 2;
    } else {
      this.size = 35;
      this.speedX = this.getRandomNumber(-5, 5);
      this.speedY = this.getRandomNumber(-6, 7);
      this.health = 1;
    }
  }

  getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  backToCanvas() {
    if (this.x < 0) {
      this.x = canvas.width;
    } else if (this.x > canvas.width) {
      this.x = 0;
    }

    if (this.y < 0) {
      this.y = canvas.height;
    } else if (this.y > canvas.height) {
      this.y = 0;
    }
  }

  collideWithProjectile(projectile) {
    const dx = this.x + this.size / 2 - projectile.x;
    const dy = this.y + this.size / 2 - projectile.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.size / 2;
  }
}

export default Asteroid;

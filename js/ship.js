import Projectile from "./projectile.js";

class Ship {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.rotationSpeed = 3;
    this.speed = 0;
    this.maxSpeed = 10;
    this.angle = 0;
    this.projectiles = [];
    this.lastShot = 0;
    this.cooldown = 200;
    this.isShooting = false;
  }

  draw(ctx) {
    ctx.save();

    ctx.translate(this.x, this.y); // Translate the canvas context
    ctx.rotate((this.angle * Math.PI) / 180);

    // Draw the ship at the local origin (0, 0)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-this.size / 2, this.size);
    ctx.lineTo(this.size / 2, this.size);
    ctx.closePath();

    ctx.lineWidth = 6;
    ctx.strokeStyle = "#FFFFFF";
    ctx.fillStyle = "#000000";
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }

  updatePosition() {
    // Convert the ship's angle to radians
    const angleInRadians = ((90 - this.angle) * Math.PI) / 180; // Adjust the angle

    // Calculate the x and y components of the ship's velocity
    const vx = Math.cos(angleInRadians) * this.speed;
    const vy = Math.sin(angleInRadians) * this.speed;

    // Update the ship's position
    this.x += vx;
    this.y -= vy; // Subtract vy because the y-axis is inverted in canvas
  }

  // Handle rotations based on user
  rotate(isRotatingLeft, isRotatingRight) {
    if (isRotatingLeft) {
      this.angle -= this.rotationSpeed;
    } else if (isRotatingRight) {
      this.angle += this.rotationSpeed;
    }
  }

  // Speed up the ship if the user is accelerating and the max speed is not reached
  accelearate(isAccelerating) {
    if (isAccelerating && this.speed < this.maxSpeed) {
      // Increase the ship's speed when accelerating
      this.speed += 1;
    } else {
      // Decelerate the ship
      this.speed *= 0.99;
    }
  }

  // Put ship back to canvas on the opposite side if it leaves
  backToCanvas() {
    // Check if ship left on X axis (left side - put back to canvas width, right side - put to 0)
    // canvas width == right side
    // canvas width = 0 == left side
    if (this.x < 0) {
      this.x = canvas.width;
    } else if (this.x > canvas.width) {
      this.x = 0;
    }

    // Check if ship left on Y axis
    // Canvas height == top side
    // Canvas height = 0 == bottom
    if (this.y < 0) {
      this.y = canvas.height;
    } else if (this.y > canvas.height) {
      this.y = 0;
    }
  }

  // Collision detection
  // - Check for white pixels in asteroid img data (border...)
  // Calculate distance from pixel to ship (kinda)
  // if distance < treshold -> collision
  didCollide(asteroidImageData, asteroid) {
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
        const dx = this.x - absoluteX;
        const dy = this.y - absoluteY;
        const distance = Math.sqrt(dx * dx + dy * dy) - this.size / 2;

        // Set a collision threshold
        const collisionThreshold = this.size;

        if (asteroidImageData.data[i + 3] == 0) return;
        // Check for collision based on distance
        if (
          absoluteX >= this.x &&
          absoluteX <= this.x + this.size &&
          absoluteY >= this.y &&
          absoluteY <= this.y + this.size &&
          distance < collisionThreshold &&
          asteroidImageData.data[i + 3] != 0
        ) {
          return true;
        }
      }
    }
  }

  shoot() {
    const currentTime = Date.now();
    // Prevent spamming of bullets, prevent holding down space to shoot
    if (!this.isShooting && currentTime - this.lastShot >= this.cooldown) {
      const projectile = new Projectile(this.x, this.y, this.angle);
      this.projectiles.push(projectile);
      this.lastShot = currentTime;
      this.isShooting = true;
    }
  }

  drawProjectiles(ctx) {
    this.projectiles.forEach((projectile) => {
      projectile.draw(ctx);
    });
  }

  updateProjectiles() {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const projectile = this.projectiles[i];
      projectile.updatePosition();

      // Remove projectiles that are out of bounds
      if (
        projectile.x < 0 ||
        projectile.x > canvas.width ||
        projectile.y < 0 ||
        projectile.y > canvas.height
      ) {
        this.projectiles.splice(i, 1);
      }
    }
  }
}

export default Ship;

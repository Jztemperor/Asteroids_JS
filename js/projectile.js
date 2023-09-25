class Projectile {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.speed = 12;
    this.angle = angle;
    this.wallTraveled = false;
  }

  updatePosition() {
    // Convert the ship's angle to radians
    const angleInRadians = ((90 - this.angle) * Math.PI) / 180;

    // Calculate the x and y components of the ship's velocity
    const vx = Math.cos(angleInRadians) * this.speed;
    const vy = Math.sin(angleInRadians) * this.speed;

    this.x += vx;
    this.y -= vy; // Subtract vy because the y-axis is inverted in canvas
  }

  draw(ctx) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(this.x, this.y, 7, 7);
  }

  backToCanvas() {
    if (this.x < 0) {
      this.x = canvas.width;
      this.wallTraveled = true;
    } else if (this.x > canvas.width) {
      this.x = 0;
      this.wallTraveled = true;
    }

    if (this.y < 0) {
      this.y = canvas.height;
      this.wallTraveled = true;
    } else if (this.y > canvas.height) {
      this.y = 0;
      this.wallTraveled = true;
    }
  }
}

export default Projectile;

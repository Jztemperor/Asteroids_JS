class Ship {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.rotationSpeed = 7;
    this.speed = 0;
    this.angle = 0;
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

    ctx.lineWidth = 4;
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

  accelearate(isAccelerating) {
    if (isAccelerating) {
      // Increase the ship's speed when accelerating
      this.speed += 0.1; // You can adjust this value as needed
    } else {
      // Decelerate the ship (optional)
      this.speed *= 0.99; // You can adjust this value as needed
    }
  }
}

export default Ship;

class Ship {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.rotationSpeed = 3;
    this.speed = 0;
    this.maxSpeed = 10;
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
}

export default Ship;

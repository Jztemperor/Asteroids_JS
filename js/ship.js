class Ship {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.rotation = 0;
    this.speed = 0;
  }

  draw(ctx) {
    ctx.save();

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.size / 2, this.y + this.size);
    ctx.lineTo(this.x + this.size / 2, this.y + this.size);
    ctx.closePath();

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FFFFFF";
    ctx.fillStyle = "#000000";
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }
}

export default Ship;

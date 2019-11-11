import { ctx, cw, ch } from './main';

const gapX = 5;
const gapY = 5;

class Brick {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isOn = true;
  }
  move(y) {
    this.y += y;
  }
  draw() {
    ctx.fillStyle = 'rgb(0,0,200)';
    if (this.isOn === true) ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
function generateBricks(numbOfRows, bricksInRow, brickWidth, brickHeight) {
  const bricks = [];
  for (let i = 0; i < numbOfRows; i++) {
    bricks[i] = [];
    for (let j = 0; j < bricksInRow; j++) {
      const x = gapX + j * gapX + j * brickWidth;
      const y = gapY + i * gapY + i * brickHeight;
      bricks[i][j] = new Brick(x, y, brickWidth, brickHeight);
    }
  }
  return bricks;
}
class Bricks {
  constructor(numbOfRows, bricksInRow, brickWidth, brickHeight) {
    this.bricks = generateBricks(numbOfRows, bricksInRow, brickWidth, brickHeight);
    this.numbOfRows = numbOfRows;
    this.bricksInRow = bricksInRow;
  }

  drawBricks() {
    for (let i = 0; i < this.numbOfRows; i++) {
      for (let j = 0; j < this.bricksInRow; j++) {
        this.bricks[i][j].draw();
      }
    }
  }
}

export default Bricks;

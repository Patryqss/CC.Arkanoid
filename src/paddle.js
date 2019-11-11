import { ctx, cw, ch } from './main';

class Paddle {
  constructor(x) {
    this.length = 100;
    this.height = 30;
    this.x = x - this.length / 2;
    this.spaceFromBorder = 10;
  }
  draw() {
    ctx.fillStyle = '#CA540D';
    ctx.fillRect(this.x, ch - this.height, this.length, this.height - this.spaceFromBorder);
  }
  movePaddle(e) {
    switch (e.keyCode) {
      case 37: {
        if (this.x > 0) {
          this.x -= this.xSpeed;
        }
        break;
      }
      case 39: {
        if (this.x < cw - 100) {
          this.x += this.xSpeed;
        }
        break;
      }
    }
  }
}
export default Paddle;

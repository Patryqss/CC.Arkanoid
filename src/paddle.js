import { ctx, cw, ch } from './main';

class Paddle {
  constructor(x) {
    this.length = 100;
    this.height = 30;
    this.x = x - this.length / 2;
    this.spaceFromBorder = 10;
  }
  draw() {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, ch - this.height, this.length, this.height - this.spaceFromBorder);
  }
}

export default Paddle;

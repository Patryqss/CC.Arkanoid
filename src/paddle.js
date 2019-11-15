import { ctx, cw, ch } from './main';

var pad = new Image();
pad.src = 'https://cdn.wikimg.net/en/strategywiki/images/f/f8/Arkanoid_Vaus.gif';

class Paddle {
    constructor(x) {
        this.length = 100;
        this.height = 30;
        this.x = x - this.length / 2;
        this.spaceFromBorder = 10;
        this.xSpeed = 20;
    }
    draw() {
        // ctx.fillStyle = '#CA540D';
        // ctx.fillRect(this.x, ch - this.height, this.length, this.height - this.spaceFromBorder);

        ctx.drawImage(pad, this.x - this.length / 5, ch - this.height, this.length * 1.5, this.height);
    }
    movePaddle(e) {
        switch (e.keyCode) {
            case 37:
                {
                    if (this.x > 0) {
                        this.x -= this.xSpeed;
                    }
                    break;
                }
            case 39:
                {
                    if (this.x < cw - this.length) {
                        this.x += this.xSpeed;
                    }
                    break;
                }
        }

    }
}
export default Paddle;
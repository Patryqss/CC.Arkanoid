import { ctx, cw, ch } from './main';

class Ball {
    constructor(x, height) {
        this.size = 10;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.x = x;
        this.y = ch - height - this.size;
    }

    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
    onHit() {
        //Check if hit sth

        let margin = Math.floor((Math.random() * 2) - 1); // random func. -1 to 1

        if (this.y < 0 + this.size) {
            this.ySpeed = 5;
        } else if (this.y > 560) {
            this.ySpeed = -5;
        }

        if (this.x < 0 + this.size) {
            this.xSpeed = 2;
        } else if (this.x > 600 - this.size) {
            this.xSpeed = -2 + margin;
            console.log('margin => ' + margin)
        }
    }
}
export default Ball;
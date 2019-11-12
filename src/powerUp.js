import { ctx, ch } from './main';



class PowerUp {
    constructor(x) {
        this.x = x;
        this.y;

        this.width = 50
        this.height = 20;
        this.yBottom = ch - this.height;
        this.ySpeed = 0;

    }

    move() {
        this.y += this.ySpeed;
    }

    PowerUpDraw() {
        ctx.fillStyle = 'orange';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    createPowerUp(brick) {

        this.x = brick.x;
        this.y = brick.y;
        this.ySpeed = 2;
    }

    onPaddle(paddle, x) {
        if (x <= paddle.x + paddle.length && x >= paddle.x) {

            return true;
        }

        return false;
    }

    onHit(paddle) {
        if (this.y > this.yBottom) {
            if (this.onPaddle(paddle, this.x)) {
                console.log("powerUp")
                return true;

            }
        }
    }
}
export default PowerUp;
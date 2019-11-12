import { ctx, cw, ch } from './main';


class PowerUp {
    constructor() {
        this.x;
        this.y;
        this.width = 50
        this.height = 20;
        this.ySpeed = 0;
        // this.color = 
    }

    move() {
        this.y += this.ySpeed;
    }

    PowerUpDraw() {
        ctx.fillStyle = 'orange';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    createPowerUp(brick) {
        // this.color = losowy
        this.x = brick.x;
        this.y = brick.y;
        this.ySpeed = 2;
    }
}
export default PowerUp;
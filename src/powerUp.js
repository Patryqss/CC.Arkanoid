import { ctx, cw, ch } from './main';

class PowerUp {
    constructor(x) {
        this.x = x;
        this.y;

        this.width = 50
        this.height = 20;
        this.yBottom = ch - this.height;
        this.ySpeed = 0;
        this.yBarrier;
        this.barrierIsOn = false;
        this.counter = 0;
    }

    move() {
        this.y += this.ySpeed;
    }

    PowerUpDraw() {
        ctx.fillStyle = 'orange';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.barrierIsOn) {
            ctx.fillStyle = '#0A513D';
            ctx.fillRect(0, ch - this.yBarrier, cw, 10);
            this.counter++;
            if (this.counter >= 500) {
                this.counter = 0;
                this.barrierIsOn = false;
            }
        }
    }

    // tworzy powerUp w miejscu zniszczenia cegły
    createPowerUp(brick) {
        this.x = brick.x;
        this.y = brick.y;
        this.ySpeed = 3;
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
        return false;
    }

    // funkcja uruchamiająca powerUP
    runPowerUp(paddle, ball) {
        let num = 2;
        if (this.onHit(paddle)) { // czy power up upadł na paletkę
            switch (num) {
                case 1: // powiększenie piłki
                    ball.size = 20;
                    break;
                case 2: // powięszenie paletki
                    paddle.length = 150;
                    break;
                case 3: // zmiana prędkości piłki
                    ball.calcYSpeed(6);
                    break;
                case 4: // stworzenie bariery na x sekund ____ JESCZE DOPRACOWAĆ
                    this.yBarrier = 5;
                    this.barrierIsOn = true;
                    ball.powerUpBarrier = this.barrierIsOn ? true : false;
                    break;
                case 5: // zmiana prędkości paletki
                    paddle.xSpeed = 4;
                    break;
                default:
                    break;
            }
        }

    }
}
export default PowerUp;
import { ctx, cw, ch } from './main';

class PowerUp {
    constructor() {
        this.x;
        this.y;

        this.width = 50
        this.height = 20;
        this.yBottom = ch - this.height;
        this.ySpeed = 0;
        this.yBarrier = 10;
        this.barrierIsOn = false;
        this.counter = 0;
        this.coutnerLimit = 400;
        this.isFalling = false;
        this.numOfBall = 3;
    }

    move() {
        this.y += this.ySpeed;
    }

    draw(paddleHeight) {
        // warunek powoduje, że jedoncześnie wyświetla się tylko jeden powerUp
        if (this.isFalling) {
            ctx.fillStyle = 'orange';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            if (this.y >= ch) {
                this.isFalling = false;
            }
        }

        // rysowanie bariery
        if (this.barrierIsOn) {
            ctx.fillStyle = '#0A513D';
            ctx.fillRect(0, ch - this.yBarrier - paddleHeight, cw, this.yBarrier);
            if (this.counter >= this.coutnerLimit) {
                this.barrierIsOn = false;
                this.counter = 0;
            }
        }

        // pseudo odmieranie czasu trwania efektu
        this.counter++;
    }

    // tworzy powerUp w miejscu zniszczenia cegły
    createPowerUp(brick) {
        if (!this.isFalling) { // jeśli żaden powerUp nie spada, aktywuje powerUp
            this.x = brick.x;
            this.y = brick.y;
            this.ySpeed = 3;
            this.isFalling = true;
        }
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
                this.isFalling = false;
                return true;
            }
        }
        return false;
    }

    // funkcja uruchamiająca powerUP
    runPowerUp(paddle, ball) {
        let num = 5;
        if (this.onHit(paddle)) { // czy power up upadł na paletkę
            switch (num) {
                case 1: // powiększenie piłki
                    ball.size = 20;
                    break;
                case 2: // powięszenie paletki
                    paddle.length = 150;
                    break;
                case 3: // zmniejszenie paletki
                    paddle.length = 50;
                    break;
                case 4: // zwiększenie prędkości piłki
                    ball.calcYSpeed(8);
                    break;
                    // case 5: // zmniejszenie prędkości piłki
                    //     ball.calcYSpeed(3);
                    //     break;
                case 6: // zmniejszenie prędkości paletki
                    paddle.xSpeed = 4;
                    break;
                case 7: // zwiększenie prędkości paletki
                    paddle.xSpeed = 16;
                    break;
                case 8: // stworzenie bariery na x sekund
                    this.barrierIsOn = true;
                    ball.powerUpBarrier = true;
                    this.counter = 0; // reset licznika czasu trwania efektu
                    break;

                default:
                    break;
            }
        }

    }
}
export default PowerUp;
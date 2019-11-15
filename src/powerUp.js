import { ctx, cw, ch } from './main';
import LargeBall from './powerUps/enLargeBall';
import ShrinkBall from './powerUps/shrinkBall';
import LargePaddle from './powerUps/LargePaddle';
import ShrinkPaddle from './powerUps/ShrinkPaddle';
import AccelerateBall from './powerUps/AccelerateBall';
import AcceleratePaddle from './powerUps/AcceleraterPaddle';
import SlowPaddle from './powerUps/SlowPaddle';
import Barrier from './powerUps/Barrier';

const largeBall = new LargeBall();
const shrinkBall = new ShrinkBall();
const largePaddle = new LargePaddle();
const shrinkPaddle = new ShrinkPaddle();
const accelerateBall = new AccelerateBall();
const acceleratePaddle = new AcceleratePaddle();
const slowPaddle = new SlowPaddle();
const barrier = new Barrier();

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
        this.coutnerLimit = 300;
        this.isFalling = false;
        this.isCreate = false;
        this.color = 'orange';
        this.powerUpNumber;
    }

    move() {
        this.y += this.ySpeed;
    }

    draw(paddleHeight) {
        // warunek powoduje, że jedoncześnie wyświetla się tylko jeden powerUp
        if (this.isFalling) {
            ctx.fillStyle = this.color;
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
            this.powerUpNumber = Math.floor(Math.random() * 9 + 1);
            this.isFalling = true;
            this.isCreate = true; // potrzebna aby powerUp aktywował się tylko raz.
        }
    }

    onHit(paddle) {
        if (this.y > this.yBottom) {
            this.isFalling = false;
            if (this.x <= paddle.x + paddle.length && this.x >= paddle.x) {
                return true;
            }
        }
        return false;
    }

    // funkcja uruchamiająca powerUP
    runPowerUp(paddle, ball) {
        // let num = 8;

        if (this.onHit(paddle) && this.isCreate) { // czy power up upadł na paletkę
            this.isCreate = false; // dzięki temu dany power up aktywuje się tylko raz
            switch (9) {
                case 1: // powiększenie piłki
                    // ball.size *= 1.2;
                    largeBall.large(ball);
                    break;
                case 2: // zmniejszenie piłki
                    // ball.size = 5;
                    shrinkBall.shrink(ball);
                    break;
                case 3: // powięszenie paletki
                    // paddle.length = 150;
                    largePaddle.large(paddle);
                    break;
                case 4: // zmniejszenie paletki
                    // paddle.length = 50;
                    shrinkPaddle.shrink(paddle);
                    break;
                case 5: // zwiększenie prędkości piłki
                    // ball.calcYSpeed(8);
                    accelerateBall.accelerate(ball);
                    break;
                case 6: // zmniejszenie prędkości paletki
                    // paddle.xSpeed = 4;
                    slowPaddle.slow(paddle);
                    break;
                case 7: // zwiększenie prędkości paletki
                    // paddle.xSpeed = 16;
                    acceleratePaddle.accelerate(paddle);
                    break;
                case 8: // stworzenie bariery na x sekund
                    this.barrierIsOn = true;
                    // ball.powerUpBarrier = true;
                    barrier.barrierOn(ball);
                    this.counter = 0; // reset licznika czasu trwania efektu
                    break;
                case 9: // resetuje wszystkie zmiany
                    // ball.size = 10;
                    // paddle.length = 100;
                    // ball.calcYSpeed(6);
                    // paddle.xSpeed = 8;
                    ball.size = (largeBall.previousSize !== 0) ? largeBall.previousSize : ball.size;
                    ball.size = (shrinkBall.previousSize !== 0) ? shrinkBall.previousSize : ball.size;
                    paddle.length = (largePaddle.previousSize !== 0) ? largePaddle.previousSize : paddle.length;
                    paddle.length = (shrinkPaddle.previousSize !== 0) ? shrinkPaddle.previousSize : paddle.length;
                    ball.calcYSpeed((accelerateBall.previousSpeed !== 0) ? accelerateBall.previousSpeed : ball.ballSpeed);
                    paddle.xSpeed = (acceleratePaddle.previousSpeed !== 0 ? acceleratePaddle.previousSpeed : paddle.xSpeed);
                    paddle.xSpeed = (slowPaddle.previousSpeed !== 0 ? slowPaddle.previousSpeed : paddle.xSpeed);
                    break;
                default:
                    break;
            }
        }

    }
}
export default PowerUp;
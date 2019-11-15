import Paddle from './paddle';
import Ball from './ball';
import Bricks from './brick';
import PowerUp from './powerUp';

export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');
export const cw = canvas.width;
export const ch = canvas.height;

const paddle = new Paddle(cw / 2);
const ball = new Ball(paddle.x + paddle.length / 2, paddle.height);
const bricks = new Bricks(8, 7, 80, 30);
const powerUp = new PowerUp(ball, paddle);

var background = new Image();
background.src = 'https://www.ctvnews.ca/polopoly_fs/1.4011871.1531487420!/httpImage/image.jpg_gen/derivatives/landscape_620/image.jpg';

const gameLoop = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cw, ch); //tło
    ball.move();
    powerUp.move();
    ctx.drawImage(background, 0, 0, cw, ch);

    // hitInBrick - przechowuje informacje czy oraz z której stronypiłka uderzyła w bloczek
    let hitInBrick = bricks.hitBrick(ball, powerUp);
    ball.onHit(paddle, hitInBrick, powerUp);
    powerUp.runPowerUp(paddle, ball);

    powerUp.draw(paddle.height);
    paddle.draw();
    ball.draw(paddle);
    bricks.drawBricks();

    requestAnimationFrame(gameLoop); // ta linijka musi być zawsze na końcu funkcji
};

document.addEventListener('click', e => {
    console.log(e);
    ball.startBall();
    ball.move();
});

document.addEventListener('keydown', e => {
    paddle.movePaddle(e);
});

requestAnimationFrame(gameLoop);
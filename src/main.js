import Paddle from './paddle';
import Ball from './ball';

export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');
export const cw = canvas.width;
export const ch = canvas.height;

const paddle = new Paddle(cw / 2);
const ball = new Ball(paddle.x + paddle.length / 2, paddle.height);

const gameLoop = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, cw, ch); //tło
  ball.move(0, 0);
  ball.onHit();
  paddle.draw();
  ball.draw();

  requestAnimationFrame(gameLoop); // ta linijka musi być zawsze na końcu funkcji
};

document.addEventListener('click', e => {
  console.log(e);
  ball.ySpeed = -5;
  ball.move();
});

requestAnimationFrame(gameLoop);

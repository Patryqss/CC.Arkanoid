import { ctx } from './main';

const gapX = 5;
const gapY = 5;

class Brick {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isOn = true;
    }
    move(y) {
        this.y += y;
    }
    draw() {
        ctx.fillStyle = 'rgb(0,0,200)';
        if (this.isOn === true) ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function generateBricks(numbOfRows, bricksInRow, brickWidth, brickHeight) {
    const bricks = [];
    for (let i = 0; i < numbOfRows; i++) {
        bricks[i] = [];
        for (let j = 0; j < bricksInRow; j++) {
            const x = gapX + j * gapX + j * brickWidth;
            const y = gapY + i * gapY + i * brickHeight;
            bricks[i][j] = new Brick(x, y, brickWidth, brickHeight);
        }
    }
    return bricks;
}
class Bricks {
    constructor(numbOfRows, bricksInRow, brickWidth, brickHeight) {
        this.bricks = generateBricks(numbOfRows, bricksInRow, brickWidth, brickHeight);
        this.numbOfRows = numbOfRows;
        this.bricksInRow = bricksInRow;
    }

    drawBricks() {
        for (let i = 0; i < this.numbOfRows; i++) {
            for (let j = 0; j < this.bricksInRow; j++) {
                this.bricks[i][j].draw();
            }
        }
    }

    hitBrick(ball, powerUp) {
        for (let i = this.numbOfRows - 1; 0 <= i; i--) {
            for (let j = this.bricksInRow - 1; 0 <= j; j--) {
                for (let cIt = 0; cIt < ball.circlePoints.length; cIt++) {
                    if (ball.circlePoints[cIt].x <= this.bricks[i][j].x + this.bricks[i][j].width &&
                        ball.circlePoints[cIt].x >= this.bricks[i][j].x &&
                        ball.circlePoints[cIt].y <= this.bricks[i][j].y + this.bricks[i][j].height &&
                        ball.circlePoints[cIt].y >= this.bricks[i][j].y && this.bricks[i][j].isOn) {

                        this.bricks[i][j].isOn = false; // zmiana widoczności bloczka
                        powerUp.createPowerUp(this.bricks[i][j]); // Uruchamia Power Up

                        if (ball.circlePoints[cIt].x < this.bricks[i][j].x + this.bricks[i][j].width &&
                            ball.circlePoints[cIt].x > this.bricks[i][j].x) {
                            return 1; // zwraca 1 jeśli piłka odbiła się od ściany górnej lub dolnej
                        } else if (ball.circlePoints[cIt].y <= this.bricks[i][j].y + this.bricks[i][j].height &&
                            ball.circlePoints[cIt].y >= this.bricks[i][j].y) {
                            return 2; // zwraca 2 jeśli piłka odbiła się od bocznych ścian 
                        }
                    }
                }
            }
        }
        return 0; // zwraca 0 jeśli nie ma zderzenia
    }
}

export default Bricks;
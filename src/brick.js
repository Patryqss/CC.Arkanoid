import { ctx } from './main';

const gapX = 5;
const gapY = 5;

var brick_img1 = new Image();
var brick_img2 = new Image();
var brick_img3 = new Image();
var brick_img4 = new Image();
var brick_img5 = new Image();
var brick_img6 = new Image();
var brick_img7 = new Image();
var brick_img8 = new Image();
brick_img1.src = 'https://cdn.wikimg.net/en/strategywiki/images/5/5c/Arkanoid_Brick_White.png';
brick_img2.src = 'https://cdn.wikimg.net/en/strategywiki/images/f/f4/Arkanoid_Brick_Cyan.png';
brick_img3.src = 'https://cdn.wikimg.net/en/strategywiki/images/4/4c/Arkanoid_Brick_Green.png';
brick_img4.src = 'https://cdn.wikimg.net/en/strategywiki/images/e/eb/Arkanoid_Brick_Orange.png';
brick_img5.src = 'https://cdn.wikimg.net/en/strategywiki/images/e/e2/Arkanoid_Brick_Red.png';
brick_img6.src = 'https://cdn.wikimg.net/en/strategywiki/images/1/17/Arkanoid_Brick_Blue.png';
brick_img7.src = 'https://cdn.wikimg.net/en/strategywiki/images/7/77/Arkanoid_Brick_Violet.png';
brick_img8.src = 'https://cdn.wikimg.net/en/strategywiki/images/9/91/Arkanoid_Brick_Yellow.png';
let brick_img = [brick_img1, brick_img2, brick_img3, brick_img4, brick_img5, brick_img6, brick_img7, brick_img8];

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
    draw(i) {
        // ctx.fillStyle = 'rgb(0,0,200)';
        if (this.isOn === true) ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.isOn === true) ctx.drawImage(brick_img[i], this.x, this.y, this.width, this.height);
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
                this.bricks[i][j].draw(i);
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
    allBricksOff(){
        let count = this.numbOfRows * this.bricksInRow;
        for (let i = 0; i < this.numbOfRows; i++) {
            for (let j = 0; j < this.bricksInRow; j++) {
                if(this.bricks[i][j].isOn === false)
                    count--;
            }
        }
        if(count == 0)
            return true;
        return false;
    }
}

export default Bricks;
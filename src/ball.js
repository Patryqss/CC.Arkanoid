import { ctx, cw, ch } from './main';

function generatePointsOnTheCircle(radius, x, y, numbOfPoints) {
    const circlePoints = [];
    for (let i = 0; i < numbOfPoints / 2; i++) {
        let point = {
            x: Math.round(x + radius * Math.cos((i + 1) * (Math.PI / (numbOfPoints / 2)))),
            y: Math.round(y + radius * Math.sin((i + 1) * (Math.PI / (numbOfPoints / 2)))),
        };
        circlePoints.push(point);
    }
    for (let i = 0; i < numbOfPoints / 2; i++) {
        let point = {
            x: Math.round(x + radius * Math.cos((i + 1) * (Math.PI / (numbOfPoints / 2)))),
            y: Math.round(y - radius * Math.sin((i + 1) * (Math.PI / (numbOfPoints / 2)))),
        };
        circlePoints.push(point);
    }
    return circlePoints;
}

class Ball {
    constructor(x, height) {
        this.size = 10;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.x = x;
        this.y = ch - height - this.size;
        this.yBottom = this.y;
        this.isGameStart = false;
        this.circlePoints = generatePointsOnTheCircle(this.size, this.x, this.y, 12);
    }

    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        for (let i = 0; i < this.circlePoints.length; i++) {
            this.circlePoints[i].x += this.xSpeed;
            this.circlePoints[i].y += this.ySpeed;
        }
    }
    draw() {
        ctx.fillStyle = '#E1E634';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    // wystartowanie piłką
    startBall() {
        // Jeśli gra się nie zaczeła, startuje piłkę
        if (!this.isGameStart) {
            const vSpeed = 6; // Prędkość piłki
            // losowe wartości początkowe dla x
            let randomSpeed = Math.floor(Math.random() * (vSpeed - 1) * 2 - (vSpeed - 1));
            if (randomSpeed === 0) {
                // zapobiega pionowego startu
                randomSpeed += 1;
            }
            this.xSpeed = randomSpeed;
            // dobranie y tak aby w zależności od x prędkość wynosiła vSpeed.  y^2 = v^2 - x^2
            this.ySpeed = -Math.abs(Math.sqrt(Math.pow(-vSpeed, 2) - Math.pow(this.xSpeed, 2)));
            console.log('speed x- ' + this.xSpeed + ' speed y - ' + this.ySpeed);

            this.isGameStart = true;
        }
    }

    // funcja sprawdza czy piłka uderzy w paletkę
    onPaddle(paddle) {
        if (this.x <= paddle.x + paddle.length && this.x >= paddle.x && this.ySpeed > 0) {
            console.log('trafienie');
            return true;
        }
        console.log('pudło');
        return false;
    }

    onHit(paddle, hitInBrick) {
        //Check if hit sth

        // Odbicie od ściany górnej
        if (this.y < this.size || hitInBrick === 1) {
            this.ySpeed = -this.ySpeed;
        }

        // sprawdza czy piłka odbiłą się od paletki
        if (this.y >= this.yBottom) {
            if (this.onPaddle(paddle)) {
                this.ySpeed = -this.ySpeed;
                // odbicie od boku paletki
                if (this.y > ch - paddle.height) {
                    this.xSpeed = -this.xSpeed;
                }
            } else if (this.y > ch) {
                this.ySpeed = -this.ySpeed;
                // alert("GAME OVER!");
                // document.location.reload();
                /* lives--;
                  if (lives == 0) {
                  alert("GAME OVER!");
                  document.location.reload();
                  } else {
                      this.x = paddle.x + paddle.length / 2;
                      this.y = paddle.height;
                  } */
            }
        }
        // Odbicie od ścian bocznych
        if (this.x > cw - this.size || this.x < this.size || hitInBrick === 2) {
            this.xSpeed = -this.xSpeed;
        }
    }

    /* drawScore () {
         document.querySelector(".score").innerText = "Score: " + score + ", Lives left:";
     } */
}
export default Ball;
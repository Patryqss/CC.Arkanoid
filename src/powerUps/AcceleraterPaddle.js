class AccleleratePaddle {
    constructor() {
        this.previousSpeed = 0; // przechowuje wartosć początkową
    }

    accelerate(paddle) {
        // zapisanie wartości początkowej
        if (this.previousSpeed === 0) {
            this.previousSpeed = paddle.xSpeed;
        }

        // zapobiega nadmiernemu przyśpieszeniu
        if (paddle.xSpeed <= this.previousSpeed * 2) {
            paddle.xSpeed *= 1.2;
        }
    }
}
export default AccleleratePaddle;
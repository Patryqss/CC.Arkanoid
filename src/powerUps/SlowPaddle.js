class SlowPaddle {
    constructor() {
        this.previousSpeed = 0; // przechowuje wartosć początkową
    }

    slow(paddle) {
        // zapisanie wartości początkowej
        if (this.previousSpeed === 0) {
            this.previousSpeed = paddle.xSpeed;
        }

        // zapobiega nadmiernemu przyśpieszeniu
        if (paddle.xSpeed >= this.previousSpeed / 2.5) {
            paddle.xSpeed *= 0.7;
        }
    }
}
export default SlowPaddle;
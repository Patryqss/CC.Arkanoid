class LargeBall {
    constructor() {
        this.previousSize = 0; // przechowuje wartosć początkową
    }

    large(paddle) {
        // zapisanie wartości początkowej
        if (this.previousSize === 0) {
            this.previousSize = paddle.length;
        }

        // zapobiega nadmiernemu rozrostowi
        if (paddle.length <= this.previousSize * 2) {
            paddle.length *= 1.2;
        }
    }
}
export default LargeBall;
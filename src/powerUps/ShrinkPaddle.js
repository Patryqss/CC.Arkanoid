class ShrinkPaddle {
    constructor() {
        this.previousSize = 0; // przechowuje wartosć początkową
    }

    shrink(paddle) {
        // zapisanie wartości początkowej
        if (this.previousSize === 0) {
            this.previousSize = paddle.length;
        }

        // zapobiega nadmiernemu skurczeniu
        if (paddle.length >= this.previousSize / 2) {
            paddle.length *= 0.9;
        }
    }
}
export default ShrinkPaddle;
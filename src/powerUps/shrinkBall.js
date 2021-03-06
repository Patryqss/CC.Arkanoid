class ShrinkBall {
    constructor() {
        this.previousSize = 0; // przechowuje wartosć początkową
    }

    shrink(ball) {
        // zapisanie wartości początkowej
        if (this.previousSize === 0) {
            this.previousSize = ball.size;
        }

        // zapobiega nadmiernemu skurczeniu
        if (ball.size >= this.previousSize / 2) {
            ball.size *= 0.9;
        }
    }
}
export default ShrinkBall;
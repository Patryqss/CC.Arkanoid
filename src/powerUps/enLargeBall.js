class LargeBall {
    constructor() {
        this.previousSize = 0; // przechowuje wartosć początkową
    }

    large(ball) {
        // zapisanie wartości początkowej
        if (this.previousSize === 0) {
            this.previousSize = ball.size;
        }

        // zapobiega nadmiernemu rozrostowi
        if (ball.size <= this.previousSize * 2) {
            ball.size *= 1.2;
        }
    }
}
export default LargeBall;
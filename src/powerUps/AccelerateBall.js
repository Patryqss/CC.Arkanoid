class AcclelerateBall {
    constructor() {
        this.previousSpeed = 0; // przechowuje wartosć początkową
    }

    accelerate(ball) {
        // zapisanie wartości początkowej
        if (this.previousSpeed === 0) {
            this.previousSpeed = ball.ballSpeed;
        }

        // zapobiega nadmiernemu przyśpieszeniu
        if (ball.ballSpeed <= this.previousSpeed * 1.5) {
            ball.calcYSpeed(ball.ballSpeed * 1.2);
            console.log('bal acc  ' + ball.ballSpeed * 1.2)
        }
    }
}
export default AcclelerateBall;
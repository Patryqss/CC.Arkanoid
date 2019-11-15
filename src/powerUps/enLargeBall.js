import { ctx, cw, ch } from './main';

class largeBall {
    constructor() {
        this.previousSize = 0;
    }

    large(ball) {
        if (this.previousSize === 0) {
            this.previousSize = ball.size;
        }
        ball.size *= 1.5;
    }
}
export default largeBall;
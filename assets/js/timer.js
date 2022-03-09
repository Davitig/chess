class ChessTimer {
    /**
     * The active timer data of the white side.
     * Timer won't work if the move by order is disabled.
     *
     * @type {object}
     */
    white = {duration: 0, timerId: undefined};

    /**
     * The active timer data of the black side.
     * Timer won't work if the move by order is disabled.
     *
     * @type {object}
     */
    black = {duration: 0, timerId: undefined};

    /**
     * Timer duration increment, in milliseconds.
     *
     * @type {number}
     */
    durationIncrement = 0;

    /**
     * Create a timer element.
     *
     * @param {string} side
     * @return {HTMLDivElement}
     */
    createTimerElement(side) {
        const element = document.createElement('div');
        element.setAttribute('id', 'chess-timer');

        const whiteTimerElement = document.createElement('div');
        whiteTimerElement.setAttribute('id', 'white-timer')
        whiteTimerElement.setAttribute('class', 'chess-timer')
        whiteTimerElement.textContent = '00:00';

        const blackTimerElement = document.createElement('div');
        blackTimerElement.setAttribute('id', 'black-timer')
        blackTimerElement.setAttribute('class', 'chess-timer')
        blackTimerElement.textContent = '00:00';

        element.appendChild(whiteTimerElement);

        side === 'white'
            ? whiteTimerElement.before(blackTimerElement)
            : whiteTimerElement.after(blackTimerElement)

        return element;
    }

    /**
     * Set the duration of the game, in milliseconds.
     *
     * @param {number} duration
     * @param {number} increment
     */
    set(duration, increment) {
        this.white.duration = duration;
        this.black.duration = duration;

        this.durationIncrement = increment;

        const whiteTimerElement = document.getElementById('white-timer');
        const blackTimerElement = document.getElementById('black-timer');

        whiteTimerElement.textContent = this.getMinutes(duration) + ':' + this.getSeconds(duration);
        blackTimerElement.textContent = this.getMinutes(duration) + ':' + this.getSeconds(duration);
    }

    /**
     * Start the timer.
     *
     * @param {Chess} chess
     * @param {string} side
     */
    start(chess, side) {
        const element = document.getElementById(side + '-timer');

        let oppositeSide = (side === 'white' ? 'black' : 'white');

        let duration = this[side].duration - 1;

        let timerId = setInterval(() => {
            element.textContent = this.getMinutes(duration) + ':' + this.getSeconds(duration);

            this[side].duration = duration;

            if (--duration < 0) {
                stopTimer();

                chess.event.onTimeout(oppositeSide);
            }
        }, 1000);

        this[side].timerId = timerId;

        let stopTimer = this.stopTimer(timerId);

        this.increment(oppositeSide);

        this.stopTimer(this[oppositeSide].timerId)();
    }

    /**
     * Increment the duration.
     *
     * @param {string} side
     * @return {boolean}
     */
    increment(side) {
        if (! this[side].timerId) {
            return false;
        }

        this[side].duration += this.durationIncrement + 1;

        document.getElementById(side + '-timer').textContent = (
            this.getMinutes(this[side].duration)
            + ':' +
            this.getSeconds(this[side].duration)
        );

        return true;
    }

    /**
     * Stop the timer.
     *
     * @param {number} timerId setInterval ID
     * @return {function}
     */
    stopTimer(timerId) {
        return () => {
            clearInterval(timerId);
        }
    }

    /**
     * Get a minutes from the duration time.
     *
     * @param {number} duration
     * @param {boolean} appendZero
     * @return {string}
     */
    getMinutes(duration, appendZero = true) {
        let minutes = parseInt(duration / 60, 10);

        if (appendZero) {
            minutes = minutes < 10 ? '0' + minutes : minutes;
        }

        return minutes;
    }

    /**
     * Get a seconds from the duration time.
     *
     * @param {number} duration
     * @param {boolean} appendZero
     * @return {string}
     */
    getSeconds(duration, appendZero = true) {
        let minutes = parseInt(duration % 60, 10);

        if (appendZero) {
            minutes = minutes < 10 ? '0' + minutes : minutes;
        }

        return minutes;
    }
}
class Queen extends Peace {
    /**
     * String representation of the object.
     *
     * @type {string}
     */
    name = 'queen';

    /**
     * Point of the peace.
     *
     * @type {number}
     */
    point = 9;

    /**
     * The actual white peace file (see assets -> images).
     *
     * @type {object}
     */
    white = {
        file: 'w_queen'
    }

    /**
     * The actual black peace file (see assets -> images).
     *
     * @type {object}
     */
    black = {
        file: 'b_queen'
    }

    /**
     * @inheritDoc
     */
    checkAction(chess, peaces) {
        return super.checkAction(chess, this);
    }

    /**
     * @inheritDoc
     */
    onTakeSquare(chess) {
        // make the king check action
        this.checkAction(chess, []);
    }

    /**
     * @inheritDoc
     */
    defineMoves(chess, sort = false, fullDef = false) {
        return this.getMovableSquares(chess, sort, fullDef);
    }

    /**
     * Get movable squares.
     *
     * @param {Chess} chess
     * @param {boolean} sort
     * @param {boolean} fullDef
     * @return {array}
     */
    getMovableSquares(chess, sort = false, fullDef = false) {
        return defineDiagonalSquares(chess, 7, this.side, this.getSquare(), sort, fullDef).concat(
            defineLinearSquares(chess, 7, this.side, this.getSquare(), sort, fullDef)
        );
    }
}

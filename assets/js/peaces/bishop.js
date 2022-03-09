class Bishop extends Peace {
    /**
     * String representation of the object.
     *
     * @type {string}
     */
    name = 'bishop';

    /**
     * Point of the peace.
     *
     * @type {number}
     */
    point = 3;

    /**
     * The actual white peace file (see assets -> images).
     *
     * @type {object}
     */
    white = {
        file: 'w_bishop'
    }

    /**
     * The actual black peace file (see assets -> images).
     *
     * @type {object}
     */
    black = {
        file: 'b_bishop'
    }

    /**
     * @inheritDoc
     */
    checkAction(chess, peaces) {
        peaces = peaces.length ? peaces : chess.getPeaces().filter(peace => {
            return peace instanceof Peace
                && peace.side === this.side
                && (peace instanceof Queen
                    || peace instanceof Rook
                    || Object.is(this, peace)
                )
        });

        return super.checkAction(chess, peaces);
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
        return defineDiagonalSquares(chess, 7, this.side, this.getSquare(), sort, fullDef);
    }
}

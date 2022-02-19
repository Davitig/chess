class Bishop extends Peace {
    /**
     * String representation of the object.
     *
     * @type string
     */
    name = "bishop"

    /**
     * The actual white peace file (see assets -> images).
     *
     * @type object
     */
    white = {
        file: 'w_bishop'
    }

    /**
     * The actual black peace file (see assets -> images).
     *
     * @type object
     */
    black = {
        file: 'b_bishop'
    }

    /**
     * Invoke on take square.
     *
     * @param chess object
     */
    onTakeSquare(chess) {
        // make the king check action
        this.checkAction(chess, chess.getPeaces().filter(peace => {
            return peace instanceof Peace
                && peace.side === this.side
                && ! (peace instanceof King)
                && (peace instanceof Queen
                    || peace instanceof Rook
                    || Object.is(this, peace)
                )
        }));
    }

    /**
     * Define squares for the peace.
     *
     * @param chess object
     * @param sort boolean
     * @return array
     */
    defineMoves(chess, sort = false) {
        return this.getMovableSquares(chess, sort);
    }

    /**
     * Get movable squares.
     *
     * @param chess object
     * @param sort boolean
     * @return array
     */
    getMovableSquares(chess, sort = false) {
        return defineDiagonalSquares(chess, 7, this.side, this.getSquare(), sort);
    }
}

class Queen extends Peace {
    /**
     * String representation of the object.
     *
     * @type string
     */
    name = "queen"

    /**
     * The actual white peace file (see assets -> images).
     *
     * @type object
     */
    white = {
        file: 'w_queen'
    }

    /**
     * The actual black peace file (see assets -> images).
     *
     * @type object
     */
    black = {
        file: 'b_queen'
    }

    /**
     * Invoke on take square.
     *
     * @param chess object
     */
    onTakeSquare(chess) {
        // make the king check action
        this.checkAction(chess, this);
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
        return defineDiagonalSquares(chess, 7, this.side, this.getSquare(), sort).concat(
            defineLinearSquares(chess, 7, this.side, this.getSquare(), sort)
        );
    }
}

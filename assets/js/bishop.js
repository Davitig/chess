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
     * Define squares for the peace.
     *
     * @param chess object
     * @return array
     */
    defineMoves(chess) {
        return this.getMovableSquares(chess);
    }

    /**
     * Get movable squares.
     *
     * @param chess object
     * @return array
     */
    getMovableSquares(chess) {
        return defineDiagonalSquares(chess, 8, this.side);
    }
}

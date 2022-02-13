class Rook extends Peace {
    /**
     * String representation of the object.
     *
     * @type string
     */
    name = "rook"

    /**
     * The actual white peace file (see assets -> images).
     *
     * @type object
     */
    white = {
        file: 'w_rook'
    }

    /**
     * The actual black peace file (see assets -> images).
     *
     * @type object
     */
    black = {
        file: 'b_rook'
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
        return linearSquares(chess, 8, this.side);
    }
}

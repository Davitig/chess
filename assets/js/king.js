class King extends Peace {
    /**
     * String representation of the object.
     *
     * @type string
     */
    name = "king"

    /**
     * The actual white peace file (see assets -> images).
     *
     * @type object
     */
    white = {
        file: 'w_king'
    }

    /**
     * The actual black peace file (see assets -> images).
     *
     * @type object
     */
    black = {
        file: 'b_king'
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
        return defineDiagonalSquares(chess, 1, this.side).concat(
            defineLinearSquares(chess, 1, this.side)
        );
    }
}

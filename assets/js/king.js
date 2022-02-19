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
        return defineDiagonalSquares(chess, 1, this.side, this.getSquare(), sort).concat(
            defineLinearSquares(chess, 1, this.side, this.getSquare(), sort)
        );
    }
}

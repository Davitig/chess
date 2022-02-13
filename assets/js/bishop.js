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
     * Define available squares for the peace.
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
        let squares = chess.getSquaresArray();
        let squareKey = chess.getSquaresArrayKey(chess.activeSquare, squares);

        let newSquares = [];

        // get west north squares.
        newSquares = diagonalSquares(squares, squareKey, (squareKey) => {
            return squareKey - 9;
        }, 'a');
        // get north east squares.
        newSquares = newSquares.concat(
            diagonalSquares(squares, squareKey, (newSquareKey) => {
                return newSquareKey - 7;
            }, 'h')
        );
        // get east south squares.
        newSquares = newSquares.concat(
            diagonalSquares(squares, squareKey, (newSquareKey) => {
                return newSquareKey + 9;
            }, 'a')
        );
        // get south west squares.
        newSquares = newSquares.concat(
            diagonalSquares(squares, squareKey, (newSquareKey) => {
                return newSquareKey + 7;
            }, 'h')
        );

        return newSquares;
    }
}

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
        newSquares = this.getDiagonalSquares(squares, squareKey, (squareKey) => {
            return squareKey - 9;
        }, 'a');
        // get north east squares.
        newSquares = newSquares.concat(
            this.getDiagonalSquares(squares, squareKey, (newSquareKey) => {
                return newSquareKey - 7;
            }, 'h')
        );
        // get east south squares.
        newSquares = newSquares.concat(
            this.getDiagonalSquares(squares, squareKey, (newSquareKey) => {
                return newSquareKey + 9;
            }, 'a')
        );
        // get south west squares.
        newSquares = newSquares.concat(
            this.getDiagonalSquares(squares, squareKey, (newSquareKey) => {
                return newSquareKey + 7;
            }, 'h')
        );

        return newSquares;
    }

    /**
     * Get diagonal squares.
     *
     * @param squares array
     * @param squareKey integer
     * @param newSquareKeyFunc closure
     * @param edgeAlphabet string
     * @return array
     */
    getDiagonalSquares(squares, squareKey, newSquareKeyFunc, edgeAlphabet) {
        let newSquares = [];
        let newSquareKey = squareKey;

        for (let i = 1; i <= 8; i++) {
            newSquareKey = newSquareKeyFunc(newSquareKey);

            let targetSquare = squares[newSquareKey];

            if (targetSquare !== undefined) {
                let targetSquarePeace = chess.squares[targetSquare];

                newSquares.push(targetSquare);

                // if object
                if (targetSquarePeace.length === undefined) {
                    if (targetSquarePeace.side === this.side) {
                        newSquares.pop();
                    }

                    break;
                }

                if (chess.splitSquare(targetSquare)[0] === edgeAlphabet) {
                    break;
                }
            }
        }

        return newSquares;
    }
}

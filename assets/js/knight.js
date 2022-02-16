class Knight extends Peace {
    /**
     * String representation of the object.
     *
     * @type string
     */
    name = "knight"

    /**
     * The actual white peace file (see assets -> images).
     *
     * @type object
     */
    white = {
        file: {
            right: 'w_knight_r',
            left: 'w_knight_l'
        }
    }

    /**
     * The actual black peace file (see assets -> images).
     *
     * @type object
     */
    black = {
        file: {
            right: 'b_knight_r',
            left: 'b_knight_l'
        }
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
        let squares = chess.getSquares();
        let squareKey = chess.getSquaresArrayKey();

        let newSquares = [];

        newSquares.push(squares[squareKey - 6]);
        newSquares.push(squares[squareKey - 15]);
        newSquares.push(squares[squareKey - 17]);
        newSquares.push(squares[squareKey - 10]);
        newSquares.push(squares[squareKey + 6]);
        newSquares.push(squares[squareKey + 15]);
        newSquares.push(squares[squareKey + 17]);
        newSquares.push(squares[squareKey + 10]);

        let currentSquareAlphabet = chess.getSquareAlphabet();

        newSquares = newSquares.filter(targetSquare => {
            // if the target square reaches the actual board array
            if (targetSquare === undefined) {
                return false;
            }

            let targetSquareAlphabet = chess.getSquareAlphabet(targetSquare);

            // if the target square reaches the board
            if ((['a', 'b'].includes(currentSquareAlphabet)
                && ['g', 'h'].includes(targetSquareAlphabet)
            ) || (['g', 'h'].includes(currentSquareAlphabet)
                && ['a', 'b'].includes(targetSquareAlphabet)
            )) {
                return false;
            }

            let targetSquarePeace = chess.getPeace(targetSquare);

            // if target square contains a peace
            if (targetSquarePeace instanceof Peace && targetSquarePeace.side === this.side) {
                return false;
            }

            return true;
        });

        return newSquares;
    }
}

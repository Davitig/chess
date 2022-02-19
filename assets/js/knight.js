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
                    || peace instanceof Bishop
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
        let squares = chess.getSquares();
        let squareKey = chess.getSquaresArrayKey(this.getSquare());

        let squareLines = [6, 15, 17, 10, -6, -15, -17, -10];
        let newSquares = [];

        squareLines.forEach((number, index) => {
            newSquares[index] = squares[squareKey + number];
        });

        if (! sort) {
            return newSquares.filter(this.getMovableSquaresFilterFunction(this.getSquare()));
        }

        newSquares = arrayChunk(newSquares, 2);

        for (let i = 0; i < newSquares.length; i++) {
            newSquares[i] = newSquares[i].filter(this.getMovableSquaresFilterFunction(this.getSquare()));
        }

        return newSquares;
    }

    /**
     * Get movable squares filter function.
     *
     * @param square
     * @return function
     */
    getMovableSquaresFilterFunction(square) {
        let currentSquareAlphabet = chess.getSquareAlphabet(square);

        return targetSquare => {
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

            let targetPeace = chess.getPeace(targetSquare);

            // if target square contains a same side peace
            return ! (targetPeace instanceof Peace && targetPeace.side === this.side);
        };
    }
}

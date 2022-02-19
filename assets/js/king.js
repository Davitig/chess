class King extends Peace {
    /**
     * String representation of the object.
     *
     * @type string
     */
    name = "king"

    /**
     * Safe mode used to avoid correlation between kings during defining moves.
     *
     * @type boolean
     */
    safeMode = false;

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
                )
        }));
    }

    /**
     * Define squares for the peace.
     *
     * @param chess object
     * @param sort boolean
     * @param fullDef boolean
     * @return array
     */
    defineMoves(chess, sort = false, fullDef = false) {
        return this.getSafeSquares(
            chess, this.getMovableSquares(chess, sort, fullDef)
        );
    }

    /**
     * Get movable squares.
     *
     * @param chess object
     * @param sort boolean
     * @param fullDef boolean
     * @return array
     */
    getMovableSquares(chess, sort = false, fullDef = false) {
        return defineDiagonalSquares(chess, 1, this.side, this.getSquare(), sort, fullDef).concat(
            defineLinearSquares(chess, 1, this.side, this.getSquare(), sort, fullDef)
        );
    }

    /**
     * Get safe squares.
     *
     * @param chess squares
     * @param squares array
     * @return array
     */
    getSafeSquares(chess, squares) {
        if (! this.safeMode) {
            return squares;
        }

        let opponentSquares = [];

        // get available squares from the opponent peaces
        chess.getSquares().forEach(square => {
            let peace = chess.getPeace(square);

            if (peace instanceof Peace && peace.side !== this.side) {
                opponentSquares.push(peace.defineMoves(chess, true, true));
            }
        });

        squares = squares.filter(square => {
            return ! opponentSquares.filter(squaresLines => {
                return squaresLines.length !== squaresLines.filter(squares => {
                    return ! squares.includes(square);
                }).length
            }).length;
        });

        return squares;
    }
}

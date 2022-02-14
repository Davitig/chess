class Pawn extends Peace {
    /**
     * String representation of the object.
     *
     * @type string
     */
    name = "pawn"

    // TODO: en passant capturing.
    // TODO: queen promotion.

    /**
     * The actual white peace file (see assets -> images).
     *
     * @type object
     */
    white = {
        file: 'w_pawn'
    }

    /**
     * The actual black peace file (see assets -> images).
     *
     * @type object
     */
    black = {
        file: 'b_pawn'
    };

    /**
     * Define squares for the peace.
     *
     * @param chess object
     * @return array
     */
    defineMoves(chess) {
        let alphabet = chess.activeSquareAlphabet;
        let number, newNumber;
        number = newNumber = chess.activeSquareNumber;

        let squares = [];

        if (this.side === "white") {
            newNumber++;
        } else {
            newNumber--;
        }

        squares.push(alphabet + newNumber);

        if (this.side === "white" && number === 2) {
            newNumber++;
            squares.push(alphabet + newNumber);
        } else if (this.side === "black" && number === 7) {
            newNumber--
            squares.push(alphabet + newNumber);
        }

        if (newNumber > 8 || newNumber < 1) {
            return [];
        }

        let sliceEnd = squares.length;

        squares.forEach((square, index) => {
            if (chess.squares[square] instanceof Peace) {
                sliceEnd = index;

                return false;
            }
        });

        // slice occupied squares.
        squares = squares.slice(0, sliceEnd);

        return squares.concat(this.getCaptureSquares(alphabet + number, chess));
    }

    /**
     * Get capture squares.
     *
     * @param square string
     * @param chess object
     * @return array
     */
    getCaptureSquares(square, chess) {
        let squareKeys = chess.getSquaresArray();
        let squareKey = chess.getSquaresArrayKey(square, squareKeys);
        let squares = [];
        let captureSquares = [];

        let currentSquareAlphabet = chess.activeSquareAlphabet;

        if (currentSquareAlphabet !== 'a' && currentSquareAlphabet !== 'h') {
            captureSquares.push(squareKeys[this.side === "white" ? squareKey - 9 : squareKey + 7]);
            captureSquares.push(squareKeys[this.side === "white" ? squareKey - 7 : squareKey + 9]);

            captureSquares.forEach(captureSquare => {
                let peace = chess.squares[captureSquare];

                if (peace instanceof Peace) {
                    squares.push(captureSquare);
                }
            });
        }

        return squares;
    }
}

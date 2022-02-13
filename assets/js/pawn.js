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
            if (chess.squares[square].length !== 0) {
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
        let captureSquares = [];

        let alphabet = chess.activeSquareAlphabet;

        let squareKeys = chess.getSquaresArray();
        let squareKey = chess.getSquaresArrayKey(square, squareKeys);

        if (alphabet !== 'a') {
            let captureSquare1 = squareKeys[this.side === "white" ? squareKey - 9 : squareKey + 7];

            if (captureSquare1 === undefined) {
                return [];
            }

            let peace = chess.squares[captureSquare1];
            if (peace.length !== 0 && peace.side !== this.side) {
                captureSquares.push(captureSquare1);
            }
        }

        if (alphabet !== 'h') {
            let captureSquare2 = squareKeys[this.side === "white" ? squareKey - 7 : squareKey + 9];

            if (captureSquare2 === undefined) {
                return [];
            }

            let peace = chess.squares[captureSquare2];
            if (peace.length !== 0 && peace.side !== this.side) {
                captureSquares.push(captureSquare2);
            }
        }

        return captureSquares;
    }
}

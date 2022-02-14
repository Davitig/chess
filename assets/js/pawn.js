class Pawn extends Peace {
    /**
     * String representation of the object.
     *
     * @type string
     */
    name = "pawn"

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
     * En passant capture square.
     *
     * @type string
     */
    enPassantSquare;

    /**
     * Invoke after take square.
     *
     * @param chess
     */
    afterTakeSquare(chess) {
        if (this.enPassantSquare) {
            let enPassantPeace = chess.squares[this.enPassantSquare];

            chess.squares[this.enPassantSquare] = [];

            chess.capturePeaceElement(
                enPassantPeace, document.querySelector('#' + this.enPassantSquare), false
            )

            this.enPassantSquare = undefined;
        }
    }

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

        return squares.concat(this.getCaptureSquares(chess));
    }

    /**
     * Get capture squares.
     *
     * @param chess object
     * @return array
     */
    getCaptureSquares(chess) {
        let squareKeys = chess.getSquaresArray();
        let squareKey = chess.getSquaresArrayKey(chess.activeSquare, squareKeys);
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

                let enPassantSquare = this.getEnPassantSquare(chess, captureSquare);

                if (enPassantSquare) {
                    this.enPassantSquare = enPassantSquare;

                    squares.push(captureSquare);
                }
            });
        }

        return squares;
    }

    /**
     * Get en passant capture square.
     *
     * @param chess object
     * @param captureSquare string
     * @return string|boolean
     */
    getEnPassantSquare(chess, captureSquare) {
        if (! (chess.lastMove.peace instanceof Pawn)
            || Object.is(this, chess.lastMove.peace)
            || this.side === chess.lastMove.peace.side
            || chess.lastMove.prevSquares.length < 2
            || ! chess.lastMove.prevSquares.includes(captureSquare)
        ) {
            return false;
        }

        return chess.lastMove.activeSquare;
    }
}

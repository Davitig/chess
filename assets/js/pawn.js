class Pawn extends Peace {
    /**
     * String representation of the object.
     *
     * @type string
     */
    name = "pawn"

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
     * En passant pawn peace.
     *
     * @type {object, string, string}
     */
    enPassant = {pawn: undefined, activeSquare: undefined, captureSquare: undefined};

    /**
     * Invoke on take square.
     *
     * @param chess object
     * @param targetSquare string
     */
    onTakeSquare(chess, targetSquare) {
        if (! this.takeEnPassantPeace(chess, targetSquare)) {
            this.setEnPassantPeace(chess, targetSquare);
        }
    }

    /**
     * Take en passant peace.
     *
     * @param chess object
     * @param targetSquare string
     */
    takeEnPassantPeace(chess, targetSquare) {
        if (! (this.enPassant.pawn instanceof Pawn)
            || chess.getSquareAlphabet(this.enPassant.activeSquare) !== chess.getSquareAlphabet(targetSquare)
        ) {
            return false;
        }

        chess.squares[this.enPassant.activeSquare] = [];

        chess.capturePeaceElement(
            this.enPassant.pawn,
            document.querySelector('#' + this.enPassant.activeSquare),
            false
        )

        this.enPassant = {};

        return true;
    }

    /**
     * Set self as en passant for another same peace.
     *
     * @param chess object
     * @param targetSquare string
     */
    setEnPassantPeace(chess, targetSquare) {
        let targetSquareNumber = chess.getSquareNumber(targetSquare);

        if (! ([4, 5].includes(targetSquareNumber))
            || chess.availableSquares.length < 2
        ) {
            return false;
        }

        let squares = [];
        squares = chess.availableSquares.concat(squares);

        let targetSquareKey = chess.getSquaresArrayKey(targetSquare);

        let sideSquare1 = chess.getSquare(
            this.side === "white" ? targetSquareKey - 1 : targetSquareKey + 1
        );
        let sideSquare2 = chess.getSquare(
            this.side === "white" ? targetSquareKey + 1 : targetSquareKey - 1
        );

        if (chess.getSquareNumber(sideSquare1) === targetSquareNumber) {
            squares.push(sideSquare1);
        }

        if (chess.getSquareNumber(sideSquare2) === targetSquareNumber) {
            squares.push(sideSquare2);
        }

        let captureSquare = chess.activeSquare;

        squares.forEach(square => {
            let peace = chess.getPeace(square);

            // set self as en passant for another same peace.
            if (peace instanceof Pawn && ! Object.is(this, peace)) {
                if (targetSquareNumber === chess.getSquareNumber(square)) {
                    captureSquare = chess.availableSquares[0];
                }

                peace.enPassant.pawn = this;
                peace.enPassant.activeSquare = targetSquare;
                peace.enPassant.captureSquare = captureSquare;
            }
        });

        return true;
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
            if (chess.getPeace(square) instanceof Peace) {
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
        let squares = [];

        let squareKeys = chess.getSquares();
        let squareKey = chess.getSquaresArrayKey(chess.activeSquare, squareKeys);

        let captureSquareNumber = chess.activeSquareNumber;

        if (this.side === "white") {
            captureSquareNumber++;
        } else {
            captureSquareNumber--;
        }

        let boardIsWhite = chess.side === "white";

        let squareKey1, squareKey2;

        if (this.side === "white") {
            squareKey1 = this.getNewKey(! boardIsWhite, squareKey, 7);
            squareKey2 = this.getNewKey(! boardIsWhite, squareKey, 9);
        } else {
            squareKey1 = this.getNewKey(boardIsWhite, squareKey, 7);
            squareKey2 = this.getNewKey(boardIsWhite, squareKey, 9);
        }

        let captureSquare1 = squareKeys[squareKey1];
        let captureSquare2 = squareKeys[squareKey2];

        if (chess.getSquareNumber(captureSquare1) === captureSquareNumber) {
            squares.push(captureSquare1);
        }

        if (chess.getSquareNumber(captureSquare2) === captureSquareNumber) {
            squares.push(captureSquare2);
        }

        squares = squares.filter(captureSquare => {
            let peace = chess.getPeace(captureSquare);

            return peace instanceof Peace && this.side !== peace.side;
        });

        if (this.enPassant.captureSquare) {
            squares.push(this.enPassant.captureSquare);
        }

        return squares;
    }

    /**
     * Get a new key.
     *
     * @param isIncrement boolean
     * @param number integer
     * @param key integer
     * @return integer
     */
    getNewKey(isIncrement, key, number) {
        return isIncrement ? key + number : key - number;
    }
}

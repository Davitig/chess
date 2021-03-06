class Pawn extends Peace {
    /**
     * String representation of the object.
     *
     * @type {string}
     */
    name = 'pawn';

    /**
     * Point of the peace.
     *
     * @type {number}
     */
    point = 1;

    /**
     * The actual white peace file (see assets -> images).
     *
     * @type {object}
     */
    white = {
        file: 'w_pawn'
    }

    /**
     * The actual black peace file (see assets -> images).
     *
     * @type {object}
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
     * @inheritDoc
     */
    onTakeSquare(chess) {
        // after the pawn move, run the king check action from every peace
        if (! [2, 7].includes(chess.getSquareNumber())) {
            this.checkAction(chess, chess.getPeaces().filter(peace => {
                return peace instanceof Peace
                    && peace.side === this.side
                    && ! (peace instanceof King)
                    && ! (peace instanceof Pawn)
                    || Object.is(this, peace)
            }));
        }

        // take or set en passant peace if its available
        if (! this.takesEnPassantPeace(chess)) {
            this.setsEnPassantPeace(chess);
        }

        let targetSquareNumber = chess.getSquareNumber(this.getSquare());

        // promote a peace if the pawn is on the last row square
        if ([1, 8].includes(targetSquareNumber)) {
            this.createPromotionPeacesElement(chess);
        }
    }

    /**
     * @inheritDoc
     */
    defineMoves(chess, sort = false, fullDef = false) {
        return this.getMovableSquares(chess, sort, fullDef)
    }

    /**
     * Get movable squares.
     *
     * @param {Chess} chess
     * @param {boolean} sort
     * @param {boolean} fullDef
     * @return {array}
     */
    getMovableSquares(chess, sort = false, fullDef = false) {
        let square = this.getSquare();
        let alphabet = chess.getSquareAlphabet(square);
        let number, newNumber;
        number = newNumber = chess.getSquareNumber(square);

        let squares = [];

        if (this.side === 'white') {
            newNumber++;
        } else {
            newNumber--;
        }

        squares.push(alphabet + newNumber);

        if (this.side === 'white' && number === 2) {
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
            }
        });

        // slice occupied squares.
        squares = squares.slice(0, sliceEnd);

        if (sort) {
            squares = arrayChunk(this.getCaptureSquares(chess, fullDef), 1);
        } else {
            squares = squares.concat(this.getCaptureSquares(chess, fullDef));
        }

        return squares;
    }

    /**
     * Get capture squares.
     *
     * @param {Chess} chess
     * @param {boolean} fullDef
     * @return {array}
     */
    getCaptureSquares(chess, fullDef = false) {
        let squares = [];

        let squareKeys = chess.getSquares();
        let squareKey = chess.getSquaresArrayKey(this.getSquare());

        let captureSquareNumber = chess.getSquareNumber(this.getSquare());

        if (this.side === 'white') {
            captureSquareNumber++;
        } else {
            captureSquareNumber--;
        }

        let boardIsWhite = chess.side === 'white';

        let squareKey1, squareKey2;

        if (this.side === 'white') {
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

            // fullDef to protect the peace from the king
            return fullDef ? true : peace instanceof Peace && this.side !== peace.side
        });

        if (this.enPassant.captureSquare) {
            squares.push(this.enPassant.captureSquare);
        }

        return squares;
    }

    /**
     * Get a new key.
     *
     * @param {boolean} isIncrement
     * @param {number} number
     * @param {number} key
     * @return {number}
     */
    getNewKey(isIncrement, key, number) {
        return isIncrement ? key + number : key - number;
    }

    /**
     * Take en passant peace.
     *
     * @param {Chess} chess
     */
    takesEnPassantPeace(chess) {
        if (! (this.enPassant.pawn instanceof Pawn)
            || chess.getSquareAlphabet(this.enPassant.activeSquare) !== chess.getSquareAlphabet(this.getSquare())
        ) {
            return false;
        }

        chess.squares[this.enPassant.activeSquare] = [];

        chess.capturePeaceElement(
            this.enPassant.pawn,
            document.getElementById(this.enPassant.activeSquare),
            false
        )

        enPassant.clear();

        return true;
    }

    /**
     * Set self as en passant for another same peace.
     *
     * @param {Chess} chess
     */
    setsEnPassantPeace(chess) {
        let targetSquareNumber = chess.getSquareNumber(this.getSquare());

        if (! ([4, 5].includes(targetSquareNumber))
            || chess.availableSquares.length < 2
        ) {
            return false;
        }

        let squares = chess.availableSquares;

        let targetSquareKey = chess.getSquaresArrayKey(this.getSquare());

        let sideSquare1 = chess.getSquare(
            this.side === 'white' ? targetSquareKey - 1 : targetSquareKey + 1
        );
        let sideSquare2 = chess.getSquare(
            this.side === 'white' ? targetSquareKey + 1 : targetSquareKey - 1
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
                peace.enPassant.activeSquare = this.getSquare();
                peace.enPassant.captureSquare = captureSquare;

                enPassant.set(peace);
            }
        });

        return true;
    }

    /**
     * Create a promotion peaces element.
     *
     * @param {Chess} chess
     * @return {HTMLDivElement}
     */
    createPromotionPeacesElement(chess) {
        const promElement = document.createElement('div');

        promElement.setAttribute('id', 'promotion');
        promElement.setAttribute('data-prom-square', this.getSquare());

        let peaceNames = pawnPromotion.getPeaceNames();

        const promSquareElement = document.getElementById(this.getSquare());
        let psRect = promSquareElement.getBoundingClientRect();

        if (chess.side !== this.side) {
            peaceNames.reverse();
        }

        peaceNames.forEach(name => {
            const peaceElement = document.createElement('div');
            peaceElement.setAttribute('class', 'peace');
            peaceElement.setAttribute('data-prom-peace', name);

            promElement.appendChild(peaceElement);
        });

        promElement.querySelectorAll('.peace').forEach(peaceElement => {
            let peaceName = peaceElement.getAttribute('data-prom-peace');

            let peaceFile = chess.getPeaceFileByOrder(
                pawnPromotion.getPeaces(this.side)[peaceName].getFile()
            );

            peaceElement.setAttribute('data-file', peaceFile)
        });

        chess.setBoardBgVisibility(1);

        document.getElementById(chess.boardElementName).before(promElement);

        promElement.style.top = psRect.top + 'px';
        promElement.style.left = psRect.left + 'px';
        console.log(psRect);

        if (chess.side !== this.side) {
            promElement.style.top = (psRect.bottom - promElement.clientHeight) + 'px';
        }
    }
}

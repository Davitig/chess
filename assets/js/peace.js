class Peace {
    /**
     * Indicates whether the peace is white or black.
     *
     * @type string
     */
    side;

    /**
     * The current square.
     *
     * @type string
     */
    square;

    /**
     * Create a new bishop.
     *
     * @param side string
     * @param square string
     */
    constructor(side, square) {
        this.side = side;

        this.square = square;
    }

    /**
     * Get the current square.
     *
     * @return string
     */
    getSquare() {
        return this.square;
    }

    /**
     * Set the current square.
     *
     * @return string
     */
    setSquare(square) {
        return this.square = square;
    }

    /**
     * Get the peace file.
     *
     * @return string
     */
    getFile() {
        return this[this.side].file;
    }

    /**
     * Invoke on take square.
     *
     * @param chess object
     */
    onTakeSquare(chess) {}

    /**
     * Check.
     *
     * @param chess object
     * @param peaces array
     * @param enableEvent boolean
     * @return string
     */
    check(chess, peaces, enableEvent = true) {
        let availableSquares = [];
        let peacesList = [];
        let checkerPeaces = [];

        if (Array.isArray(peaces)) {
            peacesList = peaces
        } else {
            peacesList.push(peaces);
        }

        peaces = [];

        peacesList.forEach(peaceObj => {
            let squares = peaceObj.defineMoves(chess, true);

            availableSquares = availableSquares.concat(squares);

            for (let i = 0; i < squares.length; i++) {
                peaces.push(peaceObj);
            }
        });

        for (let i = 0; i < availableSquares.length; i++) {
            availableSquares[i].find(square => {
                let targetPeace = chess.getPeace(square);

                if (targetPeace instanceof King && targetPeace.side !== peaces[i].side) {
                    checkerPeaces.push({
                        checkerPeace: peaces[i],
                        checkerSquares: availableSquares[i],
                        kingSquare: targetPeace.getSquare()
                    });
                }
            });
        }

        if (enableEvent && checkerPeaces.length) {
            chess.event.onCheck(checkerPeaces);
        }

        return checkerPeaces;
    }

    /**
     * Make the king check actions on DOM.
     *
     * @param chess object
     * @param peaces array
     * @return boolean
     */
    checkAction(chess, peaces) {
        let kingSquareElement = document.querySelector('[data-check="1"]');

        if (kingSquareElement) {
            kingSquareElement.setAttribute('data-check', 0);
        }

        let checkerPeaces = this.check(chess, peaces);

        if (! checkerPeaces.length) {
            return false;
        }

        if (this.isCheckmate(chess, checkerPeaces)) {
            chess.event.onCheckmate(this);
        }

        kingSquareElement = document.getElementById(checkerPeaces[0].kingSquare);

        if (kingSquareElement) {
            kingSquareElement.setAttribute('data-check', 1);
        }

        return true;
    }

    /**
     * Determine checkmate.
     *
     * @param chess object
     * @param checkerPeaces array
     * @return boolean
     */
    isCheckmate(chess, checkerPeaces) {
        if (! checkerPeaces.length) {
            return false;
        }

        return ! chess.getPeaces().filter(peace => {
            if (! (peace instanceof Peace) || peace.side === this.side) {
                return false;
            }

            let squareLength = 0;

            if (peace instanceof King) {
                peace.safeMode = true;

                squareLength = peace.defineMoves(chess).length;

                peace.safeMode = false;
            } else {
                checkerPeaces.forEach(checkerObj => {
                    squareLength = peace.defineMoves(chess).filter(square => {
                        return square === checkerObj.checkerPeace.getSquare()
                            || checkerObj.checkerSquares.includes(square);
                    }).length;
                });
            }

            return squareLength;
        }).length
    }
}
class Peace {
    /**
     * String representation of the object.
     *
     * @type {string}
     */
    name;

    /**
     * Point of the peace.
     *
     * @type {number}
     */
    point = 0;

    /**
     * Indicates whether the peace is white or black.
     *
     * @type {string}
     */
    side;

    /**
     * The current square.
     *
     * @type {string}
     */
    square;

    /**
     * Create a new bishop.
     *
     * @param {string} side
     * @param {string} square
     */
    constructor(side, square) {
        this.side = side;

        this.square = square;
    }

    /**
     * Get the current square.
     *
     * @return {string}
     */
    getSquare() {
        return this.square;
    }

    /**
     * Set the current square.
     *
     * @return {string}
     */
    setSquare(square) {
        return this.square = square;
    }

    /**
     * Get the peace file.
     *
     * @return {string}
     */
    getFile() {
        return this[this.side].file;
    }

    /**
     * Invoke on take square.
     *
     * @param {Chess} chess
     */
    onTakeSquare(chess) {}

    /**
     * Define squares for the peace.
     *
     * @param {Chess} chess
     * @param {boolean} sort
     * @param {boolean} fullDef
     * @return {array}
     */
    defineMoves(chess, sort = false, fullDef = false) {}

    /**
     * Make the king check actions on DOM.
     *
     * @param {Chess} chess
     * @param {array} peaces
     * @return {boolean}
     */
    checkAction(chess, peaces) {
        let kingSquareElement = document.querySelector('[data-check="1"]');

        if (kingSquareElement) {
            kingSquareElement.setAttribute('data-check', 0);
        }

        let checkerPeaces = this.check(chess, peaces);

        if (! checkerPeaces.length) {
            return;
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
     * Check.
     *
     * @param {Chess} chess
     * @param {array} peaces
     * @return {array}
     */
    check(chess, peaces) {
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

        if (checkerPeaces.length) {
            chess.event.onCheck(checkerPeaces, checkerPeaces[0].checkerPeace.side);
        }

        return checkerPeaces;
    }

    /**
     * Determine checkmate.
     *
     * @param {Chess} chess
     * @param {array} checkerPeaces
     * @return {boolean}
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
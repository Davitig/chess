class Peace {
    /**
     * Indicates whether the peace is white or black.
     *
     * @type string
     */
    side;

    /**
     * Peace current square.
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
     * @return array
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

        let kingSquare;

        for (let i = 0; i < availableSquares.length; i++) {
            kingSquare = availableSquares[i].find(square => {
                let targetPeace = chess.getPeace(square);

                return targetPeace instanceof King && targetPeace.side !== peaces[i].side;
            });

            if (kingSquare) {
                checkerPeaces.push({
                    kingSquare: kingSquare,
                    checkerPeace: kingSquare ? peaces[i] : [],
                    checkerSquares: kingSquare ? availableSquares[i] : []
                });
            }
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

        kingSquareElement = document.getElementById(checkerPeaces[0].kingSquare);

        if (kingSquareElement) {
            kingSquareElement.setAttribute('data-check', 1);
        }

        return true;
    }
}